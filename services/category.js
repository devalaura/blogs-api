const { Category } = require('../models');

async function create(name, t) {
  try {
    const newCategory = await Category.create({ name }, { transaction: t });

    return newCategory;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

async function getAll(t) {
  try {
    const findAll = await Category.findAll({}, { transaction: t });

    return findAll;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

module.exports = { create, getAll };