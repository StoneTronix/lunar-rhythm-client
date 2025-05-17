import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { Track } from '../utils/types';
import { Howl } from 'howler';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  duration: number;
  progress: number;  
  audioRef: React.RefObject<Howl | null>;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setProgress: (value: number) => void;
  seekTo: (position: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<Howl | null>(null);

  const playTrack = (track: Track) => {
    // Остановить текущее воспроизведение, если есть
    if (audioRef.current) {
      audioRef.current.unload();
    }

    const sound = new Howl({
      src: [`http://localhost:4000/playlists/track/${track.id}`],
      html5: true,
      onload: () => {
        setDuration(sound.duration());
      },
      onplay: () => {
        setIsPlaying(true);
        setCurrentTrack(track);
      },
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
      },
      onpause: () => setIsPlaying(false)
    });

    audioRef.current = sound;
    sound.play();
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const seekTo = (position: number) => {
    if (audioRef.current) {
      audioRef.current.seek(position);
      setProgress(position);
    }
  };

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      if (audioRef.current && isPlaying) {
        const seek = audioRef.current.seek();
        if (typeof seek === 'number') {
          setProgress(seek);
        }
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updateProgress);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        audioRef,
        playTrack,
        togglePlay,
        setProgress,
        seekTo
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