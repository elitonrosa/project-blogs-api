const { userService } = require('../services');

const { mapError } = require('../utils/errorMap');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { type, message } = await userService.create(displayName, email, password, image);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json({ token: message });
};

const listAll = async (_req, res) => {
  const { type, message } = await userService.listAll();

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await userService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const selfDestroy = async (req, res) => {
  const { id } = req.user;

  const { type, message } = await userService.selfDestroy(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(204).json();
};

module.exports = {
  create,
  listAll,
  findById,
  selfDestroy,
};