import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import '../styles/ProgressBar.scss';

const ProgressBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, setCurrentTrack } = usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(event.target.value);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && progressRef.current) {
      progressRef.current.value = audioRef.current.currentTime.toString();
    }
  };

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="progress-bar">
      <audio
        ref={audioRef}
        src={`http://localhost:4000/music/${currentTrack.id}`} // Эндпоинт для конвертации
        onTimeUpdate={handleTimeUpdate}
        preload="auto"
      />
      <div>
        <span>{Math.floor(audioRef.current?.currentTime || 0)}</span> /{' '}
        <span>{Math.floor(currentTrack.duration)}</span>
      </div>
      <input
        type="range"
        ref={progressRef}
        value={audioRef.current?.currentTime || 0}
        max={currentTrack.duration}
        onChange={handleProgressChange}
      />
    </div>
  );
};

export default ProgressBar;
