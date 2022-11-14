import { useState, useEffect } from "react";
import Api from '../../service/Api'
import "./style.css";
import Navbar from "../../components/navbar";
import { useSearchParams } from 'react-router-dom';

function InicioAdm() {  
  const [nome, setNome] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  function setNomeUsuario (userName){
    setNome(userName);
  }
  useEffect(() => {
    const fetchData = async () => {
      let dataUsuario = await Api.get(`Usuario/userId?cliente=${searchParams.get("cliente")}`);
      let result = await dataUsuario.data[0];
      setNomeUsuario(result.nome);
    }
    fetchData();
  }, [searchParams]);
  return (
    <div className="container">
        <Navbar/>
        <div className="container-bem-vindo">
            <h1>Bem vindo {nome}</h1>
        </div>
    </div>
  );
}

export default InicioAdm;