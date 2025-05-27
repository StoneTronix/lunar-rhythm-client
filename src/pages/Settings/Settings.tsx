import React from 'react';
import { motion } from 'framer-motion';

import SettingsModule from '@components/SettingsModule/SettingsModule';

import './Settings.scss';

const Settings: React.FC = () => {  
  return (    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="settings-page"
    >
      <h1 className="settings-page__title">Настройки</h1>
      <SettingsModule />
    </motion.div>
  );
};

export default Settings;