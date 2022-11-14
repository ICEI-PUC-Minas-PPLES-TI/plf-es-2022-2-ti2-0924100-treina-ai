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
    FormLabel,
    HStack,
    Button,
    FormErrorMessage,
    Select,
    Checkbox
  } from "@chakra-ui/react";

function Acesso() {  
  const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();
  const [usuario, setUsuario] = useState([]);
  const [modulo, setModulo] = useState([]);
  const [acesso, setAcesso] = useState([]);
  const [valor, setValor] = useState(localStorage.getItem("id"));

  function setUsuarioArray(array){
    setUsuario(array);
  }
  async function acessos(e){
    setValor(e.target.value);
    localStorage.setItem('id', e.target.value);
    let AcessoReq = await Api.get(`Acessomodulo/usuario?aprendiz=${e.target.value}`);
    let AcessoRes = await AcessoReq.data;
    let arrayIds = new Array();
    AcessoRes.forEach(element => {
        arrayIds.push(element.modulo_id);
    });
    localStorage.setItem('acessos', arrayIds.join(","));
    
    window.location.reload(false);
 }
  useEffect(()=>{
    const pegarClientes = async () =>{
        let usuariosAprendizReq = await Api.get('Usuario');
        let usuariosAprendizRes = await usuariosAprendizReq.data;
        setUsuarioArray(usuariosAprendizRes);
    }
    const pegarModulos = async () =>{
        let moduloReq = await Api.get('Modulo');
        let moduloRes = await moduloReq.data;
        setModulo(moduloRes);
    }
    pegarClientes();
    pegarModulos();
  },[])

  const onSubmit = (data) =>{
    let criarUsuario = {
        usuId: (data.id === '')? localStorage.getItem("id"): data.id,
        moduloId: data.tipo.join(",")
    }
    Api.post('AcessoModulo/Cadastrar', criarUsuario)
    .then((res) => {
        alert(res.data)

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
                <FormControl display="flex" flexDir="column" gap="4" isInvalid={errors.id}>
                    <HStack spacing="4">
                    <Box w="100%">
                        <FormLabel htmlFor="id">Nome</FormLabel>
                        <Select placeholder='Select option' value={valor} {...register('id')} onChange={(e) => acessos(e)}>
                            {usuario.map((element)=>(
                                <option value={element.usu_id}>{element.nome}</option>
                            ))}
                        </Select>
                    </Box>
                    </HStack>
                    <HStack spacing="4">
                    <Box w="100%">
                        <FormLabel>Tipo</FormLabel>
                        <HStack spacing="24px" wrap="wrap">
                            {modulo.map((element) =>{
                                let acessos = localStorage.getItem("acessos");
                                if(acessos != null){
                                    if(localStorage.getItem("acessos").split(",").includes(element.modulo_id.toString())){
                                        return <Checkbox  defaultChecked={true} value={element.modulo_id} borderColor='green' {...register('tipo')} >{element.nome}</Checkbox>;
                                    } else {
                                        return <Checkbox value={element.modulo_id} borderColor='green' {...register('tipo')} >{element.nome}</Checkbox>;
                                    }
                                } else {
                                    return <Checkbox value={element.modulo_id} borderColor='green' {...register('tipo')} >{element.nome}</Checkbox>;
                                }
                            })}
                        </HStack>
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
                        {errors.id && errors.id.message}
                    </FormErrorMessage>
                </FormControl>
            </form>
            </Center>
        </Flex>
        </Box>
    </ChakraProvider>

  );
}

export default Acesso;