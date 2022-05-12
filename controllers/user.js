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

    await t.commit();
    return res.status(200).json(getAll);
  } catch (e) {
    await t.rollback();
    return next(e);
  }
}

async function getById(req, res, next) {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    const user = await service.getById(id, t);
    if (!user) {
      await t.rollback();
      return res.status(404).json({ message: 'User does not exist' });
    }

    await t.commit();
    return res.status(200).json(user);
  } catch (e) {
    await t.rollback();
    return next(e);
  }
}

async function destroy(req, res, next) {
  const t = await sequelize.transaction();

  try {
    const { user } = req;

    const destroyUser = await service.destroy(user, t);
    if (!destroyUser) {
      await t.commit();
      return res.status(204).end();
    }
    
    await t.rollback();
    return res.status(destroyUser.status).json(destroyUser.message);
  } catch (e) {
    await t.rollback();
    return next(e);
  }
}

module.exports = { createUser, getUsers, getById, destroy };