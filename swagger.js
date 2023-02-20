const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./index.js"];

const doc = {
  info: {
    title: "API Universities",
    description: "API Universities",
  },
  host: "localhost:4000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "User",
      description: "Endpoints",
      path: "/users",
    },
    {
      name: "University",
      description: "Endpoints",
      path: "/universities",
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "token",
      description: "Token get in login route",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
