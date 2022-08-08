import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Divider, SimpleGrid, useToast, useDisclosure } from '@chakra-ui/react';
import { Cancel, Error } from '@mui/icons-material';
import moment from 'moment';

import { getOrderById, updateOrderStatus } from '../services/OrderServices';
import ClothesCard from './ClothesCard';
import ReportModal from './ReportModal';

const OrderCard = ({ orderId }) => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [products, setProducts] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        getOrderById(orderId)
            .then((result) => {
                setProducts(result.order.products);
                setDate(result.order.orderDate);
                if (result.order.prepare) {
                    setOrderStatus("Order is preparing.");
                } else if (result.order.onWay) {
                    setOrderStatus("Order is on way.");
                } else if (result.order.delivered) {
                    setOrderStatus("Order has been delivered.");
                } else {
                    setOrderStatus("Order canceled.");
                }
            });
    }, [orderId]);

    const onClickCancel = () => {
        if (orderStatus === "Order is preparing.") {
            updateOrderStatus(orderId, false, false, false, false, true)
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
                        setOrderStatus("Order canceled.");
                        toast({
                            title: 'Succesful',
                            description: 'Your order has been successfully canceled.',
                            status: 'success',
                            duration: 2000,
                            isClosable: true
                        });
                    }
                });
        } else if (orderStatus === "Order canceled.") {
            toast({
                title: 'Error!',
                description: 'Order has already been canceled.',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        } else {
            toast({
                title: 'Sorry, your order is already on its way.',
                description: 'You can only cancel the order during preparation.',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        }
    };

    return (
        <>
            <Box bg='whitesmoke' my={5} p={3} >
                <Box display='flex' justifyContent='space-around' flexDirection={{ base: 'column', sm: 'row' }} >
                    <Text fontSize={20} p={2} fontWeight={400} color='facebook.500' >Order Id : {orderId}</Text>
                    <Text fontSize={20} p={2} fontWeight={400} color='facebook.500' >Status : {orderStatus}</Text>
                    <Text fontSize={20} p={2} fontWeight={400} color='facebook.500' >Order Date : {moment(date).format('DD.MM.YY - hh:mm A')}</Text>
                    {
                        orderStatus === "Order has been delivered."
                            ?
                            <Button onClick={onOpen} my={2} colorScheme='facebook' >Report Order <Error sx={{ ml: 2 }} /></Button>
                            :
                            orderStatus !== "Order canceled." && <Button onClick={onClickCancel} my={2} colorScheme='facebook' >Cancel Order<Cancel sx={{ ml: 2 }} /></Button>
                    }
                </Box>
                <Divider />
                <SimpleGrid my={3} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={3} >
                    {
                        products.map((product, index) => {
                            return product !==null && <ClothesCard key={index} productId={product} isDelivered={orderStatus === "Order has been delivered."} />
                        })
                    }
                </SimpleGrid>
            </Box>
            <ReportModal onClose={onClose} isOpen={isOpen} orderId={orderId} />
        </>
    )
}

export default OrderCard;