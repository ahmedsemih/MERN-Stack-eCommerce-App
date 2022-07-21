const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.Register = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            newUser
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.Login = (req, res) => {
    try {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, same) => {
                    if (same) {
                        var currentUser = user;
                        res.status(200).json({
                            currentUser
                        });
                    } else {
                        res.status(200).json({
                            status: 'failed',
                            error: 'Wrong email or password'
                        });
                    }
                });
            }
            else {
                res.status(200).json({
                    status: 'failed',
                    error: 'Wrong email or password'
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};