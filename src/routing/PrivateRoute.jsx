import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authContext from '../context/authContext';

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useContext(authContext);

  if (loading) return <p>Loading...</p>; // Or a spinner component

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;