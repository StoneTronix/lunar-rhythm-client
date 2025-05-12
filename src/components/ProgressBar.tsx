import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import '../styles/ProgressBar.scss';

const ProgressBar: React.FC = () => {  
  const { progress, currentTrack } = usePlayer();

  if (!currentTrack) return null;
  const percent = (progress / currentTrack.duration) * 100;

  return (
    <div style={{ background: '#ccc', height: '8px', width: '100%', marginTop: '10px' }}>
      <div
        style={{
          width: `${percent}%`,
          height: '100%',
          background: '#007bff',
          transition: 'width 0.3s linear',
        }}
      />
    </div>
  );
};

export default ProgressBar;
