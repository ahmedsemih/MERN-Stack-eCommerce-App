import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, Select, useToast } from '@chakra-ui/react';

import { getCategoryByGenre, addCategory, updateCategory, deleteCategory } from '../services/CategoryServices';
import { getAllGenres } from '../services/GenreServices';

const CategoryEdit = ({ isEdit }) => {

    const [allCategories, setAllCategories] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    const [status, setStatus] = useState(true);
    const [selectedId, setSelectedId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const toast = useToast();

    useEffect(() => {
        getAllGenres()
            .then((result) => {
                setAllGenres(result.allGenres);
            });
        getCategoryByGenre(selectedGenre)
            .then((result) => {
                setAllCategories(result.category);
            });
    }, [isEdit, selectedGenre]);

    const onClickEdit = () => {
        updateCategory(selectedId, selectedCategory, selectedGenre, status)
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
                        title: 'Updated!',
                        description: 'Category successfully updated.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            });
    };

    const onClickDelete = () => {
        deleteCategory(selectedId)
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
                        description: 'Category successfully deleted.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            });
    };

    const onClickAdd = () => {
        addCategory(categoryName, selectedGenre, status)
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
                    setCategoryName("");
                    setStatus(true);
                    toast({
                        title: 'Added!',
                        description: 'Category successfully added.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            });
    };

    const onChangeCategory = (e) => {
        setStatus(allCategories[e.target.value].status);
        setSelectedId(allCategories[e.target.value]._id);
        setSelectedCategory(allCategories[e.target.value].name);
    };

    if (isEdit) {
        return (
            <Box p={3} my={5} display='flex' flexDirection='column' minWidth='280px' width='25%'>
                <Text fontSize={26} color='facebook.500'>Category</Text>
                <Select mt={5} placeholder='Select Genre' onChange={(e) => setSelectedGenre(e.target.value)} >
                    {
                        allGenres.length > 0 && allGenres.map((genre) => {
                            return <option key={genre._id} value={genre._id}>{genre.name}</option>
                        })
                    }
                </Select>
                <Select mt={5} placeholder='Select Category' onChange={onChangeCategory} >
                    {
                        allCategories.length > 0 && allCategories.map((category, index) => {
                            return <option key={category._id} value={index}>{category.name}</option>
                        })
                    }
                </Select>
                <Input my={5} placeholder='Category Name' value={selectedCategory} onInput={(e) => setSelectedCategory(e.target.value)} />
                <Select mb={5} value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </Select>
                <Button colorScheme='facebook' onClick={onClickEdit} >Edit</Button>
                <Button color='facebook.500' variant='text' _hover={{ textDecoration: 'underline' }} onClick={onClickDelete} >Delete</Button>
            </Box>
        )
    } else {
        return (
            <Box p={3} my={5} display='flex' flexDirection='column' minWidth='280px' width='25%'>
                <Text fontSize={26} color='facebook.500'>Category</Text>
                <Select mt={5} placeholder='Select Genre' onChange={(e) => setSelectedGenre(e.target.value)} >
                    {
                        allGenres.length > 0 && allGenres.map((genre) => {
                            return <option key={genre._id} value={genre._id}>{genre.name}</option>
                        })
                    }
                </Select>
                <Input my={5} placeholder='Category Name' value={categoryName} onInput={(e) => setCategoryName(e.target.value)} />
                <Select mb={5} value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </Select>
                <Button colorScheme='facebook' onClick={onClickAdd} >Add</Button>
            </Box>
        )
    }

}

export default CategoryEdit