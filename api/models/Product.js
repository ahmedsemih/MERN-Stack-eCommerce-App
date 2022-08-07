const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    gender: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status:{
        type:Boolean,
        default:true
    }
},{versionKey:false});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;