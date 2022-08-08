import React from 'react';
import { Td, Text } from '@chakra-ui/react';

const TableProductInfo = ({ productArray }) => {
    return (
        <Td>
            {
                productArray.map((product) => {
                    return <Text>{product}</Text>
                })
            }
        </Td>
    )
}

export default TableProductInfo;