import React, { useState } from 'react';
import { Box, Text, } from '@chakra-ui/react'
import GenreEdit from '../components/GenreEdit';
import CategoryEdit from '../components/CategoryEdit';

const CategoriesforAdmin = () => {

  const [currentMode, setCurrentMode] = useState("add");

  return (
    <Box my={10} >
      <Box display='flex' justifyContent='center' mt={5} >
        <Text
          textAlign='center'
          fontSize={30}
          fontWeight={currentMode === "add" ? 600 : 300}
          color='facebook.500'
          mr={5}
          cursor='pointer'
          onClick={() => setCurrentMode("add")}
        >Add</Text>
        <Text
          textAlign='center'
          fontSize={30}
          fontWeight={currentMode === "add" ? 300 : 600}
          color='facebook.500'
          ml={5}
          cursor='pointer'
          onClick={() => setCurrentMode("edit")}
        >Edit</Text>
      </Box>
      <Box display='flex' justifyContent='space-around' flexDirection={{ base: 'column', md: 'row' }} >
        <GenreEdit isEdit={currentMode === "edit"} />
        <CategoryEdit isEdit={currentMode === "edit"} />
      </Box>
    </Box>
  )
}

export default CategoriesforAdmin;