const schema = require('./validations/loginValidations');

const { User } = require('../models');

const { generateToken } = require('../helpers/tokenHelper');

const listAll = async () => {
  const result = await User.findAll({ raw: true });

  return { type: null, message: result };
};

const login = async (email, password) => {
  const error = schema.validateEmail(email);
  if (error.type) return { type: error.type, message: 'Some required fields are missing' };

  const user = await User.findOne({ where: { email }, raw: true });
  if (!user) return { type: 'INVALID_FIELDS', message: 'Invalid fields' };

  if (user.password !== password) return { type: 'INVALID_FIELDS', message: 'Invalid fields' };

  const token = generateToken(user);

  return { type: null, message: token };
};

module.exports = {
  listAll,
  login,
};