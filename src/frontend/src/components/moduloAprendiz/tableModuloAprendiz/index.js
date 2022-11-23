import * as React from 'react';
import BoxM from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import * as FaIcons from 'react-icons/fa';
import TabelaTarefaAprendiz from '../tableTarefaAprendiz'
import { useState, useEffect} from "react";
import Api from '../../../service/Api';
import FileUpload from '../../FileUpload';
import {useForm} from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {Button} from "@chakra-ui/react";
function LinhaModulo(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [openProva, setOpenProva] = React.useState(false);
    const [tutoriais, setTutoriais] = useState([]);
    const [url, setUrl] = useState();
    const [nomeProva, setNomeProva] = useState();
    const [prova, setProva] = useState(false);
    const [tarefasFeitas, setTarefasFeitas] = useState('0');
    const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();


    const onSubmit = (data) =>{
        if(prova == false){
            alert("Nao possui prova !!!");
            return false;
        } 

        let formData = new FormData();
        formData.append("provaId", prova.id);
        formData.append("file", data.tipo[0]);
        formData.append("usuId", searchParams.get("cliente"));
        const headers = {
            "Content-Type": "multipart/form-data"
        };
        Api.post("/Prova/EntregarProva", formData, headers)
        .then((res) => {
        alert(res.data);
        })
        .catch((err) => alert("File Upload Error"));
    
    }

    useEffect(() =>{
        
        let criarTarefa = {
            modulo: row.modulo_id
        }
        const pegarTarefas = async () =>{
            let req = await Api.post("Tutorial/Modulo", criarTarefa);
            let res = await req.data;
            setTutoriais(res);
        }

        const pegarTutoriaisVizualizados = ()=>{
            
            let verificarTarefasQueExistemNosModulos = {
                moduloId: row.modulo_id,
                usuId: searchParams.get("cliente")
            }
            Api.post('TutorialVisto/Modulo',verificarTarefasQueExistemNosModulos)
            .then((res) => setTarefasFeitas(res.data[0].qtde))
            .catch((res) => setTarefasFeitas('0'))

        }

        const pegarProva = async () =>{
            Api.post(`Prova/Prova?modulo=${row.modulo_id}`)
            .then((res) => {
                setNomeProva(res.data.nome);
                setProva(res.data);
                setUrl(res.data.arquivo.url);
            })
            .catch((res) => setNomeProva("Sem Prova"));
        }
        
        pegarTarefas();
        pegarTutoriaisVizualizados();
        pegarProva();
      },[])
    return (
    <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <FaIcons.FaArrowUp /> : <FaIcons.FaArrowDown />}
            </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            {row.nome} / tutoriais vistos {tarefasFeitas} de {row.numtarefa}
        </TableCell>
        <TableCell align="right">{row.numtarefa}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <BoxM sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align='left'>Tarefas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tutoriais.map((rowAux) => (
                                <TabelaTarefaAprendiz key={rowAux.nome} row={rowAux}/>
                            ))}
                                    <TableRow>
                            <TableCell>
                                <IconButton
                                    aria-label="expand row"
                                    onClick={() => setOpenProva(!openProva)}
                                >
                                    {openProva ? <FaIcons.FaArrowUp /> : <FaIcons.FaArrowDown />}
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                Prova
                            </TableCell>
                            </TableRow>
                            <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={openProva} timeout="auto" unmountOnExit>
                                    <BoxM
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}
                                    >
                                        <a href={url} download="Prova.docx">{nomeProva}</a>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <h1>Entregar a prova</h1>
                                            <FileUpload register={register}/>
                                            <Button
                                                w={240}
                                                p="6"
                                                type="submit"
                                                bg="teal.600"
                                                color="green"
                                                fontWeight="bold"
                                                fontSize="xl"
                                                mt="2"
                                                _hover={{ bg: "teal.800" }}
                                                isLoading={isSubmitting}  
                                            >
                                                Enviar
                                            </Button>
                                        </form>
                                        
                                    </BoxM> 
                                </Collapse>
                            </TableCell>
                            </TableRow>     
                        </TableBody>
                    </Table>
                </TableContainer>
                </Typography>
                </BoxM>
            </Collapse>
        </TableCell>
        </TableRow>      
    </React.Fragment>   
    );
}

export default LinhaModulo;