import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Td, Th, TableContainer, CircularProgress } from '@chakra-ui/react';
import moment from 'moment';

import { getAllOrders, getOrdersByStatus } from '../services/OrderServices';
import TableUserInfo from '../components/TableUserInfo';
import TableProductInfo from '../components/TableProductInfo';
import TableStatusInfo from '../components/TableStatusInfo';

const OrdersforAdmin = () => {

  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(false);

  useEffect(() => {
    if (currentStatus) {
      getOrdersByStatus(true)
        .then((result) => {
          setOrders(result.orders);
        });
    } else {
      getAllOrders()
        .then((result) => {
          setOrders(result.allOrders);
        });
    }
  }, [refresh, currentStatus]);

  if (orders.length > 0) {
    return (
      <Box py={5}>
        <TableContainer p={3} >
          <Table variant='striped' >
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Buyer</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Address</Th>
                <Th>Products</Th>
                <Th>Order Date</Th>
                <Th onClick={() => setCurrentStatus(!currentStatus)} cursor='pointer' _hover={{ textDecoration: 'underline' }} >Status - {currentStatus ? "Active" : "All"}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                orders.map((order) => {
                  return (
                    <Tr key={order._id}>
                      <Td>{order._id}</Td>
                      <TableUserInfo buyerId={order.buyer} />
                      <Td>{order.address}</Td>
                      <TableProductInfo productArray={order.products} refresh={refresh} setRefresh={setRefresh} />
                      <Td>{moment(order.orderDate).format('DD.MM.YY')}</Td>
                      <TableStatusInfo
                        prepare={order.prepare}
                        onWay={order.onWay}
                        delivered={order.delivered}
                        canceled={order.cancel}
                        orderId={order._id}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    </Tr>
                  )
                })
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    )
  } else {
    return (
      <Box alignItems='center' display='flex' justifyContent='center' width='100%' minHeight='40vh' >
        <CircularProgress isIndeterminate color='facebook.500' />
      </Box>
    )
  }
}

export default OrdersforAdmin;