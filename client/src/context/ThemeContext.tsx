import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, AccentColor, ThemeSettings } from '../utils/types';
import { accentColorMap } from '../utils/types';

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('themeSettings');
    return saved ? JSON.parse(saved) : { 
      theme: 'system', 
      accentColor: 'primary'
    };
  });

  const setTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const setAccentColor = (accentColor: AccentColor) => {
    setSettings(prev => ({ ...prev, accentColor }));
  };

  useEffect(() => {
    localStorage.setItem('themeSettings', JSON.stringify(settings));
    
    const root = document.documentElement;
    const isDark = settings.theme === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : settings.theme === 'dark';
    
    root.classList.toggle('dark-theme', isDark);
    root.style.setProperty('--accent-color', accentColorMap[settings.accentColor]);
  }, [settings]);

  return (
    <ThemeContext.Provider value={{
      theme: settings.theme,
      accentColor: settings.accentColor,
      setTheme,
      setAccentColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};