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
      if (await Employee.findOne({ emp_id: request.body.emp_id })) {
        return response.status(400).send({
          status: false,
          message: "Employee already exists with the given employee ID",
        });
      }
      
      let data = _.pick(request.body, [
        "emp_id",
        "name",
        "email",
        "phone",
        "department",
        "designation",
        "work_location",
        "image_base64",
        "blood_group",
      ]);
      data['created_by'] = request.user.id
      await Employee.create(data);

      // Log employee creation
      await Log.create({
        user_id: request.user.id,
        module: "EMPLOYEE",
        message: `Created employee with ID ${data.emp_id}`,
        action_type: "ACTION",
      });

      return response.status(201).send({
        status: true,
        message: "Employee created successfully",
      });
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
      'email', 'emp_id','blood_group'
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
   * Update employee details
   *
   * @param {Object} request
   * @param {Object} response
   */
  static async update(request, response) {
    try {
      let data = _.pick(request.body, [
        "emp_id",
        "name",
        "phone",
        "department",
        "designation",
        "work_location",
        "image_base64",
        "email"
      ]);
      data['updated_by'] = request.user.id

      const updated = _.merge(request.employee, data);
      let result = await Employee.updatedRecord(request.params.id, updated);

      // Log employee details update
      await Log.create({
        user_id: request.user.id,
        module: "EMPLOYEE",
        message: `Updated the details of employee ID ${data.emp_id}`,
        action_type: "ACTION",
      });

      return response.send({
        status: true,
        message: "Employee updated successfully",
        data: result,
      });
    } catch (exception) {
      handleErrorDbLogger("Employee updation failed", exception, request);
      return response.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  /**
   * Request for employee card print
   *
   * @param {Object} request
   * @param {Object} response
   */
  static async employeeCardPrintRequest(request, response) {
    try {
      let employee = request.employee;
      let obj = {
        employee_id: employee.id,
        card_uuid: uuidv4(),
        name: employee.name,
        emp_id: employee.emp_id,
        designation: employee.designation,
        department: employee.department,
        blood_group: employee.blood_group,
        image_base64: employee.image_base64,
        card_status: "REQUESTED",
        created_by: request.user.id
      };
      let cardExists = await EmployeeCard.findOne({ employee_id: employee.id });
      if (cardExists) {
        obj["is_reprint"] = 1;
      }
      await EmployeeCard.create(obj);
      await Employee.updatedCardStatus(employee.id, {
        is_print_requested: 1,
        card_status: "REQUESTED",
      });

      // Log card print request
      await Log.create({
        user_id: request.user.id,
        module: "EMPLOYEE",
        message: `Requested card print for employee with ID ${employee.emp_id}`,
        action_type: "ACTION",
      });

      return response.status(200).send({
        status: true,
        message: "Card request submitted successfully",
      });
    } catch (exception) {
      console.error(exception)
      handleErrorDbLogger("Employee card print request failed", exception, request)
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

  /**
   * Update bulk employee data
   *
   * @param {Object} request
   * @param {Object} response
   */
  static async bulkDataUpload(request, response) {
    try {
      // Validation of request body
      const body = request.body;

      const rules = {
        emp_id: "required|max:100",
        name: "required|max:150",
        email: "email|max:225",
        phone: "max:13",
        department: "string|max:100",
        designation: "string|max:100",
        work_location: "string|max:3000",
      };

      // Process each employee in the request
      let response_list = [];
      for (let employee of body.employees) {
        const serverPrivateKey = NodeCache.get("privateKey");
        const encryptionPromises = [
          "name",
          "designation",
          "department",
          "phone",
          "email",
          "emp_id",
          "blood_group",
        ].map(async (property) => {
          if (employee[property]) {
            employee[property] = await decryptClientData(
              serverPrivateKey,
              request.headers["encrypted-key"],
              employee[property]
            );
          }
        });
        await Promise.all(encryptionPromises);
        let validation = new Validator(employee, rules);
        if (validation.fails()) {
          const error = validation.errors.errors;
          response_list.push({
            emp_id: employee.emp_id,
            email: employee.email,
            status: "REJECTED",
            remark: error[Object.keys(error)[0]].join(),
          });
        } else {
          let employeeExist = await Employee.isExists(employee);
          if (!employeeExist) {
            let data = _.pick(employee, [
              "emp_id",
              "name",
              "email",
              "phone",
              "department",
              "designation",
              "work_location",
              "blood_group",
            ]);
            data['created_by']= request.user.id

            // Create employee
            await Employee.create(data);
            console.log(data);
            response_list.push({
              emp_id: employee.emp_id,
              email: employee.email,
              status: "SUCCESS",
              remark: "NA",
            });
          } else {
            response_list.push({
              emp_id: employee.emp_id,
              email: employee.email,
              status: "ERROR",
              remark: "Employee already exists with this email/Id",
            });
          }
        }
      }

      // Log bulk data upload
      await Log.create({
        user_id: request.user.id,
        module: "EMPLOYEE",
        message: `Initiated the Bulk upload of ${body.employees.length} Employees`,
        action_type: "ACTION",
      });

      return response.send({
        status: true,
        data: "success",
        response_list: response_list,
      });
    } catch (exception) {
      handleErrorDbLogger("Employee bulk image upload failed", exception, request)
      return response.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = EmployeeController;
