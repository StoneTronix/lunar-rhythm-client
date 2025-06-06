import { FC, useState } from 'react';

import PlaylistItem from '../PlaylistItem/PlaylistItem';
import PlaylistCreateModal from '@ui/PlaylistCreateModal/PlaylistCreateModal';
import { usePlaylists } from '../../contexts/PlaylistsContext';
import { useSelectedPlaylist } from '../../hooks/useSelectedPlaylist';
import ButtonIcon from 'src/shared/Button/_icon/Button_icon';

import './PlaylistList.scss';

const PlaylistList: FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { playlists } = usePlaylists();
  const { selectPlaylist, isSelected } = useSelectedPlaylist();
  
  return (
    <div className='playlist-list'>
      <div className='playlist-list__header'>
        <div className='playlist-list__title'>Плейлисты • <span className='playlist-list__counter'>{playlists.length}</span></div>
        <div className='playlist-list__options'>
          <ButtonIcon
            className='playlist-list__action'
            type='button'
            icon = 'Sort'
            aria-label="Сортировка плейлистов"
          />
          <ButtonIcon
            className='playlist-list__action'
            type='button'
            icon = 'Add'
            aria-label="Добавить плейлист"
            onClick={() => setShowCreateModal(true)}
          />
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