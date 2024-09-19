const Logger = require("../../bootstrap/logger");
const {
  ERROR_CODES,
  ERROR_TYPES,
  ERROR_MESSAGES,
} = require("../helpers/error-codes");
const RoleModule = require("./../models/RoleModule");
const Permission = require("./../models/Permission");

async function userPrivilege(request, response, next, module, permission) {
  let formattedPermissions = ''
  if (request.user) {
    const modules = await RoleModule.list();
      const userPermissions = await Permission.permissionByRole(request.user?.role_id);

      formattedPermissions = userPermissions.map((permission) => {
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
  }

  if (!formattedPermissions) {
    logUnauthorizedError(
      request,
      response,
      ERROR_MESSAGES.UN_AUTHORIZATION_USER
    );
    return response.status(401).send({
      status: false,
      message: "Unauthorized access. Session not found.",
    });
  }

  const moduleMeta = formattedPermissions.find((x) => x.slug === module);

  if (!moduleMeta || !moduleMeta[permission]) {
    logUnauthorizedError(
      request,
      response,
      ERROR_MESSAGES.UN_AUTHORIZATION_MODULE_ACCESS
    );
    return response.status(401).send({
      status: false,
      message: "Unauthorized access.",
    });
  }

  next();
}

function logUnauthorizedError(request, response, errorMessage) {
  Logger.error({
    error_type: ERROR_TYPES.UN_AUTHORIZATION_ERROR,
    error_code: ERROR_CODES.UN_AUTHORIZATION,
    message: errorMessage,
    source_ip: request.headers["sourceip"] || request.ip,
    user_id: request.user ? request.user.id : undefined,
    request_id: request.requestId,
  });
}

module.exports = userPrivilege;
