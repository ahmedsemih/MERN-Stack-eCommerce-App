const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({});

        res.status(200).json({
            allProducts
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByColor = async (req, res) => {
    try {
        const products = await Product.find({ 
            $and: [
                { price: { $gte: req.body.lowest } },
                { price: { $lte: req.body.uppest } },
                { color: req.params.color }
            ]
         });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByCategoryId = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.id });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByGender = async (req, res) => {
    try {
        const products = await Product.find({
            $and: [
                { price: { $gte: req.body.lowest } },
                { price: { $lte: req.body.uppest } },
                { gender: req.params.gender }
            ]
        });


        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByPrice = async (req, res) => {
    try {
        const products = await Product.find({ $and: [{ price: { $gte: req.body.lowest } }, { price: { $lte: req.body.uppest } }] });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByStatus = async (req, res) => {
    try {
        const products = await Product.find({ status: req.params.status });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsBySearch = async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: '.*' + req.params.search + '.*', "$options": "i" } });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getProductsByQueries = async (req, res) => {
    try {
        const products = await Product.find({
            $and:
                [
                    { price: { $gte: req.body.lowest } }, { price: { $lte: req.body.uppest } },
                    { color: req.body.color },
                    { gender: req.body.gender }
                ]
        });

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            newProduct
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};