const express = require('express');

const { categoryController } = require('../controllers');

const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.use(validateJWT);

router.post('/', categoryController.createCategory);
router.get('/', categoryController.listAll);

module.exports = router;