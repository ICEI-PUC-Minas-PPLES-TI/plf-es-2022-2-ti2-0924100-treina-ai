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
    RadioGroup,
    Radio,
    Textarea
} from "@chakra-ui/react";
function ModalModulo({ isOpen, onClose, handleSubmit, onSubmit, errors, register, isSubmitting }) {
    return (
        <ChakraProvider>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Alterar Tarefa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl display="flex" flexDir="column" gap="4" isInvalid={errors.nome || errors.conteudo || errors.video}>
                                <HStack spacing="4">
                                    <Box w="100%">
                                        <FormLabel htmlFor="name">Nome</FormLabel>
                                        <Input id="name" borderColor='green' type={"a"} {...register('name', {
                                            required: 'This is required',
                                            minLength: { value: 4, message: 'Nome deve ter mais de 4 caracteres' },
                                        })} />
                                    </Box>
                                    <Box w="100%">
                                        <FormLabel htmlFor="conteudo">Conteúdo</FormLabel>
                                        <Textarea id="conteudo" borderColor='green' type="conteudo" {...register('conteudo', {
                                            required: 'This is required',
                                            minLength: { value: 10, message: 'conteudo deve ter mais de 10 caracteres' },
                                        })} />
                                    </Box>
                                </HStack>
                                <HStack spacing="4">
                                    <Box w="100%">
                                        <FormLabel htmlFor="video">video</FormLabel>
                                        <Input placeholder="https://www.youtube.com/embed/2LvNRMJ1s3Y" id="video" borderColor='green' {...register('video', {
                                            required: 'This is required',
                                            minLength: { value: 6, message: 'video deve ter mais de 6 caracteres' },
                                        })} />
                                    </Box>
                                </HStack>
                                <HStack justify="center">
                                    <Button
                                        w={240}
                                        p="6"
                                        type="submit"
                                        bg="teal.600"
                                        color="white"
                                        fontWeight="bold"
                                        fontSize="xl"
                                        mt="2"
                                        _hover={{ bg: "teal.800" }}
                                        isLoading={isSubmitting}
                                    >
                                        Enviar
                                    </Button>
                                </HStack>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                                <FormErrorMessage>
                                    {errors.conteudo && errors.conteudo.message}
                                </FormErrorMessage>
                                <FormErrorMessage>
                                    {errors.video && errors.video.message}
                                </FormErrorMessage>
                            </FormControl>
                        </form>
                    </ModalBody >
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
}