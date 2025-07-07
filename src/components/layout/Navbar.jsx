import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BoardContext from '../../context/board/boardContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user } = authContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Sign Up</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
            <h1>
                <Link to="/">Trello Clone</Link>
            </h1>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
    );
};

export default Navbar;