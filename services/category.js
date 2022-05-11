const { Category } = require('../models');

async function create(name, t) {
  try {
    const newCategory = await Category.create({ name }, { transaction: t });

    return newCategory;
  } catch (e) {
    return { status: 500, message: e.message };
  }
}

module.exports = { create };