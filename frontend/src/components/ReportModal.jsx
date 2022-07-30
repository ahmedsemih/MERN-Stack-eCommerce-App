import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Text, Button, Textarea } from '@chakra-ui/react';

const ReportModal = ({ onClose, isOpen, orderId }) => {

    const [content, setContent] = useState("");

    const handleClick = () => {
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