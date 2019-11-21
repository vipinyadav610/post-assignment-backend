import bodyParser from "body-parser";
import { swaggerSpec } from "./swagger";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import logger from "morgan";

const { host, port, NODE_ENV } = process.env;

const middleware = app => {
  app.use(cors());

  app.use(bodyParser.json());

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  if (NODE_ENV !== "production") {
    app.use(logger("dev"));
  }

  // serve swagger
  app.get("/swagger.json", function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  var options = {
    swaggerOptions: {
      url: `http://${host}:${port}/swagger.json`
    }
  };
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, options));
};
export default middleware;
