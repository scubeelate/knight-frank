"use strict";

const cors = require("cors");
const hpp = require("hpp");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const express = require("express");
const path  = require('path');
const { createProxyMiddleware } = require("http-proxy-middleware");

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

module.exports = (app) => {
  app.disable("x-powered-by");
  app.set('etag', false);
  app.use(cors(corsOptions));

  app.use(hpp());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          "script-src-attr":["'self'", "'unsafe-inline'", "nonce-knight-frank-custom-nonce"]
        },
      },
    })
);
  app.use((req, res, next) => {
    res.setHeader("Permissions-Policy", "geolocation=(), interest-cohort=()");
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
  app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true } ) );
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.API_ENDPOINT+"/api",
      changeOrigin: true,
      timeout: 6000,
      pathRewrite: {
        "/api": "", // Remove the '/admin' prefix
      }
    })
  );
  app.use(
    "/profile",
    createProxyMiddleware({
      target: process.env.WEB_API_ENDPOINT,
      changeOrigin: true,
      timeout: 6000,
      pathRewrite: {
        "/profile": "", // Remove the '/admin' prefix
      }
    })
  );
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000000 }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(express.static(path.join(__dirname, './build'),{ etag: false }))

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'),{ etag: false })
  })
}