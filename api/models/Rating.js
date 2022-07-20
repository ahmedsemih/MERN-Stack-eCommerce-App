const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        max:10,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { versionKey: false });

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;