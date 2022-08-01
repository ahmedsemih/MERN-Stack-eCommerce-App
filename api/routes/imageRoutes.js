const express = require('express');
const router = express.Router();
const { getAllImages, getImageById, addImage, updateImage, deleteImage } = require('../controllers/imageController');

router.route('/').get(getAllImages);
router.route('/:id').get(getImageById);
router.route('/').post(addImage);
router.route('/:id').put(updateImage);
router.route('/:id').delete(deleteImage);

module.exports=router;