const express = require('express');
const router = express.Router();
const { getAllMiniImages, getMiniImageById, addMiniImage, updateMiniImage, deleteMiniImage } = require('../controllers/miniImageController');

router.route('/').get(getAllMiniImages);
router.route('/:id').get(getMiniImageById);
router.route('/').post(addMiniImage);
router.route('/:id').put(updateMiniImage);
router.route('/:id').delete(deleteMiniImage);

module.exports = router;