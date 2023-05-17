const express = require('express');

const { userController } = require('../controllers');

const validadeNewUser = require('../middlewares/validateNewUser');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validadeNewUser, userController.createUser);

router.use(validateJWT);

router.get('/', userController.listAll);
router.get('/:id', userController.findById);

module.exports = router;