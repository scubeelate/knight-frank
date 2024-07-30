"use strict";

const jwt = require("jsonwebtoken");

const {
  ConfidentialClientApplication,
  CryptoProvider,
} = require("@azure/msal-node");

const { ConfigurationUtils } = require("./config");
const { TokenValidator } = require("./tokens");

const { ErrorMessages } = require("./errors");

const constants = require("./constants");
const User = require("../../models/User");
const RoleModule = require("../../models/RoleModule");
const Permission = require("../../models/Permission");
const NodeCache = require("memory-cache");
const { getSessionId } = require('../../helpers/utils')

/**
 * MSAL Node Confidential ClientApplication object.
 *
 * Session variables accessible are as follows:
 * req.session.isAuthenticated => boolean
 * req.session.isAuthorized => boolean
 * req.session.idTokenClaims => object
 * req.session.homeAccountId => string
 * req.session.account => object
 * req.session.resourceName.accessToken => string
 */
class AuthProvider {
  appSettings;
  msalConfig;
  cryptoProvider;
  tokenValidator;
  msalClient;

  /**
   * @param {JSON} appSettings
   */
  constructor(appSettings) {
    ConfigurationUtils.validateAppSettings(appSettings);

    this.cryptoProvider = new CryptoProvider();

    this.appSettings = appSettings;
    this.msalConfig = ConfigurationUtils.getMsalConfiguration(appSettings);
    this.tokenValidator = new TokenValidator(this.appSettings, this.msalConfig);
    this.msalClient = new ConfidentialClientApplication(this.msalConfig);
  }

  // ========== MIDDLEWARE ===========

  /**
   * Initiate sign in flow
   * @param {Object} req: express request object
   * @param {Object} res: express response object
   */
  signIn = async (req, res) => {
    /**
     * Request Configuration
     * We manipulate these three request objects below
     * to acquire a token with the appropriate claims
     */

    if (!req.session["authCodeRequest"]) {
      req.session.authCodeRequest = {
        authority: "",
        scopes: [],
        state: {},
        redirectUri: "",
      };
    }

    if (!req.session["tokenRequest"]) {
      req.session.tokenRequest = {
        authority: "",
        scopes: [],
        state: {},
        redirectUri: "",
      };
    }

    // current account id
    req.session.homeAccountId = "";

    // random GUID for csrf check
    req.session.nonce = this.cryptoProvider.createNewGuid();

    // sign-in as usual
    const state = this.cryptoProvider.base64Encode(
      JSON.stringify({
        stage: constants.AppStages.SIGN_IN,
        path: req.route.path,
        nonce: req.session.nonce,
      })
    );

    // get url to sign user in (and consent to scopes needed for application)
    this.getAuthCode(
      this.msalConfig.auth.authority,
      Object.values(constants.OIDCScopes),
      state,
      this.appSettings.settings.redirectUri,
      req,
      res
    );
  };

  /**
   * Initiate sign out and clean the session
   * @param {Object} req: express request object
   * @param {Object} res: express response object
   * @param {Function} next: express next
   */
  signOut = async (req, res) => {
    /**
     * Construct a logout URI and redirect the user to end the
     */
    req.session.isAuthenticated = false;

    req.session.destroy(() => {
      res.status(200).send({status: false, message:"User Logout Successfully!."});
    });
  };

