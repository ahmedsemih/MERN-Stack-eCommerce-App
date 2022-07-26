import React, { useEffect, useState } from 'react';
import { useDisclosure, MenuItem, Menu, MenuButton, MenuList, Box } from '@chakra-ui/react';

import { getCategoryByGenre } from '../services/CategoryServices';

const Dropdown = ({ title, genreId }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categories,setCategories]=useState([]);

    useEffect(()=>{
        getCategoryByGenre(genreId)
        .then(result=>{
            setCategories(result.category);
        });
    },[genreId]);

     return categories.length !== 0 && (
        <Box pe={{base:2,md:10}}>
            <Menu isOpen={isOpen} >
                <MenuButton
                    color='blackAlpha.700'
                    fontSize={20}
                    fontWeight={500}
                    variant='outline'
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    borderBottom='3px solid white'
                    transition={.5}
                    _hover={{color:'facebook.500',borderBottom:'3px solid #385898'}}
                >{title}</MenuButton>
                <MenuList
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                >
                    {
                        categories && categories.map((category)=>{
                            return category.status && <MenuItem key={category._id} >{category.name}</MenuItem>
                        })
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Dropdown;