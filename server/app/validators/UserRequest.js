"use strict";

const Validator = require("validatorjs");
const middleware = require("composable-middleware");
const User = require("../models/User");
const Logger = require("../../bootstrap/logger");
const {
  ERROR_CODES,
  ERROR_TYPES,
  ERROR_MESSAGES,
} = require("../helpers/error-codes");
const { decryptClientData } = require("../helpers/encryption");

const decryptPayload = async (payload, headers, properties,request) => {
  const serverPrivateKey = request.app.locals.privateKey;
  await Promise.all(
    properties.map(async (property) => {
      if (payload[property]) {
        payload[property] = await decryptClientData(
          serverPrivateKey,
          headers["encrypted-key"],
          payload[property]
        );
      }
    })
  );
};

const validateOnStore = () => {
  return middleware().use(validate());
};

const validateOnUpdate = () => {
  return middleware().use(validate());
};

const validateUser = () => {
  return middleware().use(exists());
};

const exists = () => {
  return async (request, response, next) => {
    const user = await User.findOne({ id: request.params.id });
    if (!user) {
      Logger.error({
        error_type: ERROR_TYPES.NOT_FOUND_ERROR,
        error_code: ERROR_CODES.USER_NOT_FOUND,
        message: ERROR_MESSAGES.USER_NOT_FOUND,
        source_ip: request.headers['sourceip'] || request.ip,
        user_id: request.user ? request.user.id : undefined,
        request_id: request.requestId,
      });
      return response
        .status(404)
        .send({ status: false, message: "User not found" });
    }

    request.admin_user = user;
    next();
  };
};

const validate = () => {
  return async (request, response, next) => {
    const payload = request.body;
    await decryptPayload(payload, request.headers, [
      "name",
      "phone"
    ],request);

    let rules = {
      name: "required|max:150",
      email: "required|max:150|email",
      phone: "required|max:20",
      role_id: "required|integer",
      is_active: "required|integer",
    };

    let validation = new Validator(payload, rules);

    if (validation.fails()) {
      Logger.error({
        error_type: ERROR_TYPES.VALIDATION_ERROR,
        error_code: ERROR_CODES.INVALID_INPUT,
        message: ERROR_MESSAGES.INVALID_INPUT,
        source_ip: request.headers['sourceip'] || request.ip,
        user_id: request.user ? request.user.id : undefined,
        request_id: request.requestId,
      });
      return response.status(400).send({
        status: false,
        message: "Uh ooh! Please check the errors",
        errors: validation.errors.errors,
      });
    }
    next();
  };
};

module.exports = {
  validateOnStore,
  validateOnUpdate,
  validateUser,
};
