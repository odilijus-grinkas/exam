const express = require('express');
const router = express.Router();
const { postControllers } = require('../controllers/post-controllers');
const authToken = require('../../utils/authToken');
const isAdmin = (req, res, next) => {
  req.tokenInfo.admin ? next() : res.status(403).json("Unauthorized.");
}

// Links start with /posts
router.get('/all', postControllers.getAllPosts);

router.get('/filtered/:filter', postControllers.getFilteredPosts);

router.post('/', authToken, postControllers.createPost);

router.delete('/:id', authToken, postControllers.deletePost);

router.post('/stars', authToken, postControllers.addStars);

router.get('/categories', postControllers.getCategories);

router.post('/categories', authToken, isAdmin, postControllers.createCategory);

router.get('/:id', postControllers.getPost);

router.put('/:id', authToken, postControllers.updatePost);

module.exports = router;
