import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Главная</NavLink>
      <NavLink to="/library" className={({ isActive }) => isActive ? 'active' : ''}>Библиотека</NavLink>
      <NavLink to="/playlists" className={({ isActive }) => isActive ? 'active' : ''}>Плейлисты</NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Настройки</NavLink>
    </motion.nav>
  );
};

export default Navbar;