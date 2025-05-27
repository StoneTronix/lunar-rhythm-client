import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

import ProgressBar from '../ProgressBar/ProgressBar';
import VolumeControl  from '../VolumeControl/VolumeControl';

import './ControlBar.scss';

const ControlBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay} = usePlayer();

  const PlayIcon = ({ color = 'currentColor' }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path 
        d="M8 5v14l11-7z" 
        fill={color}
      />
    </svg>
  );

  if (!currentTrack) return null;

  return (
    <div className="control-bar">
      <div className='control-bar__timeline'>
        <ProgressBar /> 
      </div>
    
      <div className="control-bar__controls">        
        <div className='control-bar__info'>
          <div className='control-bar__cover'></div>
          <div className='control-bar__meta'>
            <div className='control-bar__title'>{currentTrack.title}</div>
            <div className='control-bar__artist'>{currentTrack.artist}</div>
          </div>
        </div>
        
        <div className="control-bar__buttons">
          <button className="control-bar__control-btn"></button>
          <button 
            className='control-bar__play-btn' 
            onClick={togglePlay}
            aria-label="Play/Pause"
          >
          </button>
          <button className="control-bar__control-btn"></button>
        </div>

        <VolumeControl /> 
      </div>
    </div>
  );
};

export default ControlBar;
