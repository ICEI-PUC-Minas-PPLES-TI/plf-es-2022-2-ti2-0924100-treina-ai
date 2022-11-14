import { useState, useEffect} from "react";
import {useForm} from 'react-hook-form';
import Api from '../../service/Api';
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
    Textarea
  } from "@chakra-ui/react";

function CadastroTarefa() {  
  const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();
  const [modulo, setModulo] = useState([]);
  const onSubmit = (data) =>{
    let criarTarefa = {
        nome: data.name,
        conteudo: data.conteudo,
        video: data.video,
        modulo: data.modulo
    }
    Api.post("/Tutorial", criarTarefa)
    .then((res) => alert(res.data))
  }

  useEffect(()=>{
    const pegarModulos = async () =>{
        let reqMod = await Api.get("/Modulo");
        let modulos = await reqMod.data;
        setModulo(modulos);
    }
    pegarModulos();
    
  },[])
  
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
                        })}/>
                    </Box>
                    </HStack>
                    <HStack spacing="4">
                    <Box w="100%">
                        <FormLabel htmlFor="video">video</FormLabel>
                        <Input placeholder="https://www.youtube.com/embed/2LvNRMJ1s3Y" id="video" borderColor='green' {...register('video', {
                            required: 'This is required',
                            minLength: { value: 6, message: 'video deve ter mais de 6 caracteres' },
                        })}/>
                    </Box>
                    </HStack>
                    <HStack spacing="4">
                    <Box w="100%">
                        <FormLabel>Módulo</FormLabel>
                        <RadioGroup defaultValue="Aprendiz">
                        <HStack spacing="24px" wrap="wrap">
                            {modulo.map((element)=>(
                                <Radio value={element.modulo_id.toString()} borderColor='green' {...register('modulo')} >{element.nome}</Radio>
                            ))}
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
                        {errors.conteudo && errors.conteudo.message}
                    </FormErrorMessage>
                    <FormErrorMessage>
                        {errors.video && errors.video.message}
                    </FormErrorMessage>
                </FormControl>
            </form>
            </Center>
        </Flex>
        </Box>
    </ChakraProvider>

  );
}

export default CadastroTarefa;