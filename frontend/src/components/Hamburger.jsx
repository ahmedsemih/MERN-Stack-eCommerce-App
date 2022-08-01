import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box, MenuGroup, MenuDivider } from '@chakra-ui/react';
import { Menu as MenuIcon } from '@mui/icons-material';

const Hamburger = ({ base, sm, md }) => {
    return (
        <Box display={{ base: base, sm: sm, md: md }} p={1} alignItems='center' >
            <Menu >
                <MenuButton
                    as={IconButton}
                    color='facebook.500'
                    fontSize={40}
                    icon={<MenuIcon fontSize='40px' />}
                    variant='ghost'
            
                    maxWidth='50px'
                />
                <MenuList
                    width='100vw'
                    zIndex={200}
                >
                    <MenuGroup title='Account'>
                    <MenuItem>Login</MenuItem>
                    <MenuItem>Favorites</MenuItem>
                    <MenuItem>Cart</MenuItem>
                    </MenuGroup>
                    <MenuDivider/>
                    <MenuGroup title='Categories'>
                    <MenuItem>Men</MenuItem>
                    <MenuItem>Women</MenuItem>
                    <MenuItem>Baby</MenuItem>
                    <MenuItem>Child</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Hamburger;