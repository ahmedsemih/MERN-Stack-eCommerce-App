import React, { useEffect, useState } from 'react';
import { Divider, Box, Text } from '@chakra-ui/react';
import moment from 'moment';

import useGetNameById from '../hooks/useGetNameById';

const Comment = ({ authorId, commentText, createdAt }) => {

    const [name] = useGetNameById(authorId);
    const [author, setAuthor] = useState("");

    useEffect(() => {
        setAuthor(name)
    }, [name]);

    return (
        <Box>
            <Divider />
            <Box
                display='flex'
                mt={{ base: 5, md: 10 }} fontSize={20}
            >
                <Text mr={2} fontWeight={600} >{author} </Text>
                |
                <Text ml={2} fontWeight={300} >{moment(createdAt).format('DD MMMM YYYY')}</Text>
            </Box>
            <Text mt={5} mb={{ base: 5, md: 10 }} >{commentText}</Text>
            <Divider />
        </Box>
    )
}

export default Comment;