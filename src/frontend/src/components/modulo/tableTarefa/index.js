import * as React from 'react';
import BoxM from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as FaIcons from 'react-icons/fa';
import Api from '../../../service/Api';
import {useForm} from 'react-hook-form';
import { useDisclosure } from '@chakra-ui/react';
import ModalMudarTarefa from '../modalMudarTarefa';
function LinhaTarefa(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const {register, handleSubmit, formState: { errors, isSubmitting }, reset} = useForm();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSubmit = (data) =>{
        let criarTarefa = {
            nome: data.name,
            conteudo: data.conteudo,
            video: data.video,
            tutorialId: row.tutorial_id
        }
        Api.post(`/Tutorial/Modificar`, criarTarefa)
        .then((res) => alert(res.data))
        .catch((res) => alert(res.data))
      }

    function apagarTutorial (){
        Api.delete(`/Tutorial/Apagar?tutorialId=${row.tutorial_id}`)
        .then((res) => alert(res.data))
        .catch((res) => alert(res.data))
        console.log(row);
    }
    return (
    <React.Fragment>
        <ModalMudarTarefa isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} isSubmitting={isSubmitting}/>
        <TableRow>
        <TableCell>
            <IconButton
                aria-label="expand row"
                onClick={() => setOpen(!open)}
            >
                {open ? <FaIcons.FaArrowUp /> : <FaIcons.FaArrowDown />}
            </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            {row.nome}
        </TableCell>
        <TableCell component="th" scope="row">
            <button onClick={apagarTutorial}> <FaIcons.FaTrashAlt /> </button>
        </TableCell>
        <TableCell component="th" scope="row">
            <button onClick={onOpen}> <FaIcons.FaPen /> </button>
        </TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <BoxM sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                    {row.nome}
                </Typography>
                <BoxM
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                >
                    <span>{row.conteudo}</span>
                    <div>
                        <iframe src={row.video} frameborder="0"></iframe>
                    </div>
                </BoxM> 
                </BoxM>
            </Collapse>
        </TableCell>
        </TableRow>      
    </React.Fragment>   
    );
}

export default LinhaTarefa;
