import React, { useState, useEffect, useRef } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { usePlayer } from '../../contexts/PlayerContext';
import formatTime from '@utils/formatTime';
import './ProgressBar.scss';

const ProgressBar: React.FC = () => {
  const { 
    progress, 
    duration, 
    currentTrack, 
    seekTo,
  } = usePlayer();

  const [isDragging, setIsDragging] = useState(false);
  const [tempProgress, setTempProgress] = useState(progress);  
  const sliderRef = useRef<HTMLSpanElement>(null);
  const startProgressRef = useRef(progress); // Запоминаем начальную позицию
  
  useEffect(() => {
    if (!isDragging) {
      setTempProgress(progress);
      startProgressRef.current = progress;
    }
  }, [progress, isDragging]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDragging) {
        setTempProgress(startProgressRef.current);
        setIsDragging(false);
        
        if (sliderRef.current) {
          (sliderRef.current as HTMLElement).blur();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDragging]);

  const handleValueChange = (values: number[]) => {
    setTempProgress(values[0]);
  };

  const handleValueCommit = (values: number[]) => {
    seekTo(values[0]);
    setIsDragging(false);
  };

  const handlePointerDown = () => {
    startProgressRef.current = tempProgress;
    setIsDragging(true);
  };

  if (!currentTrack) return null;

  return (
    <div className="control-bar__progress-bar">
      <span className="control-bar__time">
        {formatTime(isDragging ? tempProgress : progress)}
      </span>

      <Slider.Root
        ref={sliderRef}
        className="control-bar__slider-root"
        value={[tempProgress]}
        max={duration}
        step={0.1}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        onPointerDown={handlePointerDown}
      >
        <Slider.Track className="control-bar__slider-track">
          <Slider.Range className="control-bar__slider-range" />
        </Slider.Track>
        <Slider.Thumb 
          className="control-bar__slider-thumb" 
          onPointerDown={handlePointerDown}
        />
      </Slider.Root>

      <span className="control-bar__time">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default ProgressBar;