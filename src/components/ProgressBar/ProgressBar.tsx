import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { usePlayer } from '../../contexts/PlayerContext';

import './ProgressBar.scss';

const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProgressBar: React.FC = () => {
  const { 
    progress, 
    duration, 
    currentTrack, 
    seekTo,
  } = usePlayer();
  
  if (!currentTrack) return null;

  const handleValueChange = (values: number[]) => {
    const newPosition = values[0];
    seekTo(newPosition);
  };

  return (
    <div className="control-bar__progress-bar">
      <span className="control-bar__time">{formatTime(progress)}</span>
      <Slider.Root
        className="control-bar__slider-root"
        value={[progress]}
        max={duration}
        step={0.1}
        onValueChange={handleValueChange}
      >
        <Slider.Track className="control-bar__slider-track">
          <Slider.Range className="control-bar__slider-range" />
        </Slider.Track>
        <Slider.Thumb className="control-bar__slider-thumb" />
      </Slider.Root>
      <span className="control-bar__time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;