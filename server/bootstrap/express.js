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
const { generateCsrfToken } = require('../app/helpers/utils')
const sessionModel = require("../app/models/Sessions");

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
const allowedOrigins = ["http://localhost:3000", 'https://10.164.58.214',"http://localhost:3001"];

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

  app.use(async (req, res, next) => {
    const sessionId = req.headers['session-id'];
    if (sessionId) {
      const sessionData = await sessionModel.getById(sessionId);
      if (sessionData) {
        req.sessionData = sessionData;
      } else {
        return res.status(403).send('Invalid session.');
      }
    } else if(!req.url.includes('web-services') && !req.url.includes('handshake')) {
      return res.status(403).send('No session ID provided.');
    }
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

async function handleHandshake(req, res) {
  const { publicKey } = req.body;
  const sessionId = req.headers['session-id']; // Assuming the session ID is sent in headers

  if (!sessionId) {
    // If there's no session ID in the headers, create a new session
    const newSessionId = uuidv4();
    const csrfToken = generateCsrfToken();
    
    await sessionModel.create({
      SessionId: newSessionId,
      PublicKey: publicKey,
      CsrfToken: csrfToken,
    });
    
    return res.json({ 
      serverPublicKey: req.app.locals.publicKey, 
      csrfToken, 
      sessionId: newSessionId 
    });
  } else {
    // Check if the session already exists
    const existingSession = await sessionModel.getById(sessionId);
    
    if (existingSession) {
      // Update the existing session's PublicKey and CsrfToken
      const csrfToken = generateCsrfToken();
      await sessionModel.updateKeyAndCsrfBySessionId(sessionId, publicKey,csrfToken)
      return res.json({ 
        serverPublicKey: req.app.locals.publicKey, 
        csrfToken, 
        sessionId 
      });
    } else {
      // If the session doesn't exist, create a new session
      const newSessionId = uuidv4();
      const csrfToken = generateCsrfToken();
      
      await sessionModel.create({
        SessionId: newSessionId,
        PublicKey: publicKey,
        CsrfToken: csrfToken,
      });
      
      return res.json({ 
        serverPublicKey: req.app.locals.publicKey, 
        csrfToken, 
        sessionId: newSessionId 
      });
    }
  }
}

function validateCsrfToken(req, res, next) {
  const csrfToken = req.sessionData?.CsrfToken;
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
