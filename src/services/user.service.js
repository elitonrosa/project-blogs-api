const { validadeNewUser } = require('./validations/userValidations');

const { User } = require('../models');

const { generateToken } = require('../helpers/tokenHelper');
const schema = require('./validations/userValidations');

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

const findById = async (id) => {
  const error = schema.validateId(id);
  if (error.type) return error;

  const user = await User.findByPk(id, { raw: true });
  if (!user) return { type: 'NOT_FOUND', message: 'User not found' };

  return { type: null, message: user };
};

const listAll = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] }, raw: true });

  return { type: null, message: result };
};

module.exports = {
  createUser,
  findById,
  listAll,
};
