const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Boolean,
        default:true
    }
});

const Genre = mongoose.model('Genre', GenreSchema);
module.exports = Genre;