import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { AccentColor, Theme } from '../utils/types';
import '../styles/Settings.scss';

const Settings: React.FC = () => {
  const { theme, accentColor, setTheme, setAccentColor } = useTheme();
  const accentColorOptions: AccentColor[] = ['primary', 'secondary', 'success', 'purple', 'custom'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="settings-page"
    >
      <h1>Настройки</h1>
      
      <div className="settings-section">
        <h2>Тема</h2>
        <div className="theme-options">
          {(['light', 'dark', 'system'] as Theme[]).map((t) => (
            <button
              key={t}
              className={`theme-btn ${theme === t ? 'active' : ''}`}
              onClick={() => setTheme(t)}
              data-theme={t}
            >
              {t === 'light' && 'Светлая'}
              {t === 'dark' && 'Тёмная'}
              {t === 'system' && 'Системная'}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h2>Цвет акцентов</h2>
        <div className="color-options">
          {accentColorOptions.map((colorKey) => (
            <button
              key={colorKey}
              className={`color-btn ${accentColor === colorKey ? 'active' : ''}`}
              style={{ 
                '--btn-color': `var(--color-${colorKey})`,
              } as React.CSSProperties}
              onClick={() => setAccentColor(colorKey)}
              aria-label={`Цвет ${colorKey}`}
            />
          ))}
        </div>
      </div>

      <div className="progress-preview">
        <div className="progress-bar">
          <div 
            className="progress-thumb" 
            style={{ width: '50%' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;