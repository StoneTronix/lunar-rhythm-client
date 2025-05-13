import React, { useRef } from 'react';
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

  if (!currentTrack) return null;
  const duration = currentTrack.duration;
  const percent = (progress / currentTrack.duration) * 100;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!progressRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    // Устанавливаем новое время
    const Howler = require('howler');
    const sound = Howler.Howler._howls.find(
      (h: any) => h._src.includes(`${currentTrack.id}.wav`)
    );
    if (sound) {
      sound.seek(newTime);
      setProgress(newTime);
    }
  };

  return (
    <div className="progress">
      <span>{formatTime(progress)}</span>
      <div
        ref={progressRef}
        onClick={handleClick}
        style={{ background: '#ccc', height: '8px', width: '100%', marginTop: '10px' }}
      >        
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: '#007bff',
            transition: 'width 0.3s linear',
          }}
        />
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
