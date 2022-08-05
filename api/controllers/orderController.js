const Order = require('../models/Order');

exports.getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find({});

        res.status(200).json({
            allOrders
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.params.id });

        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getOrdersByStatus = async (req, res) => {
    try {
        const orders = await Order.find({ status: req.params.status });

        res.status(200).json({
            orders
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addOrder = async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);

        res.status(201).json({
            newOrder
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            order
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};