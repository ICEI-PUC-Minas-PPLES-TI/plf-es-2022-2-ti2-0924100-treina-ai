import * as React from 'react';
import BoxM from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as FaIcons from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import api from '../../../service/Api';
import { Checkbox, Stack } from "@chakra-ui/react";
function LinhaTarefa(props) {
    const [feito, setFeito] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    React.useEffect(() =>{
        const conferirTurialVisto = () =>{
            let tutorialVizualizado = {
                usuId: searchParams.get("cliente"),
                tutorialId: props.row.tutorial_id
              } 
            api.post('/TutorialVisto/Verificar', tutorialVizualizado)
            .then((res) => setFeito(true))
            .catch((res) => setFeito(false))

        }
        conferirTurialVisto()
    }, [])
    const toggleFeito = async () => {
      let tutorialVizualizado = {
        usuId: searchParams.get("cliente"),
        tutorialId: props.row.tutorial_id
      } 

      let fazerReq = await api.post('/TutorialVisto/Cadastrar', tutorialVizualizado);
      let verResposta = await fazerReq.data;
      await alert(verResposta);
      await setFeito(!feito);
      
    };
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
    <React.Fragment>
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
                        <Stack spacing={[1, 5]} direction={['column', 'row']} bg='tomato'>
                            <Checkbox
                                colorScheme='green'
                                isChecked={feito}
                                onChange={(e) => toggleFeito()}
                            >
                                Vizualizado
                            </Checkbox>
                        </Stack>

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