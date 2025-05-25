import { FC, useState } from 'react';

import { Playlist } from '../../utils/types';
import PlaylistListItem from '../PlaylistItem/PlaylistItem';
import PlaylistCreateModal from '@ui/PlaylistCreateModal/PlaylistCreateModal';

import './PlaylistList.scss'

interface PlaylistListProps {
  playlists: Playlist[];  
  selectedPlaylistId: string | null;
  onSelect: (playlist: Playlist) => void;
}

export const PlaylistList: FC<PlaylistListProps> = ({ playlists, selectedPlaylistId, onSelect }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  return (
    <div className='playlist-list'>
      <div className='playlist-list__header'>
        <div className='playlist-list__title'>
          Плейлисты
        </div>
        <div className='playlist-list__options'>
          <button className='playlist-list__action playlist-list__action_sort'></button>
          <button 
            className='playlist-list__action playlist-list__action_add'
            onClick={() => setShowCreateModal(true)}
          >            
          </button>
        </div>
      </div>
      <div>
        {playlists.map((playlist) => (
          <PlaylistListItem
            key={playlist.id}
            playlist={playlist}
            onSelect={onSelect}
            isSelected={playlist.id === selectedPlaylistId}
          />
        ))}
        {showCreateModal && (
          <PlaylistCreateModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </div>
  );
};