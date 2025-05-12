import React from 'react';
import { Playlist } from '../types';

interface PlaylistListProps {
  playlists: Playlist[];
  onSelect: (playlist: Playlist) => void;
}

export const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, onSelect }) => {
  return (
    <div className="playlist-list">
      <h2>Плейлисты</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id} onClick={() => onSelect(playlist)}>
            {playlist.name} ({playlist.tracks.length} треков)
          </li>
        ))}
      </ul>
    </div>
  );
};