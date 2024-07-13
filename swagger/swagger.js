const swaggerJsdoc = require("swagger-jsdoc");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "BhaaratPool",
    version: "1.0.0",
    description: "Description of your API",
  },
  servers: [
    {
      url: "http://localhost:8080", // Replace with your server URL
      description: "Development server",
    },
  ],
};

// Options for the swagger-jsdoc
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./swagger/docs.js"], // Replace with the path to your API routes
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
