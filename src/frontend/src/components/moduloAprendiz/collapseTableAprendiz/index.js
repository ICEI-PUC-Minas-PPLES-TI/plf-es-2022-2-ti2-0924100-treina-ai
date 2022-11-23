import * as React from 'react';
import { useState, useEffect} from "react";
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
import TableModuloAprendiz from '../tableModuloAprendiz';
import Paper from '@mui/material/Paper';
import Api from '../../../service/Api';
import { useSearchParams } from 'react-router-dom';
function CollapsibleTableAprendiz() {
  const [modulos, setModulos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() =>{
    const pegarModulos = async () =>{
        let req = await Api.post(`Modulo/Aprendiz?cliente=${searchParams.get("cliente")}`);
        let res = await req.data;
        setModulos(res);
    }
    pegarModulos();
  },[])
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Módulos</TableCell>
              <TableCell align="right">Numero Tarefas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {modulos.map((row) => (
            <TableModuloAprendiz key={row.nome} row={row} />
          ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default CollapsibleTableAprendiz;