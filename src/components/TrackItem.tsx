import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { usePlayer } from '../context/PlayerContext';
import { Track } from '../types';

interface Props {
  track: Track;
  index: number;      // Индекс для сохранения порядка
  // playlistId: string; // ID плейлиста для обновления
  moveTrack: (fromIndex: number, toIndex: number) => void;  
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const TrackItem: React.FC<Props> = ({ track, index, moveTrack }) => {
  const { currentTrack, isPlaying, togglePlay, playTrack } = usePlayer();
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: 'TRACK',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'TRACK',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveTrack(item.index, index);
        item.index = index;
      }
    },
  });

  const handlePlayPause = () => {    
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  drag(drop(ref));

  return (
    <div ref={ref} className="track-item">
      <strong>{track.title} — {track.artist}</strong>
      <div>{formatDuration(track.duration)}</div>
      <button onClick={handlePlayPause}>
        {currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default TrackItem;
