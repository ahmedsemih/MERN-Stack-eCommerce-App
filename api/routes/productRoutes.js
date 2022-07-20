const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, getProductsByStatus, getProductsByCategoryId, getProductsByColor, getProductsByGender, getProductsByPrice, getProductsBySearch, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.route('/').get(getAllProducts);
router.route('/').get(getProductsByPrice);
router.route('/:id').get(getProductById);
router.route('/category/:id').get(getProductsByCategoryId);
router.route('/color/:color').get(getProductsByColor);
router.route('/gender/:gender').get(getProductsByGender);
router.route('/status/:status').get(getProductsByStatus);
router.route('/search/:search').get(getProductsBySearch);
router.route('/').post(addProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

module.exports = router;