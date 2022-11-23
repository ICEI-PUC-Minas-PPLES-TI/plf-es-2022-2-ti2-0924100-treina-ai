import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link, useSearchParams } from 'react-router-dom';
import { SidebarAdm } from '../sideBarAdm';
import {SidebarAprendiz} from '../sideBarAprendiz'
import Api from '../../service/Api';
import './style.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [tipoClient, setTipoClient] = useState(2);
  const [cliente, setCliente] = useState();
  const showSidebar = () => setSidebar(!sidebar);
  const [searchParams, setSearchParams] = useSearchParams();

  function setTipo(tipo){
    setTipoClient(tipo);
  }
  useEffect(() => {
    const fetchData = async () => {
      let dataUsuario = await Api.get(`Usuario/userId?cliente=${searchParams.get("cliente")}`);
      let result = await dataUsuario.data[0];
      setTipo(result.tipo);
      setCliente(result.usu_id);
    }
    fetchData();
  }, [searchParams]);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-space'>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <div className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </div>
              </li>
              { tipoClient === 1 ?(
                SidebarAdm.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={`${item.path}?cliente=${cliente}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              ) :(
                SidebarAprendiz.map((item, index) => {
                  
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={`${item.path}?cliente=${cliente}`}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
              )

              }
                          
            
            </ul>
            <ul>
              <li key={SidebarAprendiz.length} className='nav-text'>
                      <Link to="/">
                        <IoIcons.IoMdLogOut />
                        <span>Deslogar</span>
                      </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;