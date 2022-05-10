module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  { timestamps: false, tableName: 'Categories', underscored: true });

  Category.associate = (models) => {
    Category.hasOne(models.postcategory, {
      foreignKey: 'categoryId', as: 'Posts',
    });
  };

  return Category;
};