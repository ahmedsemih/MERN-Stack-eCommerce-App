const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Genre'
    },
    status: {
        type: Boolean,
        default: true
    }
});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;