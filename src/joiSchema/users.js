import Joi from "joi";

const schemas = {
  signup: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required()
  }),
  login: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required()
  })
};

module.exports = schemas;
