import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text, Button, Input, Select, useToast, Textarea } from '@chakra-ui/react'
import { useFormik } from 'formik';

import ProductValidations from '../validations/ProductValidations';
import { getProductById, addProduct, updateProduct } from '../services/ProductServices';
import { getCategoryByGenre } from '../services/CategoryServices';
import { getAllGenres } from '../services/GenreServices';
import { uploadImageToCloudinary } from '../services/ImageServices';

const ProductEditModal = ({ isOpen, onClose, isEdit, currentId }) => {

    const toast = useToast();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [allCategories, setAllCategories] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [allGenres, setAllGenres] = useState([])

    const { values, isValid, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            name: "",
            description: "",
            category: "",
            color: "",
            gender: "",
            sizes: ["XS", "S", "M", "L", "XL"],
            price: 0
        },
        onSubmit: values => {
            addProduct(imageUrl, values.name, values.color, values.sizes, values.description, values.category, values.gender, values.price)
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
                        onClose(true);
                        resetForm();
                        toast({
                            title: 'Added!',
                            description: 'Product successfully added.',
                            status: 'success',
                            duration: 2000,
                            isClosable: true
                        });
                    }
                });
        },
        validationSchema: ProductValidations
    });

    useEffect(() => {
        currentId && getProductById(currentId)
            .then((result) => {
                setName(result.product.name);
                setDescription(result.product.description);
                setPrice(result.product.price);
            });


        getAllGenres()
            .then((result) => {
                setAllGenres(result.allGenres);
            });

    }, [currentId]);

    const onClickSave = () => {
        updateProduct(currentId, name, description, price)
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
                    onClose(true);
                    toast({
                        title: 'Edited!',
                        description: 'Product successfully edited.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                }
            })
    };

    const chooseImage = (e) => {
        uploadImageToCloudinary(e.target.files[0])
            .then(data => setImageUrl(data.url));
    };

    const onChangeGenre = (e) => {
        setSelectedGenre(e.target.value);
        getCategoryByGenre(e.target.value)
            .then((result) => {
                setAllCategories(result.category);
            });
    };

    if (isEdit) {
        return (
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='facebook.500' >Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontSize={18} fontWeight={300} >ID : {currentId}</Text>
                        <Input mt={3} placeholder='Name' onInput={(e) => setName(e.target.value)} value={name} />
                        <Textarea resize='none' mt={3} placeholder='Description' onInput={(e) => setDescription(e.target.value)} value={description} />
                        <Input mt={3} placeholder='Price' type='number' onInput={(e) => setPrice(e.target.value)} value={price} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='facebook' onClick={onClickSave} >Save</Button>
                        <Button colorScheme='facebook' variant='ghost' ml={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    } else {
        return (
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color='facebook.500' >New Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input type='file' p={0} border='none' onChange={chooseImage} />
                        <Input mt={3} name='name' placeholder='Name' onChange={handleChange} value={values.name} />
                        <Textarea name='description' resize='none' mt={3} placeholder='Description' onChange={handleChange} value={values.description} />
                        <Select mt={3} placeholder='Genre' onChange={onChangeGenre} value={selectedGenre} >
                            {
                                allGenres && allGenres.map((genre) => {
                                    return <option key={genre._id} value={genre._id}>{genre.name}</option>
                                })
                            }
                        </Select>
                        <Select mt={3} name='category' placeholder='Category' onChange={handleChange} value={values.category} >
                            {
                                allCategories && allCategories.map((category) => {
                                    return <option key={category._id} value={category._id}>{category.name}</option>
                                })
                            }
                        </Select>
                        <Select mt={3} name='color' placeholder='Color' onChange={handleChange} value={values.color} >
                            <option value="blue">Blue</option>
                            <option value="white">White</option>
                            <option value="green">Green</option>
                            <option value="black">Black</option>
                            <option value="red">Red</option>
                        </Select>
                        <Select mt={3} name='gender' placeholder='Gender' onChange={handleChange} value={values.gender} >
                            <option value="man">Man</option>
                            <option value="woman">Woman</option>
                            <option value="unisex">Unisex</option>
                        </Select>
                        <Input mt={3} placeholder='Price' type='number' name='price' onChange={handleChange} value={values.price} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='facebook' onClick={handleSubmit} disabled={!isValid && imageUrl === ""} >Add</Button>
                        <Button colorScheme='facebook' variant='ghost' ml={3} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
}

export default ProductEditModal;