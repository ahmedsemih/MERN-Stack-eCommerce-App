const express = require('express');
const router = express.Router();
const { getAllComments, getCommentById, getCommentByAuthorId, getCommentByProductId, addComment, updateComment, deleteComment } = require('../controllers/commentController');

router.route('/').get(getAllComments);
router.route('/author/:id').get(getCommentByAuthorId);
router.route('/product/:id').get(getCommentByProductId);
router.route('/:id').get(getCommentById);
router.route('/').post(addComment);
router.route('/:id').put(updateComment);
router.route('/:id').delete(deleteComment);

module.exports = router;