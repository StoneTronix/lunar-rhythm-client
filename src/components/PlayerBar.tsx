import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import '../styles/PlayerBar.scss';
import ProgressBar from './ProgressBar';

export const PlayerBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay, progress } = usePlayer();

  if (!currentTrack) return null;

  const duration = currentTrack.duration;

  return (
    <div className="player-bar">
      <div className="track-info">
        <strong>{currentTrack.title}</strong> — {currentTrack.artist}
      </div>
      <ProgressBar />      
      <button onClick={togglePlay}>
        {isPlaying ? '⏸' : '▶️'}
      </button>
    </div>
  );
};
