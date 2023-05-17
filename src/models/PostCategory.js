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
      timestamps: false,
      tableName: "posts_categories",
      underscored: true,
    },
  );

  PostCategory.associate = ({ Category, BlogPost }) => {
    BlogPost.belongsToMany(Category, {
      as: "categories",
      through: PostCategory,
      foreignKey: "post_id",
      otherKey: "category_id",
    });
    Category.belongsToMany(BlogPost, {
      as: "blogPosts",
      through: PostCategory,
      foreignKey: "category_id",
      otherKey: "post_id",
    });
  };

  return PostCategory;
};
