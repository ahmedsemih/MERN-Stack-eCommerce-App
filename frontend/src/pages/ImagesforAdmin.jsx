import React, { useEffect, useState } from 'react';
import { Box, Image, Text, Button, useToast, Divider, useDisclosure } from '@chakra-ui/react';

import { getAllImages, deleteImage, deleteMiniImage, getAllMiniImages } from '../services/ImageServices';
import AddImageModal from '../components/AddImageModal';

const ImagesforAdmin = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [carouselImages, setCarouselImages] = useState([]);
  const [miniImages, setMiniImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  useEffect(() => {
    getAllImages()
      .then((result) => {
        setCarouselImages(result.images);
      });
    getAllMiniImages()
      .then((result) => {
        setMiniImages(result.miniImages);
      })
  }, [refresh]);

  const onClickDeleteCarouselImage = (id) => {
    deleteImage(id)
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
            title: 'Deleted!',
            description: 'Image succesfully deleted.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
        }
      });
    setRefresh(!refresh);
  };

  const onClickDeleteMiniImage = (id) => {
    deleteMiniImage(id)
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
            title: 'Error!',
            description: 'Image successfully deleted.',
            status: 'success',
            duration: 2000,
            isClosable: true
          });
        }
      });
    setRefresh(!refresh);
  };



  return (
    <Box>
      <Box display='flex' justifyContent='space-between' my={5} px={6} >
        <Text fontSize={30} fontWeight={500} color='facebook.500'>Admin Image Panel</Text>
        <Button colorScheme='facebook' onClick={onOpen} >Add Image</Button>
      </Box>
      <Divider></Divider>
      <Box my={5} p={3}>
        <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500'> Carousel Images</Text>
        <Box display='flex' flexWrap='wrap' >
          {
            carouselImages.length > 0 && carouselImages.map((image) => {
              return (
                <Box key={image._id} minWidth={260} maxWidth={500} mx={{ base: 0, sm: 2, md: 3 }} my={3} >
                  <Image src={image.url} width='100%' height='auto' />
                  <Button onClick={() => onClickDeleteCarouselImage(image._id)} colorScheme='facebook' width='100%'>Delete</Button>
                </Box>
              )
            })
          }
          {
            carouselImages.length === 0
            &&
            <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500' my={10} >There are no carousel images here.</Text>
          }
        </Box>
      </Box>
      <Box my={5} p={3}>
        <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500'> Mini Images</Text>
        <Box display='flex' flexWrap='wrap' >
          {
            miniImages.length > 0 && miniImages.map((image) => {
              return (
                <Box key={image._id} width={260} mx={{ base: 0, sm: 2, md: 3 }} my={3} >
                  <Image src={image.url} width='100%' height='auto' />
                  <Button onClick={() => onClickDeleteMiniImage(image._id)} colorScheme='facebook' width='100%'>Delete</Button>
                </Box>
              )
            })
          }
          {
            miniImages.length === 0
            &&
            <Text fontSize={24} fontWeight={500} ml={3} color='facebook.500' my={10} >There are no mini images here.</Text>
          }
        </Box>
      </Box>
      <AddImageModal isOpen={isOpen} onClose={onClose} refresh={refresh} setRefresh={setRefresh} />
    </Box>
  )
}

export default ImagesforAdmin;