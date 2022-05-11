const Sequelize = require('sequelize');

const service = require('../services/user');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

async function createUser(req, res, next) {
  const t = await sequelize.transaction();

  try {
    const { displayName, email, password, image } = req.body;

    const newUser = await service.createUser({ displayName, email, password, image, t });

    if (newUser.status) {
      await t.rollback();
      return res.status(newUser.status).json(newUser.message);
    }

    await t.commit();
    return res.status(201).json({ token: newUser });
  } catch (e) {
    await t.rollback();
    return next(e);
  }
}

async function getUsers(_req, res, next) {
  const t = await sequelize.transaction();

  try {
    const getAll = await service.getUsers(t);

    return res.status(200).json(getAll);
  } catch (e) {
    next(e);
  }
}

module.exports = { createUser, getUsers };