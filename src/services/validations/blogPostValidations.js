const { blogpostSchema, idSchema } = require('./schemas');

const validateBlogPost = (title, content, categoryIds) => {
  const { error } = blogpostSchema.validate({ title, content, categoryIds });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = idSchema.validate({ id });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateBlogPost,
  validateId,
};