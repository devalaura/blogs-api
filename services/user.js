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

    const d = await User.create({ displayName, email, password, image }, { transaction: t });

    const jwtConfig = {
      expiresIn: '5d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: d }, process.env.JWT_SECRET, jwtConfig);

    return token;
  } catch (e) {
    return { status: 500, message: { message: e.message } };
  }
}

module.exports = { createUser };