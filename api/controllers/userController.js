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