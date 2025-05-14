import React from 'react';
import { useDrop } from 'react-dnd';
import { Playlist, Track } from '../types';
import { usePlaylists } from '../context/PlaylistsContext';

interface PlaylistListItemProps {
  playlist: Playlist;
  onSelect: (playlist: Playlist) => void;
}

const PlaylistListItem: React.FC<PlaylistListItemProps> = ({ playlist, onSelect }) => {
  const { moveTrackToPlaylist } = usePlaylists();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TRACK',
    drop: (item: { track: Track; playlistId: string }, monitor) => {
      if (item.playlistId !== playlist.id) {
        moveTrackToPlaylist(item.track, playlist.id, item.playlistId);
        item.playlistId = playlist.id;
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [playlist.id]);

  return (
    <li
      ref={drop as any}
      onClick={() => onSelect(playlist)}
      style={{
        padding: '0.5rem',
        backgroundColor: isOver ? '#e6f7ff' : 'white',
        cursor: 'pointer',
        border: '1px solid #ccc',
        marginBottom: '4px',
        borderRadius: '4px',
      }}
    >
      {playlist.name} ({playlist.tracks.length} треков)
    </li>
  );
};

export default PlaylistListItem;
