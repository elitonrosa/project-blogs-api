const { categoryService } = require('../services');

const { mapError } = require('../utils/errorMap');

const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });

  const { type, message } = await categoryService.createCategory(name);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(201).json(message);
};

const listAll = async (_req, res) => {
  const { type, message } = await categoryService.listAll();
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createCategory,
  listAll,
};
