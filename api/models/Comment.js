const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: 'Anonymous'
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
}, { versionKey: false });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;