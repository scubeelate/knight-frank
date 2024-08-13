"use strict";

const Employee = require("../models/Employee");
const EmployeeCard = require("../models/EmployeeCard");
const Log = require("../models/Log");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const Validator = require("validatorjs");
const { ERROR_CODES, ERROR_TYPES, ERROR_MESSAGES } = require("../helpers/error-codes");
const Logger = require("../../bootstrap/logger");
const { handleErrorDbLogger } = require("../helpers/commonErrorLogger");
const crypto = require("crypto");
const NodeCache = require("memory-cache");
const {encryptKey,encryptClientData,decryptClientData } = require("../helpers/encryption")
const { getClientId } = require("../helpers/utils");
const { fetchUserByEmailWithRetry } = require("../helpers/ActiveDirectoryService");

class EmployeeController {
  /**
 * List employees
 *
 * @param {Object} request
 * @param {Object} response
 */
static async index(request, response) {
  try {
    const clientId = getClientId(request);
    const clientPublicKey = NodeCache.get(clientId);
    if(!clientPublicKey) {
      return response.status(401).send({
        status: false,
        message: "Unauthorized access. Session not found.",
      });
    }
    const metaData = await Employee.list(request);
    const key = crypto.randomBytes(32).toString("hex");
    const encryptKeyData = await encryptKey(clientPublicKey, key);
    
    const encryptionPromises = metaData.data.map(async (ele) => {
      ele['name'] = await encryptClientData(key, ele.name);
      ele['designation'] = await encryptClientData(key, ele.designation);
      ele['department'] = await encryptClientData(key, ele.department);
      ele['phone'] = await encryptClientData(key, ele.phone);
      ele['email'] = await encryptClientData(key, ele.email);
      ele['emp_id'] = await encryptClientData(key, ele.emp_id);
    });
    
    await Promise.all(encryptionPromises);
    
    return response.status(200).send({
      status: true,
      message: "Employee Lists",
      data: metaData,
      x_key: encryptKeyData
    });
  } catch (exception) {
    console.error(exception);
    handleErrorDbLogger("Employee list fetching failed", exception, request);
    return response.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
}


  /**
   * Create a new employee
   *
   * @param {Object} request
   * @param {Object} response
   */
  static async create(request, response) {
    try {
      const rules = {
        email: "required|max:225|email",
      };

      let validation = new Validator(request.body, rules);

      if (validation.fails()) {
        const error = validation.errors.errors;
        return response.status(400).send({
          status: false,
          message: error[Object.keys(error)[0]].join(),
        });
      }

      if (await Employee.findOne({ email: request.body.email })) {
        Logger.error({
          error_type: ERROR_TYPES.VALIDATION_ERROR,
          error_code: ERROR_CODES.RECORD_DUPLICATION_ERROR,
          message:ERROR_MESSAGES.EMPLOYEE_EMAIL_ALREADY_EXISTS,
          source_ip: request.headers['sourceip'] || request.ip,
          user_id: request.user ? request.user.id : undefined,
          request_id: request.requestId,
        });
        return response.status(400).send({
          status: false,
          message: "Employee already exists with the given email address",
        });
      }
     
      //  let user = await fetchUserByEmailWithRetry(request.body.email);
      let user = {
        userAccountControl: 500,
        displayName:'Venkatesh',
        employeeID: '123456',
        mobile:'+91 9876543212',
        department:'IT',
        title:"SE",
        company:'Scube',
      }
      if (user) {
        if (Number(user.userAccountControl) === 514)
          return response.status(400).send({
            status: false,
            message: "Employee email is disabled",
          });

        let obj = {
          email: String(user.mail).toLowerCase(),
          name: user.displayName,
          emp_id: user.employeeID,
          phone: user.mobile,
          designation: user.title,
          image:"",
          department: user.department,
          company: user.company,
          work_location: `${user.streetAddress}, ${user.city}, ${user.state}, ${user.postalCode}, ${user.country}`,
          created_by:request.user.id,
        };
        await Employee.create(obj);
        const employee = await Employee.findOne({ email: request.body.email })
        const cardMeta = {
          employee_id: employee.id,
          card_uuid: uuidv4(),
          name: employee.name,
          emp_id: employee.emp_id,
          designation: employee.designation,
          department: employee.department,
          card_status: "REQUESTED",
          created_by: request.user.id
        }
       
        await EmployeeCard.create(cardMeta);
        await Employee.updatedCardStatus(employee.id, {
          is_print_requested: 1,
          card_status: "REQUESTED",
        });
        Log.create({
          model: 'EMPLOYEE',
          user_id: auth_user.id,
          message: `Add New employee ${request.body.email} to the System`,
          type: 'ACTION'
        })
        return response.status(200).send({
          status: true,
          message: "Employee Added Successfully",
        });
      } else {
        return response.status(500).send({
          status: false,
          message: "Unable to fetch data from active directory",
        });
      }

    } catch (exception) {
      handleErrorDbLogger("Employee creation failed", exception, request);
      return response.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

 /**
 * View employee details
 *
 * @param {Object} request
 * @param {Object} response
 */
static async show(request, response) {
  try {
    const employee = request.employee;
    const clientId = getClientId(request);
    const clientPublicKey = NodeCache.get(clientId);
    if(!clientPublicKey) {
      return response.status(401).send({
        status: false,
        message: "Unauthorized access. Session not found.",
      });
    }
    const key = crypto.randomBytes(32).toString("hex");
    const encryptKeyData = await encryptKey(clientPublicKey, key);
    const encryptionPromises = [
      'name', 'designation', 'department', 'phone',
      'email', 'emp_id'
    ].map(async (property) => {
      if (employee[property]) {
        employee[property] = await encryptClientData(key, employee[property]);
      }
    });
    
    await Promise.all(encryptionPromises);
    
    return response.status(200).send({
      status: true,
      message: "Employee Data",
      data: request.employee,
      x_key: encryptKeyData
    });
  } catch (exception) {
    handleErrorDbLogger("Employee details fetching failed", exception, request);
    return response.status(500).send({
      status: false,
      message: "Internal Server Error",
    });
  }
}

  /**
   * Get employee cards
   *
   * @param {Object} request
   * @param {Object} response
   */
  static async getEmployeeCards(request, response) {
    try {
      let cardList = await EmployeeCard.employeeCardsList(request.params.id);

      return response.status(200).send({
        status: true,
        message: "Cards fetched successfully",
        data: cardList,
      });
    } catch (exception) {
      handleErrorDbLogger("Employee cards list failed", exception, request)
      return response.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  /**
   * Update employee card status
   *
   * @param {Object} request
   * @param {Object} response
   */
  static async updateEmployeeCardStatus(request, response) {
    try {
      let card = await EmployeeCard.findOne({ id: request.params.id });
      if (!card) {
        return response.status(400).send({
          status: false,
          message: "Card Request Does Not Exist",
        });
      }
      if (!["ACTIVE", "DISABLED"].includes(request.body.status)) {
        Logger.error({
          error_type: ERROR_TYPES.VALIDATION_ERROR,
          error_code: ERROR_CODES.INVALID_CARD_UPDATE_STATUS,
          message:ERROR_MESSAGES.INVALID_CARD_UPDATE_STATUS,
          source_ip: request.headers['sourceip'] || request.ip,
          user_id: request.user ? request.user.id : undefined,
          request_id: request.requestId,
        });
        return response.status(400).send({
          status: false,
          message: "Status must Dispatched or Printed",
        });
      }
      let obj = {
        card_status: request.body.status,
        remark: request.body.remark,
      };
      obj["is_active"] = request.body.status === "ACTIVE" ? 1 : 0;
      obj['updated_by'] = request.user.id

      let result = await EmployeeCard.updatedCardStatus(request.params.id, obj);
      if (request.body.status === "ACTIVE") {
        await Employee.updatedEmployeeCardStatus(card.employee_id, {
          card_status: "ACTIVE",
          is_active: 1,
        });
      }

      if (request.body.status === "DISABLED") {
        await Employee.updatedEmployeeCardStatus(card.employee_id, {
          card_status: "DISABLED",
          is_active: 0,
          is_print_requested: 0,
        });
      }

      // Log employee card status update
      await Log.create({
        user_id: request.user.id,
        module: "EMPLOYEE",
        message: `Updated the employee card status to ${request.body.status} of Employee ${card.emp_id}`,
        action_type: "ACTION",
      });

      return response.send({
        status: true,
        message: "Card Status Updated Successfully",
        data: result,
      });
    } catch (exception) {
      handleErrorDbLogger("Employee cards status updation failed", exception, request)
      return response.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

}

module.exports = EmployeeController;
