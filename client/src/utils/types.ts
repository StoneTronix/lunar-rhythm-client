export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number; // в секундах
}

export interface Playlist {
  id: string;
  title: string;
  tracks: Track[];  
}

export interface PlaylistCheckbox extends Playlist {
  checked: boolean;
}

export type Theme = 'light' | 'dark' | 'system';

export const accentColorMap = {
  primary: '#3f51b5',
  secondary: '#ff5722',
  success: '#4caf50',
  purple: '#9c27b0',
  custom: '#ff00ff'
} as const;

export type AccentColor = keyof typeof accentColorMap;

export interface ThemeSettings {
  theme: Theme;
  accentColor: AccentColor;
}