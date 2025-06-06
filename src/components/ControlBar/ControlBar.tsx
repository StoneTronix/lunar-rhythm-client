import React from 'react';
import { usePlayer } from '../../contexts/PlayerContext';

import ProgressBar from '../ProgressBar/ProgressBar';
import VolumeControl  from '../VolumeControl/VolumeControl';

import './ControlBar.scss';
import ButtonIcon from 'src/shared/Button/_icon/Button_icon';

const ControlBar: React.FC = () => {
  const { currentTrack, isPlaying, togglePlay} = usePlayer();
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
          <ButtonIcon
            className='control-bar__control-btn reversed' 
            icon='Next'
          />
          <ButtonIcon
            className='control-bar__play-btn' 
            icon={isPlaying ? 'Pause' : 'Play'}
            onClick={togglePlay}
            aria-label="Play/Pause"
          />         
          <ButtonIcon
            className='control-bar__control-btn' 
            icon='Next'
          />
        </div>

        <VolumeControl /> 
      </div>
    </div>
  );
};

export default ControlBar;
