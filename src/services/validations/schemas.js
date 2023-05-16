const Joi = require('joi');

const emailSchema = Joi.string().email().required();

const passwordSchema = Joi.string().min(6).required();

module.exports = {
  emailSchema,
  passwordSchema,
};