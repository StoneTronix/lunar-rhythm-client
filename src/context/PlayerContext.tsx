import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Track } from '../types';
import { Howl } from 'howler';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  setCurrentTrack: (track: Track | null) => void;
  togglePlay: () => void;
  audioRef: React.RefObject<Howl | null>;
  progress: number;
  setProgress: (value: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
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
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && audioRef.current) {
      interval = setInterval(() => {
        setProgress(audioRef.current?.seek() as number);
      }, 500);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
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
