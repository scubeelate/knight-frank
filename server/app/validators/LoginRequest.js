const Validator = require('validatorjs');
const Logger = require("../../bootstrap/logger");
const { ERROR_CODES, ERROR_TYPES, ERROR_MESSAGES} = require("../helpers/error-codes");
const { decryptClientData } = require("../helpers/encryption");

module.exports = async (request, response, next) => {

    const serverPrivateKey = request.app.locals.privateKey;
    if(request.body['password']){
        request.body['password'] = await decryptClientData(serverPrivateKey,request.headers["encrypted-key"],request.body.password)
    }
    if(request.body['email']){
        request.body['email'] = await decryptClientData(serverPrivateKey,request.headers["encrypted-key"],request.body.email)
    }

    let validation = new Validator(request.body, {
        'email': 'required|email|max:255',
        'password': 'required',
    });

    if (validation.fails()) {
        Logger.error({
            error_type: ERROR_TYPES.VALIDATION_ERROR,
            error_code: ERROR_CODES.INVALID_INPUT,
            message:ERROR_MESSAGES.INVALID_INPUT,
            source_ip: request.headers['sourceip'] || request.ip,
            user_id: request.user ? request.user.id : undefined,
            request_id: request.requestId,
        });
        return response.status(400).send({
            message: "Uh ooh! Please check the errors",
            errors: validation.errors.errors
        });
    }

    next();
}