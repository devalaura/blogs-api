const Sequelize = require('sequelize');

const config = require('../config/config');
const service = require('../services/login');

const sequelize = new Sequelize(config.development);

async function login(req, res, next) {
  const t = await sequelize.transaction();
  
  try {
    const { email, password } = req.body;

    const newLogin = await service.login(email, password, t);

    if (newLogin.status) {
      await t.rollback();
      return res.status(newLogin.status).json(newLogin.message);
    }

    await t.commit();
    return res.status(200).json({ token: newLogin });
  } catch (e) {
    await t.rollback();
    next(e);
  }
}

module.exports = { login };