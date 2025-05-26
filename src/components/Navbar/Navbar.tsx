import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { to: "/", label: "Главная" },
    { to: "/library", label: "Библиотека" },
    { to: "/playlists", label: "Плейлисты" },
    { to: "/settings", label: "Настройки" }
  ];

  const renderDesktopNav = () => (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {navLinks.map(({ to, label }) => (
        <NavLink 
          key={to}
          to={to} 
          className={({ isActive }) => isActive ? 'active' : ''}
        >
          {label}
        </NavLink>
      ))}
    </motion.nav>
  );

  const renderMobileNav = () => (
    <>
      <button 
        className={`navbar__burger ${menuOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
      >
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
        <span className="navbar__burger-line" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile__backdrop"
            onClick={closeMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.nav
              className="navbar-mobile"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {navLinks.map(({ to, label }) => (
                <NavLink 
                  key={to}
                  to={to} 
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return isMobile ? renderMobileNav() : renderDesktopNav();
};

export default Navbar;