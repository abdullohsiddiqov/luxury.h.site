import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const Navbar: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn() ? (
          <>
            <li>Hello, {user?.username}!</li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>
              <Link to="/home-create">add home</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
