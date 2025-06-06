import React, { useState } from 'react';
import { Playlist } from '../../utils/types';
import { usePlaylists } from '../../contexts/PlaylistsContext';
import PlaylistDeleteModal from '@ui/PlaylistDeleteModal/PlaylistDeleteModal';
import './PlaylistItem.scss';

interface PlaylistItemProps {
  playlist: Playlist;
  isSelected: boolean;
  onSelect: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ 
  playlist, 
  isSelected,
  onSelect
}) => {
  const { deletePlaylist } = usePlaylists();  
  const [showDeleteModal, setShowDeleteModal] = useState(false);  
  
  const handleDelete = async () => {
    try {
      console.log('handleDelete called');
      await deletePlaylist(playlist.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  return (
    <>
      <div 
        className={`playlist-item ${isSelected ? 'playlist-item_selected' : ''}`}
        onClick={onSelect}
      >
        <div className='playlist-item__pic'></div>
        <div className='playlist-item__title'>{playlist.title}</div>
        <div className='playlist-item__contains'>
          {playlist.tracks.length} треков
        </div>
        <div className="playlist-item__actions">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
            aria-label="Удалить плейлист"
          >
            🗑️
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <PlaylistDeleteModal
          playlistTitle={playlist.title}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default PlaylistItem;