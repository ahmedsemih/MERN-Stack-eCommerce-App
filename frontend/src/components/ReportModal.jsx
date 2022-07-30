import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Text, Button, Textarea, useToast } from '@chakra-ui/react';

import { useUserContext } from '../contexts/UserContext';
import { addReport } from '../services/ReportServices';

const ReportModal = ({ onClose, isOpen, orderId }) => {

    const toast = useToast();
    const { currentUser } = useUserContext();
    const [content, setContent] = useState("");

    const handleClick = () => {
        addReport(orderId, currentUser, content)
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
                        title: 'Successful',
                        description: 'Your request has been received, we will contact you as soon as possible.',
                        status: 'success',
                        duration: 2000,
                        isClosable: true
                    });
                    onClose(true);
                }
            });
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize={30} color='facebook.500' >Report Order </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={20} my={3} fontWeight={400} color='facebook.500' >Order Id : {orderId}</Text>
                    <Textarea
                        spellCheck={false}
                        mt={5}
                        resize='none'
                        placeholder='Please write your complaint.'
                        value={content}
                        onInput={(e) => setContent(e.target.value)}
                        height={200}
                    ></Textarea>
                </ModalBody>
                <ModalFooter>
                    <Button mx={3} px={7} colorScheme='facebook' onClick={handleClick}>Send</Button>
                    <Button colorScheme='facebook' variant='outline' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ReportModal;