const Image = require('../models/Image');

exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find({});

        res.status(200).json({
            images
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);

        res.status(200).json({
            image
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addImage = async (req, res) => {
    try {
        const image = await Image.create(req.body);

        res.status(201).json({
            image
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            image
        });

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);

        res.status(200).json({
            image
        });

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};