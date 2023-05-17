const { categorySchema } = require('./schemas');

const validateCategory = (name) => {
  const { error } = categorySchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateCategory,
};