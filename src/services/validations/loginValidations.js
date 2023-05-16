const { emailSchema, passwordSchema, nameSchema } = require('./schemas');

const validateEmail = (email) => {
  const { error } = emailSchema.validate({ email });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validatePassword = (password) => {
  const { error } = passwordSchema.validate({ password });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateName = (displayName) => {
  const { error } = nameSchema.validate({ displayName });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validadeNewUser = (displayName, email, password) => {
  const nameValidation = validateName(displayName);
  if (nameValidation.type) return nameValidation;

  const emailValidation = validateEmail(email);
  if (emailValidation.type) return emailValidation;

  const passwordValidation = validatePassword(password);
  if (passwordValidation.type) return passwordValidation;

  return { type: null, message: '' };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validadeNewUser,
};
