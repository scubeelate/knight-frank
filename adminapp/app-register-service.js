const { Service } = require("node-windows");

const svc = new Service({
  name: "SMART BUSINESS CARD ADMIN APP",
  description: "This is Scube Smart Business Card Application Service for POC",
  script: "index.js",
});
svc.install();
