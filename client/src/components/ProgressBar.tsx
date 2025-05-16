import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { usePlayer } from '../context/PlayerContext';
import '../styles/ProgressBar.scss';

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
    isPlaying
  } = usePlayer();
  
  if (!currentTrack || !isPlaying) return null;

  const handleValueChange = (values: number[]) => {
    const newPosition = values[0];
    seekTo(newPosition);
  };

  return (
    <div className="progress-bar">
      <span className="time">{formatTime(progress)}</span>
      <Slider.Root
        className="slider-root"
        value={[progress]}
        max={duration}
        step={0.1}
        onValueChange={handleValueChange}
      >
        <Slider.Track className="slider-track">
          <Slider.Range className="slider-range" />
        </Slider.Track>
        <Slider.Thumb className="slider-thumb" />
      </Slider.Root>
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;