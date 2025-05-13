import { usePlayer } from '../context/PlayerContext';
import '../styles/ProgressBar.scss';

const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ProgressBar: React.FC = () => {  
  const { progress, currentTrack } = usePlayer();  

  if (!currentTrack) return null;
  const duration = currentTrack.duration;
  const percent = (progress / currentTrack.duration) * 100;

  return (
    <div className="progress">
      <span>{formatTime(progress)}</span>
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
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
