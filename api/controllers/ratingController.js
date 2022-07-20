const Rating = require('../models/Rating');

exports.getAllRatings = async (req, res) => {
    try {
        const allRatings = await Rating.find({});

        res.status(200).json({
            allRatings
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getRatingById = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);

        res.status(200).json({
            rating
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        })
    }
};

exports.getRatingByOwnerId = async (req, res) => {
    try {
        const ratings = await Rating.find({ owner: req.params.id });

        res.status(200).json({
            ratings
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getRatingByProductId = async (req, res) => {
    try {
        const ratings = await Rating.find({ for: req.params.id });

        res.status(200).json({
            ratings
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addRating = async (req, res) => {
    try {
        const newRating = await Rating.create(req.body);

        res.status(201).json({
            newRating
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateRating = async (req, res) => {
    try {
        const rating = await Rating.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            rating
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findByIdAndDelete(req.params.id);

        res.status(200).json({
            rating
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};