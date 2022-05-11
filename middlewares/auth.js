const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

module.exports = async function authentication(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Expired or invalid token' });
    }

    req.user = user;
    return next();
  } catch (e) {
    return next(e);
  }
};