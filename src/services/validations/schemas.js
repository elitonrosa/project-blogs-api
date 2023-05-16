const Joi = require('joi');

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// const passwordSchema = Joi.string().min(6).required();
const passwordSchema = Joi.object({
  password: Joi.string().min(6).required(),
});

// const nameSchema = Joi.string().min(8).required();
const nameSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
});

module.exports = {
  emailSchema,
  passwordSchema,
  nameSchema,
};