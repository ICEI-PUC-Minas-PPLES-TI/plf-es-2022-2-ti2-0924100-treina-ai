import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Inicio from './pages/Inicio'
import Cadastro from './pages/cadastro'
import Modulo from './pages/modulo'
import Acesso from './pages/Acesso'
import Tutoriais from './pages/tutoriais'
import ModuloAprendiz from './pages/ModuloAprendiz'
import Provas from './pages/Provas'

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/inicio" exact element={<Inicio/>} />
            <Route path="/castrarUser" exact element={<Cadastro/>} />
            <Route path="/ModuloAdm" exact element={<Modulo/>} />
            <Route path="/ModuloAprendiz" exact element={<ModuloAprendiz/>} />
            <Route path="/acesso" exact element={<Acesso/>} />
            <Route path="/tutoriais" exact element={<Tutoriais/>} />
            <Route path="/provas" exact element={<Provas/>} />
      </Routes>
    </Router>
  )
}