import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, Text, Icon, Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react';
import { Person, Favorite, ShoppingCart, ExitToApp } from '@mui/icons-material';

import { useUserContext } from '../contexts/UserContext';
import Hamburger from './Hamburger';
import Dropdown from './Dropdown';
import Searchbar from './Searchbar';

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);

  const Logout = () => {
    removeCookie('currentUser', { path: '/' });
    setCurrentUser('');
  };

  return (
    <Box display='flex' flexDirection='column' boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px' position='sticky' >
      <Box
        display={'flex'}
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent='space-between'
        py={{ base: 1, md: 2 }}
        px={{ base: 2, md: 5 }}
        width='100%'
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent={{ base: 'space-between', sm: 'start' }}

        >
          <Text
            fontSize={40}
            fontWeight={700}
            color={'facebook.500'}
            letterSpacing={-2}
            cursor='pointer'
            onClick={() => navigate('/')}
          >CLOTHIFY</Text>
          <Hamburger base='flex' sm='none' md='none' />
        </Box>
        <Searchbar/>
        <Box display={{ base: 'none', md: 'flex' }} alignItems='center' px={2} >
          <Box
            color='facebook.500'
            display='flex'
            flexDirection='column'
            cursor='pointer'
            alignItems='center'
            transition={.5}
            _hover={{ color: 'facebook.700' }}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onClick={() => !currentUser && navigate('/login')}
          >
            {
              currentUser ?
                <Menu isOpen={open}>
                  <Icon fontSize={30} color='inherit' as={Person} />
                  <Text color='inherit' fontWeight={500} >Account</Text>
                  <MenuButton />
                  <MenuList >
                    <MenuItem onClick={() => navigate('/profile')} ><Person sx={{ marginRight: 2 }} /> Account</MenuItem>
                    <MenuItem onClick={Logout} ><ExitToApp sx={{ marginRight: 2 }} /> Log out</MenuItem>
                  </MenuList>
                </Menu>
                :
                <>
                  <Icon fontSize={30} color='inherit' as={Person} />
                  <Text color='inherit' fontWeight={500} >Login</Text>
                </>
            }
          </Box>
          <Box
            color='facebook.500'
            display='flex'
            flexDirection='column'
            cursor='pointer'
            mx='5'
            alignItems='center'
            transition={.5}
            _hover={{ color: 'facebook.700' }}
            onClick={() => navigate('/favorites')}
          >
            <Icon fontSize={30} color='inherit' as={Favorite} />
            <Text color='inherit' fontWeight={500} >Favorites</Text>
          </Box>
          <Box
            color='facebook.500'
            display='flex'
            flexDirection='column'
            cursor='pointer'
            alignItems='center'
            transition={.5}
            _hover={{ color: 'facebook.700' }}
            onClick={() => navigate('/cart')}
          >
            <Icon fontSize={30} color='inherit' as={ShoppingCart} />
            <Text color='inherit' fontWeight={500} >Cart</Text>
          </Box>
        </Box>
        <Hamburger base='none' sm='flex' md='none' />
      </Box>
      <Box
        display={{ base: 'none', md: 'flex' }}
        py={{ base: 1, md: 2 }}
        width='100%'>
        <Dropdown title={'Men'} />
        <Dropdown title={'Women'} />
        <Dropdown title={'Child'} />
      </Box>
    </Box>
  )
}

export default Navbar;