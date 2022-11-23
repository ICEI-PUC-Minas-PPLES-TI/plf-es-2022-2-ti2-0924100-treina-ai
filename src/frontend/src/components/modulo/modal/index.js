import { ChakraProvider } from "@chakra-ui/react";
import {
    Flex,
    Box,
    Center,
    FormControl,
    Input,
    FormLabel,
    HStack,
    Button,
    FormErrorMessage,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
function ModalModulo({isOpen, onClose, handleSubmit, onSubmit, errors, register, isSubmitting}) {  
  return (
    <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Cadastro Módulo</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl display="flex" flexDir="column" isInvalid={errors.name}>
                        <HStack >
                            <Box w="100px">
                                <FormLabel htmlFor="name">Nome</FormLabel>
                                <Input id="name" borderColor='green' {...register('name', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Nome deve ter mais de 4 caracteres' },
                                    
                                })} />
                            </Box>
                        </HStack>
                        <FormErrorMessage>
                            {errors.name && errors.name.message}
                        </FormErrorMessage>
                    </FormControl> 
                    <Button
                        mr={3} 
                        type="submit"
                        bg="teal.600"
                        color="white"
                        fontWeight="bold"
                        fontSize="xl"
                        mt={3}
                        _hover={{ bg: "teal.800" }}
                        isLoading={isSubmitting}> 
                        Enviar
                    </Button> 
                </form> 
            </ModalBody >
            </ModalContent>
        </Modal>
    </ChakraProvider>
  );
}

export default ModalModulo;