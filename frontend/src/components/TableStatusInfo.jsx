import React, { useEffect, useState } from 'react';
import { Td, useToast } from '@chakra-ui/react';
import { updateOrderStatus } from '../services/OrderServices';

const TableStatusInfo = ({ prepare, onWay, delivered, canceled, orderId, refresh, setRefresh }) => {

    const [status, setStatus] = useState("");
    const toast = useToast();

    useEffect(() => {
        if (prepare) {
            setStatus("Order is preparing.");
        } else if (onWay) {
            setStatus("Order is on way.");
        } else if (delivered) {
            setStatus("Order has been delivered.");
        } else {
            setStatus("Order canceled.");
        }
    }, [prepare, onWay, delivered, canceled]);

    const onClickStatus = () => {
        if (status === "Order is preparing.") {
            updateOrderStatus(orderId, true, false, true, false, false)
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
                            title: 'Changed!',
                            description: 'Order status changed.',
                            status: 'success',
                            duration: 2000,
                            isClosable: true
                        });
                    }
                });
            setRefresh(!refresh);
        } else if (status === "Order is on way.") {
            updateOrderStatus(orderId, false, false, false, true, false)
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
                            title: 'Changed!',
                            description: 'Order status changed.',
                            status: 'success',
                            duration: 2000,
                            isClosable: true
                        });
                    }
                });
            setRefresh(!refresh);
        }
    };

    return (
        <Td onClick={onClickStatus} cursor='pointer' _hover={{ textDecoration: 'underline' }} >
            {status}
        </Td>
    )
}

export default TableStatusInfo;