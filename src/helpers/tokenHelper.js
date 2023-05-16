require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const data = payload;
  delete data.password;
  return jwt.sign(data, SECRET, jwtConfig);
};

module.exports = {
  generateToken,
};
