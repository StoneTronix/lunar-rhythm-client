import React from 'react';

import { Playlist } from '../../utils/types';
import PlaylistListItem from '../PlaylistItem/PlaylistItem';
import PlaylistCreateModal from '@ui/PlaylistCreateModal/PlaylistCreateModal';

import './PlaylistList.scss'

interface PlaylistListProps {
  playlists: Playlist[];
  onSelect: (playlist: Playlist) => void;
}

export const PlaylistList: React.FC<PlaylistListProps> = ({ playlists, onSelect }) => {
  return (
    <div className='playlist-list'>
      <div className='playlist-list__header'>
        <div className='playlist-list__title'>
          Плейлисты
        </div>
        <div className='playlist-list__options'>
          <button className='playlist-list__action playlist-list__action_sort'>
          </button>
          <button className='playlist-list__action playlist-list__action_add'></button>
        </div>
      </div>
      {/* <PlaylistCreateModal /> */}
      <div>
         {playlists.map((playlist) => (
          <PlaylistListItem
            key={playlist.id}
            playlist={playlist}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};