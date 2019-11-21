import controller from "../controllers/users";
import userSchema from "../joiSchema/users";
import joiMiddleware from "../middleware/joi";

module.exports = router => {
  router
    .route("/signup")
    .post(joiMiddleware(userSchema.signup, "body"), controller.signup);

  router
    .route("/login")
    .post(joiMiddleware(userSchema.login, "body"), controller.login);
};
