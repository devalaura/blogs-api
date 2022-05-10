module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, { 
    timestamps: false, tableName: 'PostsCategories', underscored: true,
  });

  PostCategory.associate = (models) => {
    models.blogpost.belongsToMany(models.category, {
      as: 'Posts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.category.belongsToMany(models.blogpost, {
      as: 'Categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};