import { useState, useEffect} from "react";
import {useForm} from 'react-hook-form';
import Api from '../../service/Api';
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import ProvasAdm from "../../components/ProvasAdm/Tabela";
import {
    Flex,
    Box,
    Center,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react";
import { useSearchParams } from 'react-router-dom';


function ProvaNotas() {  
    const [searchParams, setSearchParams] = useSearchParams();
    const [provas, setProvas] = useState([]);
    useEffect(() =>{
        Api.get("/Prova/ProvasCorrigir")
        .then((res) => setProvas(res.data))
        .catch((res) => console.log(res.data))
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
            Notas Provas
        </Center>
        <Flex   
            align="start"
            justify="center"
            bg="#111"
            h="calc(100vh - 150px)"
        >
            <TableContainer mt="20">
                <Table variant='striped' colorScheme='teal' bg='white'>
                    <Thead>
                    <Tr>
                        <Th>Modulo</Th>
                        <Th>Aprendiz</Th>
                        <Th>Prova Módulo</Th>
                        <Th>Prova Aluno</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {provas.map((element) =>(
                        <ProvasAdm info={element}/>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
        </Box>
    </ChakraProvider>

  );
}

export default ProvaNotas;