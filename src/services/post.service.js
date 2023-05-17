require('dotenv').config();

const Sequelize = require('sequelize');
const snakeize = require('snakeize');

const { BlogPost, PostCategory } = require('../models');

const { validateBlogPost } = require('./validations/blogPostValidations');
const { validateCategoriesExist } = require('./validations/categoryValidations');

const config = require('../config/config');

const env = process.env.NODE_ENV;

const sequelize = new Sequelize(config[env]);

const createPostTransaction = async (userId, title, content, categoryIds) => {
  const newBlogPost = await sequelize.transaction(async (t) => {
    const { dataValues: newPost } = await BlogPost.create(
      {
        title,
        content,
        userId,
        published: new Date(),
        updated: new Date(),
      },
      { transaction: t, raw: true },
    );

    const categories = categoryIds.map((id) => ({ postId: newPost.id, categoryId: id }));

    await PostCategory.bulkCreate(snakeize(categories), { transaction: t });

    return newPost;
  });

  return { type: null, message: newBlogPost };
};

const createPost = async (userId, title, content, categoryIds) => {
  const blogPostValidation = validateBlogPost(title, content, categoryIds);
  if (blogPostValidation.type) return blogPostValidation;

  const categoriesValidation = await validateCategoriesExist(categoryIds);
  if (categoriesValidation.type) return categoriesValidation;

  try {
    return await createPostTransaction(userId, title, content, categoryIds);
  } catch (err) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' };
  }
};

module.exports = {
  createPost,
};
