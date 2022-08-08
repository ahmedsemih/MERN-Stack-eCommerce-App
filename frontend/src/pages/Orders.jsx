import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Button, Icon, Heading } from '@chakra-ui/react';
import { ShoppingCart } from '@mui/icons-material';

import { useUserContext } from '../contexts/UserContext';
import { getOrdersByUserId } from '../services/OrderServices';
import OrderCard from '../components/OrderCard';


const Orders = () => {

  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  const [currentOrders, setCurrentOrders] = useState("active");
  const [orders, setOrders] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    getOrdersByUserId(currentUser)
      .then((result) => {
        var orderArray=result.orders;
        setOrders(orderArray.sort((a, b) => (Number(a.orderDate) - Number(b.orderDate))).reverse());
        result.orders.forEach((order) => {
          if (currentOrders === "active" && order.status){ setIsEmpty(false)};
        });
      });
    if (currentOrders === "all") {
      setIsEmpty(false);
    }      
  }, [currentUser, currentOrders, setOrders]);

  return (
    <Box width='100%' my={10}>
      <Box display='flex' justifyContent='center' p={3} alignItems='center' >
        <Text
          textAlign='center'
          fontSize={30}
          fontWeight={currentOrders === "active" ? 600 : 300}
          color='facebook.500'
          mr={5}
          cursor='pointer'
          onClick={() => setCurrentOrders("active")}
        >Active Orders</Text>
        <Text
          textAlign='center'
          fontSize={30}
          fontWeight={currentOrders === "active" ? 300 : 600}
          color='facebook.500'
          ml={5}
          cursor='pointer'
          onClick={() => setCurrentOrders("all")}
        >All Orders</Text>
      </Box>
      <Box py={3} px={{ base: 3, md: 5, lg: 10 }} >
        {
          orders.length>0 ? orders.map((order, index) => {
            if (currentOrders === "active") {
              return order.status && <OrderCard key={index} orderId={order._id} />
            } else {
              return <OrderCard key={index} orderId={order._id} />
            }
          })
            :
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              mt={10}
              p={3}
            >
              <Icon color='#314E89' fontSize={100} as={ShoppingCart} />
              <Heading textAlign='center' fontSize={30} mt={8}  >You don't have any orders.</Heading>
              <Text textAlign='center' fontSize={24} mt={2} fontWeight={300} >Check out our bestsellers and find something for you!</Text>
              <Button
                variant='solid'
                fontSize={20}
                px={10} mt={10}
                colorScheme='facebook'
                onClick={() => navigate('/')}>
                Start Shopping
              </Button>
            </Box>
        }
        {
          isEmpty &&
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
            mt={10}
            p={3}
          >
            <Icon color='#314E89' fontSize={100} as={ShoppingCart} />
            <Heading textAlign='center' fontSize={30} mt={8}  >You don't have any active orders.</Heading>
            <Text textAlign='center' fontSize={24} mt={2} fontWeight={300} >Check out our bestsellers and find something for you!</Text>
            <Button
              variant='solid'
              fontSize={20}
              px={10} mt={10}
              colorScheme='facebook'
              onClick={() => navigate('/')}>
              Start Shopping
            </Button>
          </Box>
        }
      </Box>
    </Box>
  )
}

export default Orders;