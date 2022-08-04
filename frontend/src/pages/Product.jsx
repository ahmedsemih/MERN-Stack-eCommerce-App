import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Image, SimpleGrid, Text, Divider, Button, IconButton, useDisclosure } from '@chakra-ui/react';
import { Favorite, FavoriteBorder, Info } from '@mui/icons-material';
import StarRatings from 'react-star-ratings';

import Comment from '../components/Comment';
import { useUserContext } from '../contexts/UserContext';
import useGetFavoriteStatus from '../hooks/useGetFavoriteStatus';
import { getProductById } from '../services/ProductServices';
import { addFavorite, deleteFavorite } from '../services/UserServices';
import { getCommentByProductId } from '../services/CommentServices';
import { getRatingByProductId } from '../services/RatingServices';
import ReviewModal from '../components/ReviewModal';

const Product = () => {


  const location = useLocation();
  const { currentUser } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status] = useGetFavoriteStatus(currentUser, location.state.productId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [product, setProduct] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    setIsFavorite(status);
    getProductById(location.state.productId)
      .then((result) => {
        setProduct(result.product);
        setSizes(result.product.sizes);
      });
    getRatingByProductId(location.state.productId)
      .then((result) => {
        var star = 0;
        result.ratings.forEach((r) => {
          star += r.rating
        });
        setRatings(star/result.ratings.length);
        setRatingCount(result.ratings.length);
      });
    getCommentByProductId(location.state.productId)
      .then((result) => {
        setComments(result.comment);
      });
  }, [location.state.productId, status]);

  const onClickFavorite = () => {
    if (isFavorite) {
      deleteFavorite(currentUser, location.state.productId);
      setIsFavorite(false);
    } else {
      addFavorite(currentUser, location.state.productId);
      setIsFavorite(true);
    }
  };

  const onClickCart = () => {

  };

  return (
    <>
    <Box p={{ base: 3, md: 10 }}  >
      <Box display='flex' justifyContent='center'>
        <SimpleGrid width={1200} columns={{ base: 1, md: 2 }} >
          <Image src={product.imageUrl} />
          <Box p={3} maxWidth={600} >
            <Text fontWeight={200} >Product Id: {location.state.productId}</Text>
            <Text fontSize={30} >{product.name}</Text>
            <Box
              display='flex'
              alignItems='center'
              mt={2}>
              <StarRatings
                starDimension={'20'}
                starSpacing={'2'}
                rating={ratings}
                starRatedColor="#FFD700"
                numberOfStars={5}
                name='rating' />
              <Text fontSize={16} fontWeight={500} > | {ratingCount} reviews</Text>
            </Box>
            <Text mt={5} mb={3} fontSize={28} fontWeight={400} color='facebook.500' >Price : <b> {product.price}$ </b> </Text>
            <Divider />
            <Text mt={3} fontSize={20} fontWeight={500} >Sizes</Text>
            <Box mt={3} display='flex' >
              {
                sizes.map((size, index) => {
                  return <Button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    me={3}
                    colorScheme='facebook'
                    variant={selectedSize === size ? 'solid' : 'outline'}
                    width={{ base: '25px', sm: '35px', lg: '50px' }}
                    height={{ base: '30px', sm: '40px', lg: '50px' }}
                  >{size}</Button>
                })
              }
            </Box>
            <Box
              mt={10} mb={5}
              display='flex'
              flexDirection={{ base: 'column', sm: 'row' }}
            >
              <Button
                onClick={onClickCart}
                my={1}
                me={{ base: 0, md: 2 }}
                maxWidth={530}
                colorScheme='facebook'
                height={10}
                width='100%'>ADD TO CART</Button>
              <IconButton
                icon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={onClickFavorite}
                ml={1} my={1}
                colorScheme='facebook'
                variant='outline'
                height={10}
                width='50px'
                textAlign='center'
                display={{ base: 'none', sm: 'block' }} />
              <Button
                my={1}
                colorScheme='facebook'
                variant='outline'
                display={{ base: 'block', sm: 'none' }}
                height={10}
                width='100%'> ADD TO FAVORITE</Button>
            </Box>
            <Divider />
            <Box
              mt={3}>
              <Text fontSize={24} fontWeight={500} >Description</Text>
              <Box mt={3}>
                {product.description}
              </Box>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
      <Box maxWidth={1200} flexDirection='column' p={{ base: 3, md: 0 }} marginX='auto' >
        <Text mt={10} mb={3} fontSize={40} fontWeight={300} >User Reviews</Text>
        <Box
          width='100%'
          display='flex'
          justifyContent='space-between'
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems='center'
          backgroundColor='whitesmoke'
          borderRadius='4px'
          px={2} py={5}
          mb={10}
        >
          <Box>
            <Box display='flex'>
              <StarRatings
                starDimension={'20'}
                starSpacing={'2'}
                rating={ratings}
                starRatedColor="#FFD700"
                numberOfStars={5}
                name='rating' />
              <Text fontSize={16} fontWeight={500} > | {ratingCount} reviews</Text>
            </Box>
            <Text my={3} display='flex' alignItems='center' ><Info sx={{ fontSize: '16px', mr: 1 }} /> You must have purchased the product for write a review.  </Text>
          </Box>
          <Button ml={2} mr={{ base: 0, md: 5 }} height={50} colorScheme='facebook' onClick={onOpen} >
            Write a Review
          </Button>
        </Box>
        {
          comments.map((comment) => {
            return <Comment key={comment._id} authorId={comment.author} commentText={comment.comment} createdAt={comment.createdAt} />
          })
        }
      </Box>
    </Box>
    <ReviewModal isOpen={isOpen} onClose={onClose} productId={location.state.productId} />
    </>
  )
}

export default Product;