import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Track, Playlist } from '../types';
import { Howl } from 'howler';

interface PlayerContextType {
  currentTrack: Track | null;
  
  isPlaying: boolean;
  progress: number;
  playTrack: (track: Track) => void;  // Загрузка трека с сервера
  pause: () => void;                  // Пауза текущего трека
  togglePlay: () => void;             // Логика переключателя паузы
  setCurrentTrack: (track: Track | null) => void;
  setProgress: (value: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<Howl | null>(null);

  const playTrack = (track: Track) => {
    if (audioRef.current) {
      audioRef.current.unload();
    }

    const sound = new Howl({
      src: [`http://localhost:4000/music/${track.id}.wav`],
      html5: true,      
      onend: () => {  // По окончании воспроизведения
        setIsPlaying(false)
        setProgress(0);        
      },
    });

    audioRef.current = sound;
    setCurrentTrack(track);
    sound.play();
    setIsPlaying(true);
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pause();
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

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
        progress,
        playTrack,
        pause,
        togglePlay,
        setCurrentTrack,
        setProgress        
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
