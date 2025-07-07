import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Muestra un mensaje o spinner mientras se verifica la autenticación
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Si no está autenticado, redirige a la página de login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, muestra el componente solicitado
  return children;
};

export default PrivateRoute;