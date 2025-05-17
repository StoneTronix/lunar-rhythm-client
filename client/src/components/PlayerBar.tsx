import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import ProgressBar from './ProgressBar';
import '../styles/PlayerBar.scss';

const PlayerBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();

  if (!currentTrack) return null;

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

export default PlayerBar;
