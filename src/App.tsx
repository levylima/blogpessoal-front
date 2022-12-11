import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/estaticos/navbar/Navbar'
import { Footer } from './components/estaticos/footer/Footer';
import { CadastroUsuario } from './paginas/cadastroUsuario/CadastroUsuario';
import { Login } from './paginas/login/Login';
import Home from './paginas/home/Home';
import ListaTema from './components/temas/listatema/ListaTema';
import ListaPostagem from './components/postagens/listapostagem/ListaPostagem';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path='/' element={<Login />} />

        <Route path='/home' element={<Home />} />

        <Route path='/login' element={<Login />} />

        <Route path='/cadastrousuario' element={<CadastroUsuario />} />

        <Route path='/temas' element={< ListaTema />} />

        <Route path='/posts' element={<ListaPostagem />} />

      </Routes>
      < Footer />
    </Router>
    
  );
}

export default App;
