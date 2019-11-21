import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
const { host, port } = process.env;
// swagger definition
const baseUrl = `${host}:${port}`;
const swaggerDefinition = {
  info: {
    title: "Node Swagger API",
    version: "1.0.0",
    description: "Demonstrating how to describe a RESTful API with Swagger"
  },

  host: `${baseUrl}`,
  basePath: "/"
};

// options for the swagger docs
export const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,

  // path to the API docs
  apis: [path.resolve(__dirname, "../controllers/*.js")]
};

// initialize swagger-jsdoc
export const swaggerSpec = swaggerJSDoc(options);
