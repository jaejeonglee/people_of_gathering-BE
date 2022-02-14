const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    postId: String,
    userId: String,
    userName: String,
    commentId: Number,
    content : Object,
});

module.exports = mongoose.model('Comments', CommentsSchema);

