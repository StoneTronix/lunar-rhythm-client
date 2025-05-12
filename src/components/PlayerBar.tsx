import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import '../styles/PlayerBar.scss';

const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const PlayerBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, progress } = usePlayer();

  if (!currentTrack) return null;

  const duration = currentTrack.duration;

  return (
    <div className="player-bar">
      <div className="track-info">
        <strong>{currentTrack.title}</strong> — {currentTrack.artist}
      </div>
      <div className="progress">
        <span>{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          readOnly
        />
        <span>{formatTime(duration)}</span>
      </div>
      <button onClick={togglePlay}>
        {isPlaying ? '⏸' : '▶️'}
      </button>
    </div>
  );
};
