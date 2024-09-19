"use strict";

// Required modules
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const RoleModule = require("./../models/RoleModule");
const Permission = require("./../models/Permission");
const Session = require("./../models/Sessions");
const Log = require("../models/Log");
const {
  ERROR_CODES,
  ERROR_TYPES,
  ERROR_MESSAGES,
} = require("../helpers/error-codes");
const Logger = require("../../bootstrap/logger");
const { handleErrorDbLogger } = require("../helpers/commonErrorLogger");
const { authenticate } = require('../helpers/ActiveDirectoryService');

class LoginController {
  /**
   * User authentication
   *
   * @param {object} request
   * @param {object} response
   */
  static async login(request, response) {
    try {
      const user = await User.findOne({ email: request.body.email });

      // If user does not exist, return error
      if (!user) {
        Logger.error({
          error_type: ERROR_TYPES.AUTHENTICATION_ERROR,
          error_code: ERROR_CODES.USER_AUTHENTICATION_ERROR,
          message: ERROR_MESSAGES.AUTHENTICATION_FAILED_NO_USER,
          source_ip: request.headers['sourceip'] || request.ip,
          user_id: "NA",
          request_id: request.requestId,
        });
        return response.status(400).send({
          message:
            "Authentication failed. No registered user found for the given email",
        });
      }

      // If user is inactive, return error
      if (!user.is_active) {
        Logger.error({
          error_type: ERROR_TYPES.UN_AUTHORIZATION_ERROR,
          error_code: ERROR_CODES.AUTHENTICATION_FAILED_USER_DISABLED,
          message: ERROR_MESSAGES.AUTHENTICATION_FAILED_USER_DISABLED,
          source_ip: request.headers['sourceip'] || request.ip,
          user_id: user.id,
          request_id: request.requestId,
        });
        return response.status(400).send({
          message:
            "Authentication failed. User is disabled to login. Please contact admin.",
        });
      }
       
      const isAuthenticated = await authenticate(request.body.email , request.body.password);

    
      // If passwords do not match, return error
      if (!isAuthenticated) {
        Logger.error({
          error_type: ERROR_TYPES.UN_AUTHORIZATION_ERROR,
          error_code: ERROR_CODES.AUTHENTICATION_FAILED_INCORRECT_CREDENTIALS,
          message: ERROR_MESSAGES.AUTHENTICATION_FAILED_INCORRECT_CREDENTIALS,
          source_ip: request.headers['sourceip'] || request.ip,
          user_id: user.id,
          request_id: request.requestId,
        });
        return response.status(400).send({
          message: "Authentication failed. Incorrect username/password.",
        });
      }

      const modules = await RoleModule.list();
      const userPermissions = await Permission.permissionByRole(user?.role_id);

      const formattedPermissions = userPermissions.map((permission) => {
        const module = modules.find(
          (module) => module.id === permission.module_id
        );
        return {
          module: module?.name,
          is_read: permission.is_read,
          is_write: permission.is_write,
          is_delete: permission.is_delete,
          is_update: permission.is_update,
          slug: module?.slug,
          parent_id: module?.parent_id,
          id: permission.module_id,
        };
      });
      await Session.updateUserIdBySessionId(request.headers['session-id'], user.id)
      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.APP_KEY,
        {
          expiresIn: "6h"
        }
      );

      // Log login action
      await Log.create({
        user_id: user.id,
        module: "LOGIN",
        message: "Logged in to the application.",
        action_type: "ACTION",
      });

      // Return user details and token
      return response.status(200).send({
        message: "User Details",
        token: token,
        name: user.name,
        email: user.email,
        role: user.role?.slug,
        id: user.id,
        user_permissions: formattedPermissions,
      });
    } catch (exception) {
      console.error(exception)
      handleErrorDbLogger("User Authentication failed", exception, request);
      return response.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }

  /**
   * User Logout
   *
   * @param {object} request
   * @param {object} response
   */
  static async logout(request, response) {
    try {
      await Log.create({
        user_id: request.user.id,
        module: "LOGIN",
        message: "Logged out from the application.",
        action_type: "ACTION",
      });
      await Session.deleteByUserId(request.user.id)
      return response.status(200).send({
        message: "Logged out successfully",
      });
    } catch (exception) {
      handleErrorDbLogger("User Logo out failed", exception, request);
      return response.status(500).send({
        status: false,
        message: "Internal Server Error",
      });
    }
  }
}

module.exports = LoginController;
