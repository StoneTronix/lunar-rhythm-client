import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Track, Playlist } from '../types';
import { Howl } from 'howler';

interface PlayerContextType {
  audioRef: React.RefObject<Howl | null>;
  currentTrack: Track | null;  
  isPlaying: boolean;
  progress: number;
  playlists: Playlist[];

  togglePlay: () => void;  
  setCurrentTrack: (track: Track | null) => void;
  setProgress: (value: number) => void;
  
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const audioRef = useRef<Howl | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(prev => !prev);
  };

  // Обновление прогресса
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        const seek = audioRef.current.seek();
        if (typeof seek === 'number') {
          setProgress(seek);
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        setCurrentTrack,
        togglePlay,
        audioRef,
        progress,
        setProgress,
        playlists,
        setPlaylists
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};