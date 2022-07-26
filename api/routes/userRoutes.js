const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser, addFavorite, deleteFavorite } = require('../controllers/userController');
const { Login, Register } = require('../controllers/authController');

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/:id/favorite/:favorite').post(addFavorite);
router.route('/:id/favorite/:favorite').delete(deleteFavorite);

module.exports = router;