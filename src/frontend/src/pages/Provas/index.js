import { useState, useEffect} from "react";
import {useForm} from 'react-hook-form';
import Api from '../../service/Api'
import "./style.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import FileUpload from "../../components/FileUpload";
import axios from 'axios';
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
  const [modulos, setModulos] = useState([]);
  useEffect(() =>{
    const pegarModulos = async () =>{
        let moduloReq = await Api.get('Modulo');
        let moduloRes = await moduloReq.data;
        setModulos(moduloRes);
    }
    pegarModulos();
  },[])
  
  const onSubmit = (data) =>{
    let formData = new FormData();
    formData.append("modulo", data.modulo);
    formData.append("file", data.tipo[0]);
    const headers = {
        "Content-Type": "multipart/form-data"
    };
    Api.post("/Prova", formData, headers)
    .then((res) => {
    alert(res.data);
    })
    .catch((err) => alert("File Upload Error"));

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
                <FormControl display="flex" flexDir="column" gap="4">
                    <HStack spacing="4">
                        <Box w="100%" align="center">
                            <h1>Criar Prova</h1>
                        </Box>
                    </HStack>
                    <HStack spacing="4">
                        <FormLabel htmlFor="senha">Arquivo</FormLabel>
                        <FileUpload register={register}/>
                    </HStack>
                    <HStack spacing="4">
                        <Box w="100%">
                            <FormLabel>Módulo</FormLabel>
                            <RadioGroup defaultValue="Aprendiz">
                            <HStack spacing="24px" wrap="wrap">
                                {modulos.map((element)=>(
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
                </FormControl>
            </form>
            </Center>
        </Flex>
        </Box>
    </ChakraProvider>

  );
}

export default Cadastro;