import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, Select, useToast } from '@chakra-ui/react'
import { getAllGenres, addGenre, updateGenre, deleteGenre } from '../services/GenreServices';

const GenreEdit = ({ isEdit }) => {

    const [genreName, setGenreName] = useState("");
    const [allGenres, setAllGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [status, setStatus] = useState(true);
    const [selectedId, setSelectedId] = useState("");
    const toast = useToast();

    useEffect(() => {
        getAllGenres()
            .then((result) => {
                setAllGenres(result.allGenres);
            });
    }, [isEdit]);

    const onClickAdd = () => {
        addGenre(genreName, status)
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
                    setGenreName("");
                    setStatus(true);
                    toast({
                        title: 'Added!',
                        description: 'Genre successfully added.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            })
    };

    const onClickEdit = () => {
        updateGenre(selectedId, selectedGenre, status)
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
                        description: 'Genre successfully updated.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            });
    };

    const onClickDelete = () => {
        deleteGenre(selectedId)
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
                        description: 'Genre successfully deleted.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            });
    };

    const onChangeGenre = (e) => {
        setSelectedGenre(allGenres[e.target.value].name);
        setStatus(allGenres[e.target.value].status);
        setSelectedId(allGenres[e.target.value]._id);
    };

    if (isEdit) {
        return (
            <Box p={3} my={5} display='flex' flexDirection='column' minWidth='280px' width='25%' >
                <Text fontSize={26} color='facebook.500' >Genre</Text>
                <Select mt={5} placeholder='Select Genre' onChange={onChangeGenre} >
                    {
                        allGenres.length > 0 && allGenres.map((genre, index) => {
                            return <option key={genre._id} value={index}>{genre.name}</option>
                        })
                    }
                </Select>
                <Input my={5} placeholder='Genre Name' value={selectedGenre} onInput={(e) => setSelectedGenre(e.target.value)} />
                <Select mb={5} value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </Select>
                <Button colorScheme='facebook' onClick={onClickEdit} >Edit</Button>
                <Button color='facebook.500' variant='text' _hover={{ textDecoration: 'underline' }} onClick={onClickDelete} >Delete</Button>
            </Box>
        )
    } else {
        return (
            <Box p={3} my={5} display='flex' flexDirection='column' minWidth='280px' width='25%' >
                <Text fontSize={26} >Genre</Text>
                <Input my={5} placeholder='Genre Name' value={genreName} onInput={(e) => setGenreName(e.target.value)} />
                <Select mb={5} value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </Select>
                <Button colorScheme='facebook' onClick={onClickAdd}>Add</Button>
            </Box>
        )
    }
}

export default GenreEdit;