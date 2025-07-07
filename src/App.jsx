import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; // Asumo que tienes un Navbar
import Dashboard from './pages/Dashboard';
import BoardPage from './pages/BoardPage';
import Login from './pages/Login';
import Register from './pages/Register';

import AuthState from './context/auth/AuthState';
import BoardState from './context/board/BoardState'; // <-- IMPORTAMOS
import PrivateRoute from './components/routing/PrivateRoute'; // Asumo que tienes una ruta privada

import './App.css';

function App() {
  return (
    <AuthState>
      <BoardState> {/* <-- ENVOLVEMOS LA APP */}
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/board/:boardId" element={<PrivateRoute><BoardPage /></PrivateRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </BoardState>
    </AuthState>
  );
}

export default App;