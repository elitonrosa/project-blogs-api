/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: "post_id",
        references: { model: "BlogPost", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: "category_id",
        references: { model: "Category", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      underscored: true,
      tableName: "posts_categories",
      timestamps: false,
    },
  );

  PostCategory.associate = ({ Category, BlogPost }) => {
    BlogPost.belongsToMany(Category, {
      as: "categories",
      through: PostCategory,
      foreignKey: "postId",
      otherKey: "categoryId",
    });
    Category.belongsToMany(BlogPost, {
      as: "blogPosts",
      through: PostCategory,
      foreignKey: "categoryId",
      otherKey: "postId",
    });
  };

  return PostCategory;
};
