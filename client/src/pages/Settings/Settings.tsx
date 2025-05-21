import React from 'react';
import { motion } from 'framer-motion';
import './Settings.module.scss';

import { useTheme } from '../../contexts/ThemeContext';

const Settings: React.FC = () => {
  const { theme, accent, setTheme, setAccent } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="settings-page"
    >
      <h1>Настройки</h1>
      <div>
        <h3>Theme</h3>
        <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <h3>Accent Color</h3>
        <select value={accent} onChange={(e) => setAccent(e.target.value as any)}>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="red">Red</option>
          <option value="purple">Purple</option>
        </select>
      </div>
    </motion.div>
  );
};

export default Settings;