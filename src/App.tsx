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
import CadastroPost from './components/postagens/cadastroPost/CadastroPost';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>

          <Route path='/' element={<Login />} />

          <Route path='/home' element={<Home />} />

          <Route path='/login' element={<Login />} />

          <Route path='/cadastrousuario' element={<CadastroUsuario />} />

          <Route path='/temas' element={< ListaTema />} />

          <Route path='/posts' element={<ListaPostagem />} />

          <Route path="/formularioPostagem" element={<CadastroPost />} />

          <Route path="/formularioPostagem/:id" element={<CadastroPost />} />

          <Route path="/formularioTema" element={<CadastroTema />} />

          <Route path="/formularioTema/:id" element={<CadastroTema />} />

          <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />

          <Route path="/deletarTema/:id" element={<DeletarTema />} />

        </Routes>
        < Footer />
      </Router>
    </Provider>
  );
}

export default App;
