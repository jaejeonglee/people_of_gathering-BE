const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    postId: String,
    userId: String,
    userName: String,
    commentId: Number,
    content : String,
});

module.exports = mongoose.model('Comments', CommentsSchema);

