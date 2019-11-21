const Joi = require("joi");
const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req[property], schema);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(",");
      res.status(422).json({
        success: false,
        message
      });
    }
  };
};
export default middleware;
