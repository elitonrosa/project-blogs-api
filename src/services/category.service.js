const { Category } = require('../models');

const { validateCategory } = require('./validations/categoryValidations');

const createCategory = async (name) => {
  const error = validateCategory(name);
  if (error.type) return error;

  const { dataValues: newCategory } = await Category.create({ name });

  return { type: null, message: newCategory };
};

const listAll = async () => {
  const result = await Category.findAll({ raw: true });

  return { type: null, message: result };
};

module.exports = {
  createCategory,
  listAll,
};