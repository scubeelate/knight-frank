"use strict";

const cors = require("cors");
const crypto = require("crypto");
const errorMiddleware = require("../app/middleware/error");
const bodyParser = require("body-parser");
const hpp = require("hpp");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Logger = require("./logger");
const morgan = require("morgan");
const { getCsrfTokenId, generateCsrfToken } = require('../app/helpers/utils')
const session = require('express-session');

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});
const allowedOrigins = ["http://localhost:3000", 'https://10.164.58.214'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};
module.exports = (app) => {
  app.set('trust proxy', 1);
  app.disable("x-powered-by");
  app.set('etag', false);
  app.locals = {
    publicKey:publicKey,
    privateKey:privateKey
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000000 }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(hpp());

  app.use((req, res, next) => {
    req.requestId = uuidv4();
    next();
  });

  app.get('/', (req, res, next) => {
    return res.send('Api Server is available.')
  })
  const sessionHandler = session({ 
    secret: process.env.APP_SECRET_KEY,
    resave: false, 
    saveUninitialized: false,
    cookie: { 
      secure: true,
      sameSite:'lax', 
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time (e.g., 1 day)
  },
   proxy:true
  })
  app.use(function(req,res,next){
    if(req.url.indexOf('/api/') === 0){
      return sessionHandler(req,res,next)
    }else {
      next()
    }
  });

  app.use((req, res, next) => {

    if (req.session && !req.session.csrfToken) {
      req.session.csrfToken = generateCsrfToken();
    }
    res.locals.csrfToken = req.session.csrfToken;
    next();
  });

  app.post("/api/handshake", handleHandshake);

  app.use(validateCsrfToken);

  app.use(morganMiddleware);

  // Register routes
  registerRoutes(app);

  app.use(notFoundHandler);
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ status: false, error: 'Enter valid json body' }); // Bad request
    }

    next();
  });
  app.use(errorMiddleware);
};

function handleHandshake(req, res) {
  const { publicKey } = req.body;
  const clientCsrfId = getCsrfTokenId(req);
  req.session.csrfToken = clientCsrfId
  req.session.publicKey = publicKey
  const serverPublicKey =  req.app.locals.publicKey
  res.json({ serverPublicKey, csrfToken:  req.session.csrfToken });
}

function validateCsrfToken(req, res, next) {
  const csrfToken =  req.session.csrfToken
  const csrfHeader = req.headers['x-csrf-token'];
  if (req.method !== 'GET' && !req.url.includes('web-services') && csrfToken !== csrfHeader) {
    return res.status(403).send({
      message: 'Invalid CSRF token.'
    });
  }

  next();
}

const morganMiddleware = morgan(function (tokens, req, res) {
  return JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    headers: req.headers,
    status: Number.parseFloat(tokens.status(req, res)),
    content_length: tokens.res(req, res, "content-length") || "NA",
    response_time: Number.parseFloat(tokens["response-time"](req, res)),
    ip: req.headers['sourceip'] || req.ip,
    body: req.body,
    requestId: req.requestId,
  });
}, {
  stream: {
    write: (message) => {
      const data = JSON.parse(message);
      Logger.http(`INCOMING-REQUEST`, data);
    },
  },
});

function registerRoutes(app) {
  app.use(require("../routes/auth")(express.Router()));
  app.use("/api/statistics", require("../routes/statistics")(express.Router()));
  app.use("/api/users", require("../routes/users")(express.Router()));
  app.use("/api/roles", require("../routes/roles")(express.Router()));
  app.use("/api/employees", require("../routes/employees")(express.Router()));
  app.use("/api/card-requests", require("../routes/card-requests")(express.Router()));
  app.use("/api/reports", require("../routes/reports")(express.Router()));
  app.use("/api/web-services", require("../routes/web-services")(express.Router()));
}

function notFoundHandler(req, res, next) {
  res.status(404).send("The requested resource was not found.");
}
