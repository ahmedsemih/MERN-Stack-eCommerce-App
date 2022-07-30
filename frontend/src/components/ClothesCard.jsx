import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Text, Icon } from '@chakra-ui/react';
import { Favorite, RateReview, ShoppingCart } from '@mui/icons-material';

import { useUserContext } from '../contexts/UserContext';
import { getProductById } from '../services/ProductServices';
import { addFavorite, deleteFavorite } from '../services/UserServices';
import useGetFavoriteStatus from '../hooks/useGetFavoriteStatus';

const ClothesCard = ({ productId, categoryId, isDelivered }) => {

  const { currentUser } = useUserContext();
  const [status] = useGetFavoriteStatus(currentUser, productId);
  const navigate = useNavigate();
  
  const [product, setProduct] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(status);
    getProductById(productId)
      .then(result => {
        setProduct(result.product);
      });
  }, [productId, categoryId, status]);

  const onClickFavorite = () => {
    if (!isFavorite) {
      addFavorite(currentUser, productId);
      setIsFavorite(true);
    } else {
      deleteFavorite(currentUser, productId);
      setIsFavorite(false);
    }
  };

  const onClickCart = () => {

  };

  const onClickReview=()=>{

  };

  return (
    <Box
      width='100%'
      display='flex'
      position='relative'
      justifyContent='center'
      flexDirection='column'
      cursor='pointer'
    >
      <Image
      position='relative'
      top='0px'
        width='100%'
        maxHeight={600}
        objectFit='cover'
        src={product.imageUrl}
        onClick={() => navigate(`/product/${product._id}`,{state:{"productId":product._id}})}
      />
      <Box px={3} py={5} bg='#fff'>
        <Text onClick={() => navigate(`/product/${product._id}`,{state:{"productId":product._id}})} fontWeight={500} fontSize={26} >{product.name}</Text>
        <Text onClick={() => navigate(`/product/${product._id}`,{state:{"productId":product._id}})} fontSize={18} >{product.description}</Text>
        <Box
          mt={5}
          display='flex'
          justifyContent='space-between'
        >
          <Text onClick={() => navigate(`/product/${product._id}`,{state:{"productId":product._id}})} fontSize={26} fontWeight={500} >{product.price} $</Text>
          <Box display='flex' alignItems='center' >
            <Icon
              onClick={onClickFavorite}
              as={Favorite}
              fontSize={36}
              transition={.5}
              color={!isFavorite ? 'blackAlpha.400' : 'facebook.500'}
              _hover={{ color: 'facebook.500' }}
            />
            <Icon
              onClick={onClickCart}
              as={ShoppingCart}
              fontSize={36}
              transition={.5}
              color='blackAlpha.400'
              _hover={{ color: 'facebook.500' }}
              ms={{ base: 2, md: 5 }}
            />
            {
                isDelivered &&
                <Icon
                onClick={onClickReview}
                as={RateReview}
                fontSize={36}
                transition={.5}
                color='blackAlpha.400'
                _hover={{ color: 'facebook.500' }}
                ms={{ base: 2, md: 5 }}
              />
            }
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ClothesCard;