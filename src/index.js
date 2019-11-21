import "dotenv/config";
import express from "express";

import middleware from "./middleware";
import db from "./database/models";
import routes from "./routes";

const router = express.Router();

const { port } = process.env;
const app = express();

middleware(app);

app.use(
  "/api/v1",
  (req, res, next) => {
    req.db = db;
    next();
  },
  routes(router)
);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
