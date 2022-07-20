const Comment = require('../models/Comment');

exports.getAllComments = async (req, res) => {
    try {
        const allComments = await Comment.find({});

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
        const comment = await Comment.findById(req.params.id);

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
        const comment = await Comment.find({ author: req.params.id });

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
        const comment = await Comment.find({ for: req.params.id });

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
        const newComment = await Comment.create(req.body);

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
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
        const comment = await Comment.findByIdAndDelete(req.params.id);

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