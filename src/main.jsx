import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import AuthState from './context/AuthState';
import BoardState from './context/BoardState';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthState>
      <BoardState>
        <Router>
          <App />
        </Router>
      </BoardState>
    </AuthState>
  </React.StrictMode>
);