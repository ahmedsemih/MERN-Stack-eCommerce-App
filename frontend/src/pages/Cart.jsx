import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, Text, Icon, Heading, Button, SimpleGrid, useToast } from '@chakra-ui/react';
import { ShoppingCart } from '@mui/icons-material';

import { getUserById } from '../services/UserServices';
import { useUserContext } from '../contexts/UserContext';
import { useCartContext } from '../contexts/CartContext';
import ClothesCard from '../components/ClothesCard';

const Cart = () => {

  const toast = useToast();
  const { currentUser } = useUserContext();
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const { cart, setCart, refresh } = useCartContext();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    var price = 0
    var amount = 0;
    cart.forEach((item) => {
      if (item.price && item.amount) {
        price += item.price;
        amount += item.amount;
      }
    });
    setTotalPrice(price);
    setTotalAmount(amount);

    currentUser && getUserById(currentUser)
      .then((result) => {
        setUserAddress(result.user.address);
      });
  }, [cart, cookies.cart, refresh, currentUser]);

  const onClickPurchase = () => {
    if (currentUser) {
      if (userAddress) {

        navigate('/payment',{state:{price:totalPrice,address:userAddress}});

      } else {
        navigate('/infos');
        toast({
          title: 'Warning!',
          description: 'You must give your address information first.',
          status: 'warning',
          duration: 2000,
          isClosable: true
        });
      }
    } else {
      navigate('/login');
      toast({
        title: 'Warning!',
        description: 'You must login first.',
        status: 'warning',
        duration: 2000,
        isClosable: true
      });
    }
  };

  const onClickRemove = () => {
    setCart([]);
    removeCookie('cart', { path: '/' });
  };

  if (cart.length >= 1 && totalAmount > 0) {
    return (
      <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} >
        <SimpleGrid width='100%' p={{ base: 3, md: 5 }} columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 3, md: 5 }} >
          {
            cart && cart.map((product, index) => {
              return product.id && <ClothesCard key={index} productId={product.id} />
            })
          }
        </SimpleGrid>
        <Box my={5} borderLeft={{ base: 'none', md: '2px solid whitesmoke' }} flexDirection='column' display='flex' bg='#fff' width={{ base: '100%', md: '20%' }} px={5} >
        {
          userAddress && <Box my={3} flexDirection='column' display='flex' bg='#fff' width={{ base: '100%' }}  >
            <Text fontSize={28} mt={3} fontWeight={600} color='facebook.500' >Address</Text>
            <Text mt={3} fontSize={24} color='facebook.500' fontWeight={300} >{userAddress}</Text>
          </Box>
        }
          <Text fontSize={28} mt={10} fontWeight={600} color='facebook.500' >Order Details</Text>
          <Text mt={3} fontSize={24} color='facebook.500' fontWeight={300} >Product Amount: {totalAmount}</Text>
          <Text mt={3} fontSize={24} color='facebook.500' fontWeight={300} >Total Price: {totalPrice} $</Text>
          <Button mt={10} colorScheme='facebook' onClick={onClickPurchase} >Purchase</Button>
          <Button mt={3} variant='text' color='facebook.500' onClick={onClickRemove} >Remove All</Button>

        </Box>
      </Box>
    )
  } else {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        my={10}
        p={5}
      >
        <Icon color='#314E89' fontSize={100} as={ShoppingCart} />
        <Heading textAlign='center' fontSize={30} mt={8}  >You have nothing in your cart.</Heading>
        <Text textAlign='center' fontSize={24} mt={3} fontWeight={300} >You haven't added a product to your cart. All you have to do is click on the cart icon.</Text>
        <Button
          variant='solid'
          fontSize={20}
          px={10} mt={10}
          colorScheme='facebook'
          onClick={() => navigate('/')}>
          Start Shopping
        </Button>
      </Box>
    )
  }
}

export default Cart;