import React, { useEffect, useState } from 'react';
import {Td } from '@chakra-ui/react';

import { getUserById } from '../services/UserServices';

const TableUserInfo = ({ buyerId }) => {

    const [buyer, setBuyer] = useState("");

    useEffect(() => {
        getUserById(buyerId)
            .then((result) => {
                setBuyer(result.user);
            });
    }, [buyerId]);

    return (
        <>
            <Td>{`${buyer.firstName} ${buyer.lastName}`}</Td>
            <Td>{buyer.email}</Td>
            <Td>{buyer.phone}</Td>
        </>
    )
}

export default TableUserInfo;