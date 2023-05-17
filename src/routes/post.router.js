const express = require('express');

const validateJWT = require('../auth/validateJWT');
const validateNewPost = require('../middlewares/validateNewPost');
const { postController } = require('../controllers');

const router = express.Router();

router.use(validateJWT);

router.post('/', validateNewPost, postController.createPost);

module.exports = router;