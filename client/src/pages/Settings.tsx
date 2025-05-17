import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Settings.scss';

const Settings: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="settings-page"
    >
      <h1>Настройки</h1>
    </motion.div>
  );
};

export default Settings;