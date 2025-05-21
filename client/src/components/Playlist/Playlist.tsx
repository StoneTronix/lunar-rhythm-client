import React from 'react';

import { Playlist } from '../../utils/types';
import PlaylistListItem from '../PlaylistItem/PlaylistItem';
import PlaylistCreateModal from '@ui/PlaylistCreateModal/PlaylistCreateModal';

interface PlaylistListProps {
  playlists: Playlist[];
  onSelect: (playlist: Playlist) => void;
}

export const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, onSelect }) => {
  return (
    <div className="playlist-list">
      <h2>Плейлисты</h2>
      <PlaylistCreateModal />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {playlists.map((playlist) => (
          <PlaylistListItem
            key={playlist.id}
            playlist={playlist}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  );
};