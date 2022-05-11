const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');
const validateData = require('../middlewares/login');

async function login(email, password, t) {
  try {
    const invalidData = validateData(email, password);
    if (invalidData.status) return invalidData;

    const findUser = await User.findOne({ where: { email, password } }, { transaction: t });
    if (!findUser) return { status: 400, message: { message: 'Invalid fields' } };

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

module.exports = { login };