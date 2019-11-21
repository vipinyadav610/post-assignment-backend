import Joi from "joi";

const schemas = {
  addPost: Joi.object().keys({
    name: Joi.string().required()
  }),
  addVote: Joi.object().keys({
    post_id: Joi.number().required()
  })
};

module.exports = schemas;
