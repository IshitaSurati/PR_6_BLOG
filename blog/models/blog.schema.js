const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likedBy: [{ username: String }],
    comments: [
        {
            text: String,
            username: String,
            date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Blog', blogSchema);
