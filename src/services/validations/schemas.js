const Joi = require('joi');

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

const passwordSchema = Joi.object({
  password: Joi.string().min(6).required(),
});

const nameSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
});

const idSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const categorySchema = Joi.object({
  name: Joi.string().min(3).required(),
});

const postTitleSchema = Joi.object({
  title: Joi.string().min(3).required(),
});

const postContentSchema = Joi.object({
  content: Joi.string().min(3).required(),
});

const blogpostSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
  categoryIds: Joi.array().items(Joi.number().integer().positive()).min(1).required(),
});

const blogpostUpdateSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
});

module.exports = {
  emailSchema,
  passwordSchema,
  nameSchema,
  idSchema,
  categorySchema,
  postTitleSchema,
  postContentSchema,
  blogpostSchema,
  blogpostUpdateSchema,
};