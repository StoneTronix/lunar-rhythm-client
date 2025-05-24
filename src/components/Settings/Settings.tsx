import React from 'react';

import { useTheme } from '@contexts/ThemeContext';

import './Settings.module.scss';

const SettingsModule = () => {
  const { theme, accent, setTheme, setAccent } = useTheme();
  return (      
    <div>
      <div className=''>
        <h2>О приложении</h2>
        <p className=''>Lunar Rhytm</p>
        <p className=''>v. 1.0.0</p>
        <p>© StoneTronix, 2025 г.</p>
        <p>Подготовлено для курсовой работы</p>
      </div>
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
  );
};

export default SettingsModule;
