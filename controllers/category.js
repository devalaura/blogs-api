const Sequelize = require('sequelize');

const config = require('../config/config');
const service = require('../services/category');

const sequelize = new Sequelize(config.development);

async function create(req, res, next) {
  const t = await sequelize.transaction();
  
  try {
    const { name } = req.body;

    if (!name || name === '') {
      await t.rollback();
      return res.status(400).json({ message: '"name" is required' });
    }

    const newCategory = await service.create(name, t);

    if (newCategory.status) {
      await t.rollback();
      return res.status(newCategory.status).json(newCategory.message);
    }

    await t.commit();
    return res.status(201).json(newCategory);
  } catch (e) {
    await t.rollback();
    return next(e);
  }
}

module.exports = { create };