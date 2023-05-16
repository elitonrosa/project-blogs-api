const express = require('express');

const { userController } = require('../controllers');

const validadeNewUser = require('../middlewares/validateNewUser');

const router = express.Router();

router.post('/', validadeNewUser, userController.createUser);

module.exports = router;