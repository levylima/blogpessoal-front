import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/estaticos/navbar/Navbar'
import { Footer } from './components/estaticos/footer/Footer';
import { CadastroUsuario } from './paginas/cadastroUsuario/CadastroUsuario';
import { Login } from './paginas/login/Login';
import { height, minHeight } from '@mui/system';
import Home from './paginas/home/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />

        <Route path='/login' element={<Login />} />

        <Route path='/home' element={<Home />} />

        <Route path='/cadastrousuario' element={<CadastroUsuario />} />

      </Routes>
      < Footer />
    </Router>
  );
}

export default App;
