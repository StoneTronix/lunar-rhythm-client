import React, { useState, useEffect } from 'react';
import { PlaylistCheckbox } from '../utils/types';
import '../styles/PlaylistSelectorModal.scss'

interface PlaylistSelectorModalProps {
  trackId: string;
  playlists: PlaylistCheckbox[];
  onSave: (trackId: string, selectedPlaylistIds: string[]) => void;
  onClose: () => void;
}

const PlaylistSelectorModal: React.FC<PlaylistSelectorModalProps> = ({ 
  trackId, 
  playlists, 
  onSave, 
  onClose 
}) => {
  const [localPlaylists, setLocalPlaylists] = useState([...playlists]);

  const handleCheckboxChange = (playlistId: string) => {
    setLocalPlaylists(prev => 
      prev.map(p => 
        p.id === playlistId ? { ...p, checked: !p.checked } : p
      )
    );
  };

  const handleSave = () => {
    const selectedPlaylistIds = localPlaylists
      .filter(p => p.checked)
      .map(p => p.id);
    onSave(trackId, selectedPlaylistIds);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Выберите плейлисты для трека</h3>
        <div className="playlist-checkboxes">
          {localPlaylists.map(playlist => (
            <label key={playlist.id}>
              <input
                type="checkbox"
                checked={playlist.checked}
                onChange={() => handleCheckboxChange(playlist.id)}
              />
              {playlist.title}
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Отмена</button>
          <button onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSelectorModal;