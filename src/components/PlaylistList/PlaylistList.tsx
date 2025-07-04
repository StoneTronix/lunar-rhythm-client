import { FC, useState } from 'react';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import PlaylistCreateModal from '@ui/PlaylistCreateModal/PlaylistCreateModal';
import { usePlaylists } from '../../contexts/PlaylistsContext';
import { useSelectedPlaylist } from '../../hooks/useSelectedPlaylist';
import './PlaylistList.scss';

const PlaylistList: FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { playlists } = usePlaylists();
  const { selectPlaylist, isSelected } = useSelectedPlaylist();
  
  return (
    <div className='playlist-list'>
      <div className='playlist-list__header'>
        <div className='playlist-list__title'>Плейлисты • {playlists.length}</div>
        <div className='playlist-list__options'>
          <button className='playlist-list__action playlist-list__action_sort'></button>
          <button 
            className='playlist-list__action playlist-list__action_add'
            aria-label="Добавить плейлист"
            onClick={() => setShowCreateModal(true)}
          ></button>
        </div>
      </div>
      <div>
        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            isSelected={isSelected(playlist.id)}
            onSelect={() => selectPlaylist(playlist.id)}
          />
        ))}
        {showCreateModal && (
          <PlaylistCreateModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </div>
  );
};

export default PlaylistList;