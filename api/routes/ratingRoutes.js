const express = require('express');
const router = express.Router();
const { getAllRatings, getRatingById, getRatingByOwnerId, getRatingByProductId, addRating, deleteRating, updateRating } = require('../controllers/ratingController');

router.route('/').get(getAllRatings);
router.route('/').get(getRatingByOwnerId);
router.route('/').get(getRatingByProductId);
router.route('/:id').get(getRatingById);
router.route('/').post(addRating);
router.route('/:id').put(updateRating);
router.route('/:id').delete(deleteRating);

module.exports = router;