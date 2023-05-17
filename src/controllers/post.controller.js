const { postService } = require('../services');

const { mapError } = require('../utils/errorMap');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const { type, message } = await postService.create(id, title, content, categoryIds);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listAll = async (_req, res) => {
  const { type, message } = await postService.listAll();
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await postService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  create,
  listAll,
  findById,
};