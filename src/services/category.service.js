const { Category } = require('../models');

const { validateCategory } = require('./validations/categoryValidations');

const createCategory = async (name) => {
  const error = validateCategory(name);
  if (error.type) return error;

  const { dataValues: newCategory } = await Category.create({ name });

  return { type: null, message: newCategory };
};

module.exports = {
  createCategory,
};