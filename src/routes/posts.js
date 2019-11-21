import controller from "../controllers/posts";
import validateToken from "../middleware/jwt";
import postSchema from "../joiSchema/posts";
import joiMiddleware from "../middleware/joi";
module.exports = router => {
  router
    .route("/posts")
    .get(validateToken, controller.getPosts)
    .post(
      joiMiddleware(postSchema.addPost, "body"),
      validateToken,
      controller.addPost
    );
  router
    .route("/posts/votes")
    .post(
      joiMiddleware(postSchema.addVote, "body"),
      validateToken,
      controller.addRemoveVotes
    );
};
