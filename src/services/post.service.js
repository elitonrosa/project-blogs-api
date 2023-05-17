require('dotenv').config();

const Sequelize = require('sequelize');

const { BlogPost, PostCategory, User, Category } = require('../models');

const {
  validateBlogPost,
  validateId,
  validateBlogPostUpdate,
} = require('./validations/blogPostValidations');
const { validateCategoriesExist } = require('./validations/categoryValidations');

const config = require('../config/config');

const env = process.env.NODE_ENV;
const sequelize = new Sequelize(config[env]);

const createPostTransaction = async (userId, title, content, categoryIds) => {
  const newBlogPost = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create(
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

    await PostCategory.bulkCreate(categories, { transaction: t });

    return newPost;
  });

  return { type: null, message: newBlogPost };
};

const create = async (userId, title, content, categoryIds) => {
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

const listAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: posts };
};

const findById = async (postId) => {
  const idValidation = validateId(postId);
  if (idValidation.type) return idValidation;

  const post = await BlogPost.findByPk(postId, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: post };
};

const updatePostTransaction = async (title, content, postId) => {
  const updatedPost = await sequelize.transaction(async (t) => {
    await BlogPost.update(
      { title, content, updated: new Date() },
      { where: { id: postId }, transaction: t },
    );
    const post = await BlogPost.findByPk(
      postId,
      {
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
        transaction: t,
      },
    );

    return post;
  });

  return { type: null, message: updatedPost };
};

const update = async (title, content, postId, userId) => {
  const post = await BlogPost.findByPk(postId);
  if (!post) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };
  if (post.userId !== userId) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };

  const blogPostValidation = validateBlogPostUpdate(title, content);
  if (blogPostValidation.type) return blogPostValidation;

  try {
    return await updatePostTransaction(title, content, postId);
  } catch (err) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' };
  }
};

const destroy = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);
  if (!post) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };
  if (post.userId !== userId) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };

  try {
    await sequelize.transaction(async (t) => {
      await BlogPost.destroy({ where: { id: postId }, transaction: t });
    });

    return { type: null, message: '' };
  } catch (err) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error' };
  }
};

module.exports = {
  create,
  listAll,
  findById,
  update,
  destroy,
};
