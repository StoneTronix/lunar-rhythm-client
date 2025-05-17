import React from 'react';
import { Playlist, Track } from '../utils/types';

interface PlaylistListItemProps {
  playlist: Playlist;
  onSelect: (playlist: Playlist) => void;
}

const PlaylistListItem: React.FC<PlaylistListItemProps> = ({ playlist, onSelect }) => {
  return (
    <li
      onClick={() => onSelect(playlist)}
      style={{
        padding: '0.5rem',
        backgroundColor:'white',
        cursor: 'pointer',
        border: '1px solid #ccc',
        marginBottom: '4px',
        borderRadius: '4px',
      }}
    >
      {playlist.title} ({playlist.tracks.length} треков)
    </li>
  );
};

export default PlaylistListItem;
