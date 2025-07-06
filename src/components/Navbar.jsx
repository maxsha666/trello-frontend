import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../context/authContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(authContext);

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <a onClick={logout} href="/login">
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li><Link to="/register">Sign Up</Link></li>
      <li><Link to="/login">Login</Link></li>
    </Fragment>
  );

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', background: '#333', color: '#fff', padding: '1rem' }}>
      <h1>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Trello Clone</Link>
      </h1>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', alignItems: 'center', margin: 0 }}>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

export default Navbar;