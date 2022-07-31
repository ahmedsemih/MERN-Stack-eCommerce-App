import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Icon, Text, Heading, Button, SimpleGrid } from '@chakra-ui/react';
import { Favorite } from '@mui/icons-material';

import { getUserById } from '../services/UserServices';
import { useUserContext } from '../contexts/UserContext';
import ClothesCard from '../components/ClothesCard';

const Favorites = () => {

  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getUserById(currentUser)
      .then(result => {
        setFavorites(result.user.favorites);
      });
  }, [currentUser]);

  if (currentUser !== "") {
    if (favorites.length !== 0) {
      return (
        <Box px={10} py={5}>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={3} >
            {
              favorites.map((favorite) => {
                return <ClothesCard key={favorite} productId={favorite} />
              })
            }
          </SimpleGrid>
        </Box>
      )
    } else {
      return (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          mt={10}
          p={3}
        >
          <Icon color='#314E89' fontSize={100} as={Favorite} />
          <Heading textAlign='center' fontSize={30} mt={8}  >You don't have any favorite</Heading>
          <Text textAlign='center' fontSize={24} mt={2} fontWeight={300} >You haven't added a product to your favourites. All you have to do is click on the little heart icon.</Text>
          <Button
            variant='solid'
            fontSize={20}
            px={10} mt={10}
            colorScheme='facebook'
            onClick={() => navigate('/')}>
            Start Shopping
          </Button>
        </Box>
      )
    }
  } else {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        mt={10}
        p={3}
      >
        <Icon color='#314E89' fontSize={100} as={Favorite} />
        <Heading textAlign='center' fontSize={30} mt={8}  >You must be logged in</Heading>
        <Text textAlign='center' fontSize={24} mt={2} fontWeight={300} >You must be logged in to see your favorites or buy something.</Text>
        <Button
          variant='solid'
          fontSize={20}
          px={10} mt={10}
          colorScheme='facebook'
          onClick={() => navigate('/login')}>
          Login
        </Button>
      </Box>
    )
  }

}

export default Favorites;