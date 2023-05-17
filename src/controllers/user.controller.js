const { userService } = require('../services');

const { mapError } = require('../utils/errorMap');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await userService.createUser(displayName, email, password, image);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json({ token: message });
};

const listAll = async (_req, res) => {
  const { type, message } = await userService.listAll();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createUser,
  listAll,
};