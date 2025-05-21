import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import ProgressBar from '../ProgressBar/ProgressBar';
import './ControlBar.scss';

const PlayerBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="control-bar">
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
