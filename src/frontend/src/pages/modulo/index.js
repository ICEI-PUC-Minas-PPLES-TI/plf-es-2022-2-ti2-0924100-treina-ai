import { useState, useEffect} from "react";
import {useForm} from 'react-hook-form';
import Api from '../../service/Api'
import "./style.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import { useDisclosure } from '@chakra-ui/react'
import BoxM from '@mui/material/Box';
import {
    Flex,
    Box,
    Center,
    Button,
  } from "@chakra-ui/react";
import ModalModulo from '../../components/modulo/modal'
import CollapseTable from '../../components/modulo/collapseTable'

function Modulo() {  
  const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = (data) =>{
    let criarUsuario = {
        nome: data.name
    }
    Api.post('modulo/Cadastrar', criarUsuario)
    .then((res) => {
        alert(res.data)
        if(res.status === 200){
            reset();
        }
    })

  }

  return (
    <div className="container">
        <Navbar/>
        <ChakraProvider>
            <Box>
            <Flex
                align="center"
                justify="center"
                bg="#111"
                h="50px"
            >
                <Center
                w="40%"
                bg="white"
                borderRadius={5}
                pt="3"
                pb="3"
                boxShadow="0 1px 2px #ccc"
                >
                <Button onClick={onOpen}>Cadastrar Módulo</Button>
                <ModalModulo isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} isSubmitting={isSubmitting}/>
                <div>
                    
                </div>
                </Center>
            </Flex>
            </Box>
            <div>          
            </div>
        </ChakraProvider>
        <div className="tabela">
            <BoxM
            sx={{
                width: 1300,
            }}
            >
                <CollapseTable/>
            </BoxM>
        </div>
    </div>
  );
}

export default Modulo;