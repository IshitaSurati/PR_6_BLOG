const Blog = require('../models/blog.schema');

const createBlog = async (req, res) => {
    const { title, content, image, category } = req.body;
    try {
        const blog = new Blog({
            title,
            content,
            image,
            category,
            author: req.cookies.userId
        });
        await blog.save();
        res.redirect('/blogs');
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author');
        res.render('blogs', { blogs });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const getSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author');
        res.render('singleBlogPage', { blog });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const likedByUser = blog.likedBy.find(like => like.username === req.cookies.userId);
        if (likedByUser) {
            return res.status(400).json({ msg: 'You have already liked this blog.' });
        }
        blog.likedBy.push({ username: req.cookies.userId });
        await blog.save();
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const commentOnBlog = async (req, res) => {
    const { comment } = req.body;
    try {
        const blog = await Blog.findById(req.params.id);
        blog.comments.push({
            text: comment,
            username: req.cookies.userId
        });
        await blog.save();
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    likeBlog,
    commentOnBlog
};
