import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import ModalProva from "../Modal";
import {
    Tr,
    Td,
    Button
  } from "@chakra-ui/react";
import Api from '../../../service/Api'
import { set } from "react-hook-form";
import {useForm} from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react'
function ProvasAdm(props) {  
    const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {info} = props;
    const [urlAdm, setUrlAdm] = useState("");
    const [urlAprendiz, setUrlAprendiz] = useState("");
    useEffect(() =>{
        setUrlAdm(info.arquivoOriginal.url);
        setUrlAprendiz(info.arquivoAluno.url);
    },[])
    const onSubmit = (data) =>{
      if(data.nota > 10 || data.nota < 0){
        alert("Aceita valores no intervalo 0 a 10");
        return 0;
      }
      let colocarNota = {
        usuId: data.usuario,
        provaId: data.prova,
        nota: data.nota
      }
      Api.post('Prova/ProvasNota', colocarNota)
      .then((res) => {
          alert(res.data)
          if(res.status === 200){
              onClose();
          }
      })
  
    }
  return (
    <Tr>
        <ModalProva isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} isSubmitting={isSubmitting} dados={info}/>
        <Td>{info.modulo}</Td>
        <Td>{info.usuNome}</Td>
        <Td><a href={urlAdm}> Prova Original</a></Td>
        <Td><a href={urlAprendiz}> Prova Aprendiz</a></Td>
        <Button onClick={onOpen}>Dar Nota</Button>
    </Tr>
  );
}

export default ProvasAdm;