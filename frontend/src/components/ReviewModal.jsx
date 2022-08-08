import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Text, Button, Textarea, useToast } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';

import { getRatingById, addRating, updateRating, deleteRating } from '../services/RatingServices';
import { getCommentById, addComment, updateComment, deleteComment } from '../services/CommentServices';
import { useUserContext } from '../contexts/UserContext';
import useGetReviewId from '../hooks/useGetReviewId';

const ReviewModal = ({ onClose, isOpen, productId }) => {

    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const { currentUser } = useUserContext();
    const toast = useToast();
    const [ratingId, commentId] = useGetReviewId(currentUser, productId);

    useEffect(() => {
        if (ratingId !== "" && commentId ) {
            getRatingById(ratingId)
                .then((result) => {
                    setRating(result.rating.rating);
                });
            getCommentById(commentId)
                .then((result) => {
                    setComment(result.comment.comment);
                });
        }
    }, [ratingId, commentId, rating]);

    const onClickSend = () => {
        addRating(productId, rating, currentUser)
            .then((result) => {
                if (result.status) {
                    toast({
                        title: 'Error!',
                        description: 'Somethings went wrong.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true
                    });
                } else {
                    addComment(productId, comment, currentUser)
                        .then((result) => {
                            if (result.status) {
                                toast({
                                    title: 'Error!',
                                    description: 'Somethings went wrong.',
                                    status: 'error',
                                    duration: 2000,
                                    isClosable: true
                                });
                            } else {
                                toast({
                                    title: 'Success!',
                                    description: 'Your review has been sent successfully.',
                                    status: 'success',
                                    duration: 2000,
                                    isClosable: true
                                });
                                onClose(true);
                            }
                        });
                }
            });
    };

    const onClickEdit = () => {
        updateRating(ratingId, productId, rating, currentUser)
            .then((result) => {
                if (result.status) {
                    toast({
                        title: 'Error!',
                        description: 'Somethings went wrong.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true
                    });
                } else {
                    updateComment(commentId, productId, comment, currentUser)
                        .then((result) => {
                            if (result.status) {
                                toast({
                                    title: 'Error!',
                                    description: 'Somethings went wrong.',
                                    status: 'error',
                                    duration: 2000,
                                    isClosable: true
                                });
                            } else {
                                toast({
                                    title: 'Success!',
                                    description: 'Your review has been updated successfully.',
                                    status: 'success',
                                    duration: 2000,
                                    isClosable: true
                                });
                                onClose(true);
                            }
                        });
                }
            });
    };

    const onClickDelete = () => {
        deleteRating(ratingId)
            .then((result) => {
                if (result.status) {
                    toast({
                        title: 'Error!',
                        description: 'Somethings went wrong.',
                        status: 'error',
                        duration: 2000,
                        isClosable: true
                    });
                } else {
                    deleteComment(commentId)
                        .then((result) => {
                            if (result.status) {
                                toast({
                                    title: 'Error!',
                                    description: 'Somethings went wrong.',
                                    status: 'error',
                                    duration: 2000,
                                    isClosable: true
                                });
                            } else {
                                toast({
                                    title: 'Success!',
                                    description: 'Your review was deleted.',
                                    status: 'success',
                                    duration: 2000,
                                    isClosable: true
                                });
                                onClose(true);
                            }
                        });
                }
            });
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize={30} color='facebook.500' >{ratingId !== "" ? 'Edit Review' : 'Review'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={20} mt={5} mb={3} fontWeight={400} color='facebook.500' >Rating :</Text>
                    <StarRatings
                        starDimension={'30'}
                        starSpacing={'2'}
                        rating={rating}
                        changeRating={(val) => setRating(val)}
                        isSelectable={true}
                        starRatedColor="#FFD700"
                        numberOfStars={5}
                        name='rating' />
                    <Text fontSize={20} mt={5} fontWeight={400} color='facebook.500' >Review Text :</Text>
                    <Textarea
                        maxLength={200}
                        spellCheck={false}
                        mt={13}
                        resize='none'
                        placeholder='Please write your review.'
                        value={comment}
                        onInput={(e) => setComment(e.target.value)}
                        height={200}
                    ></Textarea>
                </ModalBody>
                <ModalFooter>
                    {
                        ratingId !== ""
                            ?
                            <>
                                <Button mx={3} px={7} colorScheme='facebook' onClick={onClickEdit}>Edit</Button>
                                <Button colorScheme='facebook' variant='outline' onClick={onClickDelete}>Delete</Button>
                            </>
                            :
                            <>
                                <Button mx={3} px={7} colorScheme='facebook' onClick={onClickSend}>Send</Button>
                                <Button colorScheme='facebook' variant='outline' onClick={onClose}>Cancel</Button>
                            </>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReviewModal;