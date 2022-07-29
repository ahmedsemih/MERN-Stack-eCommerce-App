import React, { useEffect, useState } from 'react';
import { Box, Text, Textarea, Input, InputGroup, InputLeftElement, Divider, Center, Button, useToast } from '@chakra-ui/react';
import { Phone } from '@mui/icons-material';

import { useUserContext } from '../contexts/UserContext';
import { getUserById, updateUser } from '../services/UserServices';

const Infos = () => {

  const toast = useToast();
  const { currentUser } = useUserContext();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    getUserById(currentUser)
      .then((result) => {
        setAddress(result.user.address);
        setPhone(result.user.phone);
      });
  }, [currentUser]);

  const onInputPhone = (e) => {
    setPhone(e.target.value);
  };

  const onClickSave = () => {
    if (phone.length === 11) {
      updateUser(currentUser, address, phone)
        .then((result) => {
          if (result.status) {
            toast({
              title: 'Error!',
              description: 'Somethings went wrong.',
              status: 'error',
              duration: 2000,
              isClosable: true
            });
          } else {
            toast({
              title: 'Successful!',
              description: 'Successfully saved.',
              status: 'success',
              duration: 2000,
              isClosable: true
            });
          }
        });
    } else {
      toast({
        title: 'Error!',
        description: 'Please enter a valid phone number.',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
    }

  };

  const onInputAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <Box mt={10} p={2} >
      <Text p={5} textAlign='center' fontSize={30} fontWeight={300} color='facebook.500' >My Informations</Text>
      <Box display='flex' flexDirection={{ base: 'column', md: 'row' }} >
        <Box width='100%' display='flex' flexDirection='column' alignItems='center'  >
          <Text p={5} textAlign='center' fontSize={22} fontWeight={500} color='facebook.500' >Address</Text>
          <Textarea mb={5} height={150} maxWidth={500} resize='none' placeholder='Please write your address...' value={address} onInput={onInputAddress} ></Textarea>
          <Button colorScheme='facebook' onClick={onClickSave} >Save</Button>
        </Box>
        <Center height={300} mt={5} mx={3} display={{ base: 'none', md: 'block' }} >
          <Divider orientation='vertical' />
        </Center>
        <Box width='100%' display='flex' flexDirection='column' alignItems='center' >
          <Text p={5} textAlign='center' fontSize={22} fontWeight={500} color='facebook.500' >Phone</Text>
          <InputGroup maxWidth={300} marginX='auto' >
            <InputLeftElement
              pointerEvents='none'
              children={<Phone color='gray.300' />}
            />
            <Input maxLength={11} type='tel' placeholder='Phone number' value={phone} onInput={onInputPhone} />
          </InputGroup>
          <Button mt={5} colorScheme='facebook' onClick={onClickSave} >Save</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Infos;