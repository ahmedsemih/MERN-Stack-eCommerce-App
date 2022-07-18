const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    for:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
    },
    owner:{
        type:String,
        default:'Anonymous'
    }
});

const Rating = mongoose.model('Rating', RatingSchema);
module.exports = Rating;