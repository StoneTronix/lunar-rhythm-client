import React, { useState, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import '../styles/ProgressBar.scss';

const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProgressBar: React.FC = () => {  
  const { progress, currentTrack, setProgress } = usePlayer();
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipTime, setTooltipTime] = useState<number | null>(null);
  const [tooltipLeft, setTooltipLeft] = useState(0);

  if (!currentTrack)
    return null;  
  const duration = currentTrack.duration;
  const percent = (progress / currentTrack.duration) * 100;

  const seekTo = (clientX: number) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;

    const Howler = require('howler');
    const sound = Howler.Howler._howls.find(
      (h: any) => h._src.includes(`${currentTrack.id}.wav`)
    );
    if (sound) {
      sound.seek(newTime);
      setProgress(newTime);
    }
  };  

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    seekTo(e.clientX);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      seekTo(e.clientX);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setIsDragging(false);
    seekTo(e.clientX);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const hoverTime = (offsetX / rect.width) * duration;
    setTooltipTime(hoverTime);
    setTooltipLeft(offsetX);
  };

  const clearTooltip = () => {
    setTooltipTime(null);
  };

  return (
    <div className="progress">
      <span>{formatTime(progress)}</span>
      <div
        ref={progressRef}
        onClick={handleClick}
        onMouseMove={handleHover}
        onMouseLeave={clearTooltip}
        style={{
          background: '#ccc',
          height: '8px',
          width: '100%',
          marginTop: '10px',
          position: 'relative',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        {/* Tooltip */}
        {tooltipTime !== null && (
          <div
            className='tooltip'
          >
            {formatTime(tooltipTime)}
          </div>
        )}

        {/* Progress Fill */}
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: '#007bff',
            position: 'absolute',
            top: 0,
            left: 0,
            borderRadius: '4px',
          }}
        />

        {/* Draggable handle */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            position: 'absolute',
            left: `calc(${percent}% - 6px)`,
            top: '-4px',
            width: '12px',
            height: '16px',
            backgroundColor: '#007bff',
            borderRadius: '50%',
            cursor: 'grab',
            zIndex: 1,
          }}
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
