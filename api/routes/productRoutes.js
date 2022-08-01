const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    getProductsByStatus,
    getProductsByCategoryId,
    getProductsByColor,
    getProductsByGender,
    getProductsByPrice,
    getProductsBySearch,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByQueries
} = require('../controllers/productController');

router.route('/').get(getAllProducts);
router.route('/query/price').post(getProductsByPrice);
router.route('/:id').get(getProductById);
router.route('/category/:id').get(getProductsByCategoryId);
router.route('/color/:color').post(getProductsByColor);
router.route('/gender/:gender').post(getProductsByGender);
router.route('/status/:status').get(getProductsByStatus);
router.route('/search/:search').get(getProductsBySearch);
router.route('/query/full').post(getProductsByQueries);
router.route('/').post(addProduct);
router.route('/:id').put(updateProduct);
router.route('/:id').delete(deleteProduct);

module.exports = router;