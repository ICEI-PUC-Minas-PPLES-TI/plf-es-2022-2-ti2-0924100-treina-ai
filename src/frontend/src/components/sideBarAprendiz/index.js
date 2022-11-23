import React from 'react';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

export const SidebarAprendiz = [
  {
    title: 'Início',
    path: '/inicio',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Módulos',
    path: '/ModuloAprendiz',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Provas Aprendiz',
    path: '/provasAprendiz',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  }
];