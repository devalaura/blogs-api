module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.CURRENT_TIMESTAMP,
    updated: DataTypes.CURRENT_TIMESTAMP,
  },
  { timestamps: false, tableName: 'BlogsPosts', underscored: true });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.user, {
      foreignKey: 'userId', as: 'Users',
    });
    BlogPost.hasOne(models.postcategory, {
      foreignKey: 'postId', as: 'Posts',
    });
  };

  return BlogPost;
};