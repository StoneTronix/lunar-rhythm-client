import React, { useState } from 'react';
import { Playlist } from '../utils/types';
import { usePlaylists } from '../context/PlaylistsContext';

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
      <div className="playlist-actions">
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
    </li>
  );
};

export default PlaylistListItem;
