import { useState, useEffect} from "react";
import {useForm} from 'react-hook-form';
import Api from '../../service/Api'
import "./style.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import {
    Flex,
    Box,
    Center,
    FormControl,
    Input,
    FormLabel,
    HStack,
    RadioGroup,
    Radio,
    Button,
    FormErrorMessage,
  } from "@chakra-ui/react";

function Cadastro() {  
  const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();

  const onSubmit = (data) =>{
    let criarUsuario = {
        nome: data.name,
        email: data.email,
        senha: data.password,
        sobrenome: data.sobrenome,
        tipo: data.tipo === 'Administrador' ? '1': '2'
    }
    Api.post('usuario/Cadastrar', criarUsuario)
    .then((res) => {
        alert(res.data)
        if(res.status === 200){
            reset();
        }
    })

  }

  return (
    <ChakraProvider>
        <Box h="100vh">
        <Navbar/>
        <Center
            as="header"
            h={150}
            bg="#060b26"
            color="white"
            fontWeight="bold"
            fontSize="4xl"
            pb="8"
        >
            Formulário
        </Center>
        <Flex
            align="center"
            justify="center"
            bg="#111"
            h="calc(100vh - 150px)"
        >
            <Center
            w="100%"
            maxW={840}
            bg="white"
            top={100}
            position="absolute"
            borderRadius={5}
            p="6"
            boxShadow="0 1px 2px #ccc"
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl display="flex" flexDir="column" gap="4" isInvalid={errors.name || errors.email || errors.password || errors.sobrenome}>
                    <HStack spacing="4">
                    <Box w="100%">
                        <FormLabel htmlFor="name">Nome</FormLabel>
                        <Input id="name" borderColor='green' {...register('name', {
                            required: 'This is required',
                            minLength: { value: 4, message: 'Nome deve ter mais de 4 caracteres' },
                        })} />
                    </Box>
                    <Box w="100%">
                        <FormLabel htmlFor="email">E-mail</FormLabel>
                        <Input id="email" borderColor='green' type="email" {...register('email', {
                            required: 'This is required',
                            minLength: { value: 10, message: 'Email deve ter mais de 10 caracteres' },
                        })}/>
                    </Box>
                    </HStack>
                    <HStack spacing="4">
                    <Box w="100%">
                        <FormLabel htmlFor="senha">Senha</FormLabel>
                        <Input id="senha" borderColor='green' type="password" {...register('password', {
                            required: 'This is required',
                            minLength: { value: 6, message: 'Senha deve ter mais de 6 caracteres' },
                        })}/>
                    </Box>
                    <Box w="100%">
                        <FormLabel htmlFor="sobrenome">Sobrenome</FormLabel>
                        <Input id="sobrenome" borderColor='green' {...register('sobrenome', {
                            required: 'This is required',
                            minLength: { value: 10, message: 'Sobrenome deve ter mais de 10 caracteres' },
                        })}/>
                    </Box>
                    </HStack>
                    <HStack spacing="4">
                    <Box w="100%">
                        <FormLabel>Tipo</FormLabel>
                        <RadioGroup defaultValue="Aprendiz">
                        <HStack spacing="24px">
                            <Radio value="Administrador" borderColor='green' {...register('tipo')} >Administrador</Radio>
                            <Radio value="Aprendiz" borderColor='green' {...register('tipo')}>Aprendiz</Radio>
                        </HStack>
                        </RadioGroup>
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
                        {errors.email && errors.email.message}
                    </FormErrorMessage>
                    <FormErrorMessage>
                        {errors.password && errors.password.message}
                    </FormErrorMessage>
                    <FormErrorMessage>
                        {errors.sobrenome && errors.sobrenome.message}
                    </FormErrorMessage>
                </FormControl>
            </form>
            </Center>
        </Flex>
        </Box>
    </ChakraProvider>

  );
}

export default Cadastro;