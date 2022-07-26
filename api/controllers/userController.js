const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}).select('-password');

        res.status(200).json({
            allUsers
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

// FAVORITE SYSTEM

exports.addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        var isFavorite = false;
        const favoriteArray = [];

        user.favorites.forEach(f => {
            favoriteArray.push(f);
            if (f !== null && f == req.params.favorite) { isFavorite = true };
        });

        if (!isFavorite) {
            favoriteArray.push(req.params.favorite);
            user.favorites = favoriteArray;
            user.save();

            res.status(200).json({
                favorites: user.favorites
            });

        } else {
            res.status(200).json({
                status: 'failed',
                error: 'this is already your favorite.'
            });
        }

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const favoritesArray = []

        user.favorites.forEach((f) => {
            if (f !== req.params.favorite) {
                favoritesArray.push(f);
            }
        });

        user.favorites = favoritesArray;
        user.save();

        res.status(200).json({
            favorites: user.favorites
        });

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};