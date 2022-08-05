const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    prepare: {
        type: Boolean,
        default: true
    },
    onWay: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    cancel:{
        type: Boolean,
        default: false
    },
    orderDate:{
        type:Date,
        default:Date.now
    }
},{versionKey:false});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;