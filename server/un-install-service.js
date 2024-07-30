const { Service } = require("node-windows");

const svc = new Service({
  name: "SMART BUSINESS CARD API SERVER",
  description: "This is Scube Smart Business Card Application Service for POC",
  script: "index.js",
});

svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
  });
  
  // Uninstall the service.
  svc.uninstall();