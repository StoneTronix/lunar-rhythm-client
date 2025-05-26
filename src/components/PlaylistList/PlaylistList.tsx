import { FC, useState } from 'react';
import PlaylistListItem from '../PlaylistItem/PlaylistItem';
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
        <div className='playlist-list__title'>Плейлисты</div>
        <div className='playlist-list__options'>
          <button className='playlist-list__action playlist-list__action_sort'></button>
          <button 
            className='playlist-list__action playlist-list__action_add'
            onClick={() => setShowCreateModal(true)}
          ></button>
        </div>
      </div>
      <div>
        {playlists.map((playlist) => (
          <PlaylistListItem
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