const express = require('express');
const router = express.Router();
const { getAllGenres, getGenreById, addGenre, updateGenre, deleteGenre } = require('../controllers/genreController');

router.route('/').get(getAllGenres);
router.route('/:id').get(getGenreById);
router.route('/').post(addGenre);
router.route('/:id').put(updateGenre);
router.route('/:id').delete(deleteGenre);

module.exports = router;