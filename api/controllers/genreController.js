const Genre = require('../models/Genre');

exports.getAllGenres = async (req, res) => {
    try {
        const allGenres = await Genre.find({});

        res.status(200).json({
            allGenres
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);

        res.status(200).json({
            genre
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addGenre = async (req, res) => {
    try {
        const newGenre = await Genre.create({
            name:req.body.name,
            genre:req.body.genre,
            status:req.body.status
        });

        res.status(201).json({
            newGenre
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            genre
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);
        res.status(200).json({
            genre
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};