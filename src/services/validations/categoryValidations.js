const { Category } = require('../../models');

const { categorySchema } = require('./schemas');

const validateCategory = (name) => {
  const { error } = categorySchema.validate({ name });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateCategoriesExist = async (categoryIds) => {
  const allCategories = await Category.findAll({ raw: true, attributes: ['id'] });
  if (!categoryIds.every((id) => allCategories.some((category) => category.id === id))) {
    return { type: 'INVALID_VALUE', message: 'one or more "categoryIds" not found' };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateCategory,
  validateCategoriesExist,
};