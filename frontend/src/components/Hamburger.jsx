import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box, MenuGroup, MenuDivider } from '@chakra-ui/react';
import { Edit, ExitToApp, Favorite, Inventory, MapsHomeWork, Menu as MenuIcon, Person, Report, ShoppingBag, ShoppingCart } from '@mui/icons-material';

import { getAllGenres } from '../services/GenreServices';
import useGetUserRole from '../hooks/useGetUserRole';
import { useUserContext } from '../contexts/UserContext';
import CategoryMenuItems from './CategoryMenuItems';

const Hamburger = ({ base, sm, md }) => {

    const navigate = useNavigate();
    const { currentUser } = useUserContext();
    const [admin] = useGetUserRole(currentUser);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        getAllGenres()
            .then((result) => {
                setGenres(result.allGenres);
            });
    }, []);

    const onClickLogout = () => {

    };

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
                    {
                        admin && currentUser &&
                        <MenuGroup title='Admin'>
                            <MenuItem onClick={() => navigate('/admin/products')} ><Inventory sx={{ marginRight: 2 }} />Products</MenuItem>
                            <MenuItem onClick={() => navigate('/admin/categories')} ><Edit sx={{ marginRight: 2 }} />Genres and Categories</MenuItem>
                            <MenuItem onClick={() => navigate('/admin/images')} ><MapsHomeWork sx={{ marginRight: 2 }} />Home Page Images</MenuItem>
                            <MenuItem onClick={() => navigate('/admin/reports')} ><Report sx={{ marginRight: 2 }} />Reports</MenuItem>
                            <MenuItem onClick={() => navigate('/admin/orders')} ><ShoppingBag sx={{ marginRight: 2 }} />Orders</MenuItem>
                            <MenuItem onClick={onClickLogout} ><ExitToApp sx={{ marginRight: 2 }} />Log out</MenuItem>
                        </MenuGroup>
                    }{
                        !admin && currentUser &&
                        <MenuGroup title='Account'>
                            <MenuItem onClick={() => navigate('/infos')} ><Person sx={{ marginRight: 2 }} /> My Informations</MenuItem>
                            <MenuItem onClick={() => navigate('/orders')} ><ShoppingBag sx={{ marginRight: 2 }} /> Orders</MenuItem>
                            <MenuItem onClick={() => navigate('/favorites')} ><Favorite sx={{ marginRight: 2 }} />Favorites</MenuItem>
                            <MenuItem onClick={() => navigate('/cart')} ><ShoppingCart sx={{ marginRight: 2 }} />Cart</MenuItem>
                            <MenuItem onClick={onClickLogout} ><ExitToApp sx={{ marginRight: 2 }} />Log out</MenuItem>
                        </MenuGroup>
                    }{
                        !currentUser &&
                        <MenuGroup>
                            <MenuItem onClick={() => navigate('/favorites')} ><Person sx={{ marginRight: 2 }} />Login</MenuItem>
                            <MenuItem onClick={() => navigate('/favorites')} ><Favorite sx={{ marginRight: 2 }} />Favorites</MenuItem>
                            <MenuItem onClick={() => navigate('/cart')} ><ShoppingCart sx={{ marginRight: 2 }} />Cart</MenuItem>
                        </MenuGroup>
                    }
                    <MenuDivider />
                    {
                        genres.length > 0 && genres.map((genre) => {
                            return (
                                <MenuGroup key={genre._id} title={genre.name}>
                                    <CategoryMenuItems genreId={genre._id} />
                                </MenuGroup>
                            )
                        })
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Hamburger;