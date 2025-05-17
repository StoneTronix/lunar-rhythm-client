import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Accent = 'blue' | 'green' | 'red' | 'purple';

interface ThemeSettings {
  theme: Theme;
  accent: Accent;
}

interface ThemeContextProps extends ThemeSettings {
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  resetSettings: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const STORAGE_KEY = 'themeSettings';

const defaultSettings: ThemeSettings = {
  theme: 'light',
  accent: 'blue',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', settings.theme);
    root.setAttribute('data-accent', settings.accent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const setTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const setAccent = (accent: Accent) => {
    setSettings(prev => ({ ...prev, accent }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ThemeContext.Provider value={{ ...settings, setTheme, setAccent, resetSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
