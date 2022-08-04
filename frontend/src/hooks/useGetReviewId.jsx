import { useEffect, useState } from 'react';
import { getCommentByAuthorId } from '../services/CommentServices';
import { getRatingByOwnerId } from '../services/RatingServices';

const useGetReviewId = (userId, productId) => {

    const [ratingId, setRatingId] = useState("");
    const [commentId, setCommentId] = useState("");

    useEffect(() => {
        getRatingByOwnerId(userId)
            .then((result) => {
                result.ratings.forEach((rating) => {
                    if (rating.for === productId) { setRatingId(rating._id); }
                });
            });
        getCommentByAuthorId(userId)
            .then((result) => {
                result.comment.forEach((comment) => {
                    if (comment.for === productId) { setCommentId(comment._id); }
                });
            });

    }, [userId, productId]);

    return [ratingId, commentId];
}

export default useGetReviewId;