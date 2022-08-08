import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, Image, Text, Icon, Button, useDisclosure } from '@chakra-ui/react';
import { Favorite, RateReview, ShoppingCart } from '@mui/icons-material';

import { useCartContext } from '../contexts/CartContext';
import { useUserContext } from '../contexts/UserContext';
import { getProductById } from '../services/ProductServices';
import { addFavorite, deleteFavorite } from '../services/UserServices';
import useGetFavoriteStatus from '../hooks/useGetFavoriteStatus';
import ReviewModal from './ReviewModal';

const ClothesCard = ({ productId, isDelivered }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cookies, setCookies, removeCookie] = useCookies(['cart']);
  const { cart, setCart, refresh, setRefresh } = useCartContext();
  const { currentUser } = useUserContext();
  const [status] = useGetFavoriteStatus(currentUser, productId);
  const navigate = useNavigate();

  const [product, setProduct] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (productId) {
      setIsFavorite(status);
      getProductById(productId)
        .then(result => {
          setProduct(result.product);
        });
      cart.forEach((item) => {
        if (item.id === productId) {
          setInCart(true);
          setAmount(item.amount);
        }
      });
    }
  }, [productId, status, cart, amount]);

  const onClickFavorite = () => {
    if (!isFavorite) {
      addFavorite(currentUser, productId);
      setIsFavorite(true);
    } else {
      deleteFavorite(currentUser, productId);
      setIsFavorite(false);
    }
  };

  const onClickAddCart = () => {
    const currentIndex = cart.findIndex(item => item.id === productId);
    if (currentIndex >= 0) {
      cart[currentIndex].amount += 1;
      cart[currentIndex].price = product.price * cart[currentIndex].amount;
      setAmount(amount + 1);
      setCookies('cart', cart, { path: '/' });
    } else {
      setCart([...cart, {
        id: productId,
        amount: 1,
        price: product.price
      }]);
      setCookies('cart', cart, { path: '/' });
    }
    setRefresh(!refresh);
  };

  const onClickRemoveCart = () => {
    const currentIndex = cart.findIndex(item => item.id === productId);
    if (currentIndex >= 0) {
      if (cart[currentIndex].amount === 1) {
        const newCart = [];
        cart.forEach((item, index) => {
          index !== currentIndex && newCart.push(item);
        })
        if (cart.length === 1) {
          removeCookie('cart', { path: '/' });
        } else {
          setCookies('cart', newCart, { path: '/' });
        }
        setInCart(false);
        setCart(newCart);
        setAmount(amount - 1);
      } else {
        cart[currentIndex].price -= cart[currentIndex].price / cart[currentIndex].amount;
        cart[currentIndex].amount -= 1;
        setAmount(amount - 1);
        setCookies('cart', cart, { path: '/' });
      }
    }
    setRefresh(!refresh);
  };

  return (
    <>
      <Box
        width='100%'
        display='flex'
        alignItems='center'
        flexDirection='column'
        cursor='pointer'
        mt={{ base: 3, sm: 0 }}
        mx={{ base: 0, md: 2 }}
      >
        <Image
          width='100%'
          height='auto'
          maxWidth={500}
          objectFit='cover'
          maxHeight={620}
          src={product.imageUrl}
          onClick={() => navigate(`/product/${product._id}`, { state: { "productId": product._id } })}
        />
        <Box px={3} py={5} bg='#fff' position='relative' width='100%' height={230} maxWidth={500} >
          <Text onClick={() => navigate(`/product/${product._id}`, { state: { "productId": product._id } })} fontWeight={500} fontSize={26} >{product.name}</Text>
          <Text onClick={() => navigate(`/product/${product._id}`, { state: { "productId": product._id } })} mb={10} fontSize={18} >{product.description}</Text>
          <Box
            mt={5}
            py={3}
            position='absolute'
            bottom='0px'
            display='flex'
            width='100%'
            justifyContent='space-between'
            pr={5} pl={2}
          >

            <Text onClick={() => navigate(`/product/${product._id}`, { state: { "productId": product._id } })} fontSize={26} fontWeight={500} >{product.price} $</Text>
            <Box display='flex' alignItems='center' margin='right' >
              {
                inCart
                  ?
                  <>
                    <Button onClick={onClickRemoveCart} disabled={amount === 0} colorScheme='facebook'>-</Button>
                    <Text fontSize={25} px={2} >{amount}</Text>
                    <Button onClick={onClickAddCart} colorScheme='facebook' >+</Button>
                  </>
                  :
                  <>
                    <Icon
                      onClick={onClickFavorite}
                      as={Favorite}
                      fontSize={36}
                      transition={.5}
                      color={!isFavorite ? 'blackAlpha.400' : 'facebook.500'}
                      _hover={{ color: 'facebook.500' }}
                    />
                    <Icon
                      onClick={onClickAddCart}
                      as={ShoppingCart}
                      fontSize={36}
                      transition={.5}
                      color='blackAlpha.400'
                      _hover={{ color: 'facebook.500' }}
                      ms={{ base: 2, md: 5 }}
                    />
                  </>
              }
              {
                isDelivered &&
                <Icon
                  onClick={onOpen}
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
      <ReviewModal isOpen={isOpen} onClose={onClose} productId={productId} />
    </>
  )
}

export default ClothesCard;