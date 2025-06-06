import React, {
  createContext,
  FC,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode
} from 'react';

import { Track } from '../utils/types';
import { Howl } from 'howler';
import { fetchTrackFile as fetchTrackFileAPI } from '../api/PlayerApi';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  duration: number;
  progress: number;
  volume: number;  
  audioRef: React.RefObject<Howl | null>;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setProgress: (value: number) => void;
  seekTo: (position: number) => void;
  setVolume: (value: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
  const savedVolume = localStorage.getItem('playerVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.7;
  });
  const audioRef = useRef<Howl | null>(null);

  const handleLoad = (sound: Howl) => {
    setDuration(sound.duration());
  };

  const handlePlay = (track: Track) => {
    setIsPlaying(true);
    setCurrentTrack(track);
  };

  const handleEnd = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handlePause = () => setIsPlaying(false);

  const createHowl = (url: string, track: Track) =>
    new Howl({
      src: [url],
      html5: true,
      volume: volume,
      onload: () => handleLoad(audioRef.current!),
      onplay: () => handlePlay(track),
      onend: handleEnd,
      onpause: handlePause
    });

  const playTrack = async (track: Track) => {
    if (audioRef.current) {
      audioRef.current.unload();
    }

    try {
      const audioUrl = await fetchTrackFileAPI(track.id);
      audioRef.current = createHowl(audioUrl, track);
      audioRef.current.play();
    } catch (error) {
      console.error('Ошибка при загрузке трека:', error);
    }
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
    localStorage.setItem('playerVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume(volume);
    }
  }, [volume]);

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

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,        
        audioRef,
        playTrack,
        togglePlay,
        setProgress,
        seekTo,
        setVolume,
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
export { PlayerContext };