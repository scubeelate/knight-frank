const express = require("express");

// Import the dotenv library for loading environment variables
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;

// Create an instance of the Express application
const app = express();

try {
  require("./bootstrap/express")(app);

  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
} catch (error) {
  console.error("Error occurred during server setup:", error);
  process.exit(1); // Using 1 for error exit
}