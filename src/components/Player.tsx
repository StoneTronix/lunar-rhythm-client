import React from 'react';
import ProgressBar from './ProgressBar';
import { usePlayer } from '../context/PlayerContext';

const Player: React.FC = () => {
  const { currentTrack, togglePlay, isPlaying } = usePlayer();

  if (!currentTrack) {
    return <div>Выберите трек для воспроизведения</div>;
  }

  return (
    <div className="player">
      <h3>Сейчас играет: {currentTrack.title}</h3>
      <button onClick={togglePlay}>
        {isPlaying ? 'Пауза' : 'Играть'}
      </button>
      <ProgressBar />
    </div>
  );
};

export default Player;