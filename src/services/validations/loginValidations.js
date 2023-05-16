const { emailSchema, passwordSchema } = require('./schemas');

const validateEmail = (email) => {
  const { error } = emailSchema.validate(email);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validatePassword = (password) => {
  const { error } = passwordSchema.validate(password);
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateEmail,
  validatePassword,
};