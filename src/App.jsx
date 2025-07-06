import React, { useEffect, useContext, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import BoardPage from './pages/BoardPage';
import PrivateRoute from './routing/PrivateRoute';
import authContext from './context/authContext';

const App = () => {
  const { loadUser, token } = useContext(authContext);

  // Este useEffect ahora tiene una dependencia: [token]
  // Se ejecutará una vez al cargar la app Y CADA VEZ que el token cambie.
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [token]);

  return (
    <Fragment>
      <Navbar />
      <div className="container" style={{padding: '0 1rem'}}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/board/:boardId" element={<BoardPage />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;