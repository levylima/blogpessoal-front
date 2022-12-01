import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/estaticos/navbar/Navbar'
import { Footer } from './components/estaticos/footer/Footer';
import { CadastroUsuario } from './paginas/cadastroUsuario/CadastroUsuario';
import { Home } from './paginas/home/Home';
import { Login } from './paginas/login/Login';
import { height, minHeight } from '@mui/system';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}>
          <Login />
        </Route>
        <Route path='/login' element={<Login />}>
          <Login />
        </Route>
        <Route path='/home' element={<Home />}>
          <Home />
        </Route>
        <Route path='/cadastrousuario' element={<CadastroUsuario />}>
          <CadastroUsuario />
        </Route>
      </Routes>
      < Footer />
    </Router>
  );
}

export default App;
