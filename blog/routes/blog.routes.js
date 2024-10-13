const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getSingleBlog, likeBlog, commentOnBlog } = require('../controllers/blog.controller');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware');


router.post('/create', isAdmin, createBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getSingleBlog);
router.post('/blogs/:id/like', isAuthenticated, likeBlog);
router.post('/blogs/:id/comment', isAuthenticated, commentOnBlog);

module.exports = router;
