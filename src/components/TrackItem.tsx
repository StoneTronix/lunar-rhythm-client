import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';

interface Props {
  track: Track;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TrackItem: React.FC<Props> = ({ track }) => {
  const { currentTrack, isPlaying, togglePlay, playTrack, pause } = usePlayer();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'TRACK',
    item: { track },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [track]);

  const divRef = useRef<HTMLDivElement | null>(null);
  const combinedRef = (node: HTMLDivElement | null) => {
    divRef.current = node;
    dragRef(node); // Добавляем ссылку на dragRef
  };

  const handlePlayPause = () => {
    
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div ref={combinedRef} className={`track-item ${isDragging ? 'dragging' : ''}`}>
      <div>
        <strong>{track.title}</strong> — {track.artist}
      </div>
      <div>{formatDuration(track.duration)}</div>
      <button onClick={handlePlayPause}>
        {currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default TrackItem;
