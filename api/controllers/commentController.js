const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
    try {
        const allComments = Comment.find({});

        res.status(200).json({
            allComments
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = Comment.findById(req.params.id);

        res.status(200).json({
            comment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getCommentByAuthorId = async (req, res) => {
    try {
        const comment = Comment.find({ author: req.body.authorId });

        res.status(200).json({
            comment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getCommentByProductId = async (req, res) => {
    try {
        const comment = Comment.find({ for: req.body.productId });

        res.status(200).json({
            comment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addComment = async (req, res) => {
    try {
        const newComment = Comment.create(req.body);

        res.status(201).json({
            newComment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            comment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = Comment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            comment
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};