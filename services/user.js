const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');
const invalidUser = require('../middlewares/user');

async function createUser({ displayName, email, password, image, t }) {
  try {
    const invalidData = invalidUser(displayName, email, password, image);

    if (invalidData.status) {
      return invalidData;
    }

    const findExistingUser = await User.findOne({ where: { email } });
    if (findExistingUser) return { status: 409, message: { message: 'User already registered' } };

    await User.create({ displayName, email, password, image }, { transaction: t });

    const jwtConfig = {
      expiresIn: '5d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email, password } }, process.env.JWT_SECRET, jwtConfig);

    return token;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

async function getUsers(t) {
  try {
    const getAll = await User.findAll({ attributes: { exclude: ['password'] } }, 
      { transaction: t });

    return getAll;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

async function getById(id, t) {
  try {
    const user = await User.findByPk(id, { transaction: t });

    return user;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

async function destroy(user, t) {
  try {
    await User.destroy({ where: { id: user.dataValues.id } }, { transaction: t });
    
    return;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

module.exports = { createUser, getUsers, getById, destroy };