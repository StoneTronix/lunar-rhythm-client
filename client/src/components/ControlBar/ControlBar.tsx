import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import ProgressBar from '../ProgressBar/ProgressBar';
import './ControlBar.scss';

const PlayerBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="control-bar">
      <div className="control-bar__title">
        {currentTrack.title}
      </div>
      <div className="control-bar__artist">
        {currentTrack.artist}
      </div>
      <ProgressBar />      
      <button className='control-bar__button' onClick={togglePlay}>
        {isPlaying ? '⏸' : '▶️'}
      </button>
    </div>
  );
};

export default PlayerBar;
