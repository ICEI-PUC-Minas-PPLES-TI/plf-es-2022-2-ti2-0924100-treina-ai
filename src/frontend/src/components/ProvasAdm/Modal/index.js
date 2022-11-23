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
function ModalProva({isOpen, onClose, handleSubmit, onSubmit, errors, register, isSubmitting, dados}) {  
  return (
    <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Colocar Nota</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl display="flex" flexDir="column" isInvalid={errors.nota}>
                        <HStack >
                            <Box w="100px">
                                <FormLabel htmlFor="Nota">nota</FormLabel>
                                <Input id="nota" borderColor='green' type="number" {...register('nota', {
                                    required: 'This is required',
                                    minLength: { value: 1, message: 'Nota deve ter pelo menos 1 número' },
                                    
                                })} />
                                <Input id="prova" borderColor='green' type="number" value={dados.provaId} {...register('prova')} hidden/>
                                <Input id="prova" borderColor='green' value={dados.usuId} {...register('usuario')} hidden/>
                            </Box>
                        </HStack>
                        <FormErrorMessage>
                            {errors.nota && errors.nota.message}
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

export default ModalProva;