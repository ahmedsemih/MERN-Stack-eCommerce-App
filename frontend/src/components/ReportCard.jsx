import React, { useEffect, useState } from 'react';
import { Box, Text, Button, Divider, useToast } from '@chakra-ui/react';
import moment from 'moment';

import { getUserById } from '../services/UserServices';
import { deleteReport } from '../services/ReportServices';

const ReportCard = ({reportId, orderId, userId, content, createdAt, setRefresh, refresh }) => {

    const [user, setUser] = useState("");
    const toast=useToast();

    useEffect(() => {
        getUserById(userId)
            .then((result) => {
                setUser(result.user);
            });
    }, [userId]);

    const onClickFixed=()=>{
        deleteReport(reportId)
        .then((result)=>{
            if(result.status){
                toast({
                    title:'Error!',
                    description:'Somethings went wrong.',
                    status:'error',
                    duration:2000,
                    isClosable:true
                });
            }else{
                toast({
                    title:'Success!',
                    description:'Report deleted successfully.',
                    status:'success',
                    duration:2000,
                    isClosable:true
                });
                setRefresh(!refresh);
            }
        });
    };

    return (
        <Box bg='whitesmoke' p={3} >
            <Box display='flex' flexDirection={{base:'column',md:'row'}} >
                <Text mx={3} fontSize={22}>Name : {user.firstName + ' ' + user.lastName}</Text>
                <Text mx={3} fontSize={22}>Contact : {user.email+ ' - ' + user.phone}</Text>
            </Box>
            <Box display='flex' my={3} flexDirection={{base:'column',sm:'row'}} >
                <Text mx={3} fontSize={22}>Order Id : {orderId}</Text>
                <Text mx={3} fontSize={22}>Date : {moment(createdAt).format('DD.MM.YY')}</Text>
            </Box>
            <Divider  />
                <Text mx={3} my={3} fontSize={18}>{content}</Text>
                <Box float='right' mt={3} >
                <Button colorScheme='facebook' px={5} onClick={onClickFixed} >Solved</Button>
                </Box>

        </Box>
    )
}

export default ReportCard;