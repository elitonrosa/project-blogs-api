const { validadeNewUser } = require('./validations/loginValidations');

const { User } = require('../models');
const { generateToken } = require('../helpers/tokenHelper');

const createUser = async (displayName, email, password, image) => {
  const error = validadeNewUser(displayName, email, password);
  if (error.type) return error;

  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) return { type: 'USER_CONFLICT', message: 'User already registered' };

  const { dataValues: newUser } = await User.create({
    displayName,
    email,
    password,
    image,
  });

  const token = generateToken(newUser);

  return { type: null, message: token };
};

module.exports = {
  createUser,
};
