import users from "./users";
import posts from "./posts";

module.exports = router => {
  users(router);
  posts(router);
  return router;
};
