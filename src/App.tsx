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
          <div style={{minHeight: '100vh'}}>
            <Route path='/'>
              <Login />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/cadastrousuario'>
              <CadastroUsuario />
            </Route>
          </div>
        </Routes>
      < Footer />
    </Router>
  );
}

export default App;
