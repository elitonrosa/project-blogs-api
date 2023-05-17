const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const SECRET = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const { id } = decoded;

    const user = await userService.findById(id);
    if (user.type) return res.status(401).json({ message: 'Expired or invalid token' });

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;