import { useState, useEffect } from "react";
import Api from '../../service/Api'
import Navbar from "../../components/navbar";
import { useSearchParams } from 'react-router-dom';
import {
    Tr,
    Td
  } from "@chakra-ui/react";
import { set } from "react-hook-form";
function ProvasAprendizResultado(props) {  
    const {info} = props;
    const [url, setUrl] = useState("");
    const [aprovado, setAprovado] = useState("");
    useEffect(() =>{
        setUrl(info.arquivo.url);
        if(parseInt(info.nota) < 6){
          setAprovado("Reprovado");
        } else {
          setAprovado("Aprovado");
        }
    },[])
  return (
    <Tr>
        <Td>{info.modulo}</Td>
        <Td><a href={url}> Prova Aluno</a></Td>
        <Td>{info.nota}</Td>
        <Td>{aprovado}</Td>
    </Tr>
  );
}

export default ProvasAprendizResultado;
