import React, { useState } from 'react';
import { Playlist } from '../../utils/types';
import { usePlaylists } from '../../contexts/PlaylistsContext';

import './PlaylistItem.scss';

interface PlaylistListItemProps {
  playlist: Playlist;
  onSelect: (playlist: Playlist) => void;
}

const PlaylistListItem: React.FC<PlaylistListItemProps> = ({ playlist, onSelect }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const { deletePlaylist } = usePlaylists();  
  
  const handleDelete = async () => {
    try {
      await deletePlaylist(playlist.id);
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Не удалось удалить плейлист');
    }
  };

  return (
    <div
      className='playlist-item'
      onClick={() => onSelect(playlist)}
    >
      <div className='playlist-item__pic'></div>
      <div className='playlist-item__title'>{playlist.title}</div>
      <div className='playlist-item__contains'> 
        {playlist.tracks.length} треков 
      </div> 
      <div className="playlist-item__actions">
          {isConfirming ? (
            <>
              <button onClick={ handleDelete } className="danger">
                Подтвердить
              </button>
              <button onClick={() => setIsConfirming(false)}>
                Отмена
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsConfirming(true)}
              aria-label="Удалить плейлист"
            >
              🗑️
            </button>
          )}
        </div>
    </div>
  );
};

export default PlaylistListItem;
