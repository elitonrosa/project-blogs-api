const { validadeNewUser } = require('./validations/userValidations');

const { User } = require('../models');

const { generateToken } = require('../helpers/tokenHelper');
const schema = require('./validations/userValidations');

const create = async (displayName, email, password, image) => {
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

  const user = await User.findByPk(id, { raw: true, attributes: { exclude: ['password'] } });
  if (!user) return { type: 'USER_NOT_FOUND', message: 'User does not exist' };

  return { type: null, message: user };
};

const listAll = async () => {
  const result = await User.findAll({ attributes: { exclude: ['password'] }, raw: true });

  return { type: null, message: result };
};

module.exports = {
  create,
  findById,
  listAll,
};
