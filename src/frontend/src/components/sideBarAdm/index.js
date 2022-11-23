import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarAdm = [
  {
    title: 'Início',
    path: '/inicio',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Cadastrar Usuário',
    path: '/castrarUser',
    icon: <FaIcons.FaPen />,
    cName: 'nav-text'
  },
  {
    title: 'Módulos',
    path: '/moduloAdm',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Acesso Módulos',
    path: '/Acesso',
    icon: <IoIcons.IoMdLock />,
    cName: 'nav-text'
  },
  {
    title: 'Tutoriais',
    path: '/tutoriais',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Provas',
    path: '/provas',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Corrigir Provas',
    path: '/provasCorrigir',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  }
];