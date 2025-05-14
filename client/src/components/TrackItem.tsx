import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Track } from '../utils/types';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistsContext';

interface Props {
  track: Track;
  index: number;
  playlistId: string;
}

const TrackItem: React.FC<Props> = ({ track, index, playlistId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { currentTrack, isPlaying, togglePlay, playTrack } = usePlayer();
  const { moveTrackWithinPlaylist } = usePlaylists();

  const [{ isDragging }, drag] = useDrag({
    type: 'TRACK',
    item: { track, index, playlistId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TRACK',
    hover(item: any) {
      if (item.playlistId === playlistId && item.index !== index) {
        moveTrackWithinPlaylist(playlistId, item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  const handlePlayPause = () => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div
      ref={ref}
      className={`track-item ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
    >
      <button onClick={handlePlayPause}>
        {currentTrack?.id === track.id && isPlaying ? 'Pause' : 'Play'}
      </button>
      <div>
        <strong>{track.title}</strong> — {track.artist}
      </div>
      <div>{Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}</div>      
    </div>
  );
};

export default TrackItem;
