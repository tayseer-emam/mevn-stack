const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const postController = require('../controllers/post');

router.post('/', checkAuth, postController.create);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

module.exports = router;