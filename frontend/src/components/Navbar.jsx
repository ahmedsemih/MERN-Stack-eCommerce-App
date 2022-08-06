import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Box, Text, Icon, Menu, MenuList, MenuItem, MenuButton, MenuGroup, Divider } from '@chakra-ui/react';
import { Person, Favorite, ShoppingCart, ExitToApp, ShoppingBag, Report, MapsHomeWork, Inventory, Edit } from '@mui/icons-material';

import { getAllGenres } from '../services/GenreServices';
import { useUserContext } from '../contexts/UserContext';
import { useCartContext } from '../contexts/CartContext';
import Hamburger from './Hamburger';
import Dropdown from './Dropdown';
import Searchbar from './Searchbar';
import useGetUserRole from '../hooks/useGetUserRole';


const Navbar = () => {

  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();
  const { cart, refresh } = useCartContext();
  const [cookies, setCookie, removeCookie] = useCookies(['currentUser']);
  const [admin]=useGetUserRole(currentUser);

  useEffect(() => {
    getAllGenres()
      .then(result => {
        setGenres(result.allGenres);
      });
    var count = 0;
    if(cart.length){
      cart.forEach((item) => {
        if(item.amount){
          count += item.amount;
        }   
      });
    }
    setItemCount(count);
  },[refresh,cart,cookies.cart,admin]);

  const Logout = () => {
    removeCookie('currentUser', { path: '/' });
    setCurrentUser('');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
      position='sticky'
      top='0px'
      backgroundColor='#fff'
      zIndex={500} >
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
        <Searchbar />
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
              currentUser && !admin &&
                <Menu isOpen={open}>
                  <Icon fontSize={30} color='inherit' as={Person} />
                  <Text color='inherit' fontWeight={500} >Account</Text>
                  <MenuButton />
                  <MenuList >
                    <MenuGroup title='Account' >
                      <MenuItem onClick={() => navigate('/infos')} ><Person sx={{ marginRight: 2 }} /> My Informations</MenuItem>
                      <MenuItem onClick={() => navigate('/orders')} ><ShoppingBag sx={{ marginRight: 2 }} /> Orders</MenuItem>
                    </MenuGroup>
                    <Divider />
                    <MenuItem onClick={Logout} ><ExitToApp sx={{ marginRight: 2 }} /> Log out</MenuItem>
                  </MenuList>
                </Menu>
            }
            {
               !currentUser &&
               <>
                 <Icon fontSize={30} color='inherit' as={Person} />
                 <Text color='inherit' fontWeight={500} >Login</Text>
               </>
            }
            {
              admin && currentUser &&
              <Menu isOpen={open}>
                  <Icon fontSize={30} color='inherit' as={Person} />
                  <Text color='inherit' fontWeight={500} >Admin</Text>
                  <MenuButton />
                  <MenuList >
                    <MenuGroup title='Admin' >
                      <MenuItem onClick={() => navigate('/admin/products')} ><Inventory sx={{ marginRight: 2 }} />Products</MenuItem>
                      <MenuItem onClick={() => navigate('/admin/categories')} ><Edit sx={{ marginRight: 2 }} />Genres and Categories</MenuItem>
                      <MenuItem onClick={() => navigate('/admin/images')} ><MapsHomeWork sx={{ marginRight: 2 }} />Home Page Images</MenuItem>
                      <MenuItem onClick={() => navigate('/admin/reports')} ><Report sx={{ marginRight: 2 }} />Reports</MenuItem>
                      <MenuItem onClick={() => navigate('/admin/orders')} ><ShoppingBag sx={{ marginRight: 2 }} />Orders</MenuItem>
                    </MenuGroup>
                    <Divider />
                    <MenuItem onClick={Logout} ><ExitToApp sx={{ marginRight: 2 }} /> Log out</MenuItem>
                  </MenuList>
                </Menu>
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
            <Text color='inherit' fontWeight={500} >{itemCount > 0 ? `Cart (${itemCount})` : 'Cart'}</Text>
          </Box>
        </Box>
        <Hamburger base='none' sm='flex' md='none' />
      </Box>
      <Box
        display={{ base: 'none', md: 'flex' }}
        py={{ base: 1, md: 2 }}
        ps={5}
        width='100%'>
        {
          genres.map((genre) => {
            return genre.status && <Dropdown key={genre.name} title={genre.name} genreId={genre._id} />
          })
        }
      </Box>
    </Box>
  )
}

export default Navbar;