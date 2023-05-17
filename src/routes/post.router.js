const express = require('express');

const validateJWT = require('../auth/validateJWT');
const validateNewPost = require('../middlewares/validateNewPost');
const { postController } = require('../controllers');
const validatePostUpdate = require('../middlewares/validatePostUpdate');

const router = express.Router();

router.use(validateJWT);

router.post('/', validateNewPost, postController.create);
router.get('/', postController.listAll);
router.get('/:id', postController.findById);
router.put('/:id', validatePostUpdate, postController.update);

module.exports = router;