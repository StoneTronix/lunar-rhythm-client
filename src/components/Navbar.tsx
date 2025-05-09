import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Главная</NavLink>
      <NavLink to="/library" className={({ isActive }) => isActive ? 'active' : ''}>Библиотека</NavLink>
      <NavLink to="/playlists" className={({ isActive }) => isActive ? 'active' : ''}>Плейлисты</NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Настройки</NavLink>
    </nav>
  );
};

export default Navbar;