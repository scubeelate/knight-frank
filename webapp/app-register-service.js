const { Service } = require("node-windows");

const svc = new Service({
  name: "SMART BUSINESS CARD PUBIC USERS",
  description: "This is Scube Smart Business Card Application Service for POC",
  script: "index.js",
});
svc.install();
