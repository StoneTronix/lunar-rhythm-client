import React, { FC, useState, useEffect } from 'react';

import ModalBase from '@components/modal/ModalBase';
import { usePlaylists } from '@contexts/PlaylistsContext';

import './PlaylistSelectorModal.scss';

interface PlaylistSelectorModalProps {
  trackId: string;
  onSave: (trackId: string, selectedPlaylistIds: string[]) => void;
  onClose: () => void;
}

const PlaylistSelectorModal: FC<PlaylistSelectorModalProps> = ({
  trackId,
  onSave,
  onClose,
}) => {
  const { playlists } = usePlaylists();
  const [localPlaylists, setLocalPlaylists] = useState<
    { id: string; title: string; checked: boolean }[]
  >([]);

  useEffect(() => {
    const checkboxes = playlists.map((p) => ({
      id: p.id,
      title: p.title,
      checked: p.tracks.some((t) => t.id === trackId),
    }));
    setLocalPlaylists(checkboxes);
  }, [playlists, trackId]);

  const handleCheckboxChange = (playlistId: string) => {
    setLocalPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId ? { ...p, checked: !p.checked } : p
      )
    );
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const selected = localPlaylists
      .filter((p) => p.checked)
      .map((p) => p.id);
    onSave(trackId, selected);
    onClose();
  };

  return (
    <ModalBase title="Выберите плейлисты для трека" onClose={onClose}>
      <div className="playlist-checkboxes">
        {localPlaylists.map((playlist) => (
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
    </ModalBase>
  );
};

export default PlaylistSelectorModal;