  /**
   * Middleware that handles redirect depending on request state
   * There are basically 1 stages: sign-in
   * @param {Object} req: express request object
   * @param {Object} res: express response object
   */
  validateAuthAccessToken = async (req, res) => {
    const state = JSON.parse(this.cryptoProvider.base64Decode(req.body.state));

    // check if nonce matches
    if (state.nonce === req.session.nonce) {
      switch (state.stage) {
        case constants.AppStages.SIGN_IN: {
          // token request should have auth code
          const tokenRequest = {
            redirectUri: this.appSettings.settings.redirectUri,
            scopes: Object.keys(constants.OIDCScopes),
            code: req.body.code,
          };

          try {
            // exchange auth code for tokens
            const tokenResponse = await this.msalClient.acquireTokenByCode(
              tokenRequest
            );
            const user = await User.findOne({
              email: tokenResponse.account.username,
            });
            if (!user) {
              return res
                .status(200)
                .send({ status: false, message: "User not found" });
            }

            if (user && !user.is_active) {
              return res.status(200).send({
                status: false,
                message: "User is not active. Please contact the administrator",
              });
            }

            if (
              this.tokenValidator.validateIdToken(tokenResponse.idTokenClaims)
            ) {
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
              req.session.homeAccountId = tokenResponse.account.homeAccountId;

              req.session.userInfo = {
                name: tokenResponse.account.name,
                email: tokenResponse.account.username,
                permissions: formattedPermissions,
              };

              // assign session variables
              req.session.idTokenClaims = tokenResponse.idTokenClaims;
              req.session.isAuthenticated = true;

              NodeCache.put('LOGGED_IN'+user.id, true,2 * 60 * 60 * 1000);
              const sessionId = getSessionId(req);
              const userInfo = {
                name: user.name,
                email: user.username,
                permissions: formattedPermissions,
                id: user.id,
               };
               NodeCache.put(sessionId,JSON.stringify(userInfo), 2 * 60 * 60 * 1000);

              return res.status(200).send({
                message: "User Details",
                token: jwt.sign(
                  {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  },
                  process.env.APP_KEY
                ),
                name: user.name,
                email: user.email,
                role: user.role?.slug,
                id: user.id,
                user_permissions: formattedPermissions,
              });
            } else {

              return res
                .status(401)
                .send({ status: false, message: ErrorMessages.NOT_PERMITTED });
            }
          } catch (error) {
            console.log(error);
            res
              .status(500)
              .send({ status: false, message: ErrorMessages.NOT_PERMITTED });
          }
          break;
        }
        default:
          res
            .status(500)
            .send({
              status: false,
              message: ErrorMessages.CANNOT_DETERMINE_APP_STAGE,
            });
          break;
      }
    } else {
      console.log(state.nonce,req.session.nonce)
      res
        .status(401)
        .send({ status: false, message: ErrorMessages.NOT_PERMITTED });
    }
  };

  // ============== GUARD ===============

  /**
   * Check if authenticated in session
   * @param {Object} req: express request object
   * @param {Object} res: express response object
   * @param {Function} next: express next
   */
  isAuthenticated = (req, res, next) => {
    next();

    if (req.session) {
      if (!req.session.isAuthenticated) {
        return res.status(401).send({
          status: false,
          message: ErrorMessages.NOT_PERMITTED,
        });
      }
      next();
    } else {
      return res.status(401).send({
        status: false,
        message: ErrorMessages.NOT_PERMITTED,
      });
    }
  };

  /**
   * Receives access token in req authorization header
   * and validates it using the jwt.verify
   * @param {Object} req: express request object
   * @param {Object} res: express response object
   * @param {Function} next: express next
   */
  isAuthorized = async (req, res, next) => {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (req.headers.authorization) {
      if (
        !(await this.tokenValidator.validateAccessToken(
          accessToken,
          req.route.path
        ))
      ) {
        return res.status(401).send({status: false, message: ErrorMessages.NOT_PERMITTED});
      }

      next();
    } else {
      res.status(401).send({status: false, message: ErrorMessages.NOT_PERMITTED});
    }
  };

  // ============== UTILS ===============

  /**
   * This method is used to generate an auth code request
   * @param {string} authority: the authority to request the auth code from
   * @param {Array} scopes: scopes to request the auth code for
   * @param {string} state: state of the application
   * @param {string} redirect: redirect URI
   * @param {Object} req: express request object
   * @param {Object} res: express response object
   */
  getAuthCode = async (authority, scopes, state, redirect, req, res) => {
    // prepare the request
    req.session.authCodeRequest.authority = authority;
    req.session.authCodeRequest.scopes = scopes;
    req.session.authCodeRequest.state = state;
    req.session.authCodeRequest.redirectUri = redirect;

    req.session.tokenRequest.authority = authority;

    // request an authorization code to exchange for tokens
    try {
      const response = await this.msalClient.getAuthCodeUrl(
        req.session.authCodeRequest
      );
      return res.status(200).send({ status: true, url: response });
    } catch (error) {
      return res.status(500).send({status: false, message: ErrorMessages.NOT_PERMITTED});
    }
  };

}

module.exports = { AuthProvider };
