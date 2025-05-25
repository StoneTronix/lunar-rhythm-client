import { FC, useState, useEffect } from 'react';

import ModalBase from '@components/modal/ModalBase';
import { usePlaylists } from '@contexts/PlaylistsContext';

import './PlaylistSelectorModal.scss';

interface PlaylistSelectorModalProps {
  trackId: string;
  onSave: (selectedPlaylistIds: string[]) => void;
  onClose: () => void;
}

const PlaylistSelectorModal: FC<PlaylistSelectorModalProps> = ({
  trackId,
  onSave,
  onClose,
}) => {
  const { playlists, updateTrackPlaylists } = usePlaylists();
  const [localPlaylists, setLocalPlaylists] = useState<
    { id: string; title: string; checked: boolean }[]
  >([]);

  useEffect(() => {
    initLocalPlaylists();
  }, [playlists, trackId]);

  const initLocalPlaylists = () => {
    const updated = playlists.map(({ id, title, tracks }) => ({
      id,
      title,
      checked: tracks.some((t) => t.id === trackId),
    }));
    setLocalPlaylists(updated);
  };

  const toggleCheckbox = (playlistId: string) => {
    setLocalPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId ? { ...p, checked: !p.checked } : p
      )
    );
  };

  const handleSave = async () => {
    const selectedIds = localPlaylists
      .filter((p) => p.checked)
      .map((p) => p.id);

    try {
      await updateTrackPlaylists(trackId, selectedIds);
      onSave(selectedIds);
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении плейлистов трека:', error);
    }
  };

  return (
    <ModalBase title="Выберите плейлисты для трека" onClose={onClose}>
      <div className="playlist-checkboxes">
        {localPlaylists.map(({ id, title, checked }) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleCheckbox(id)}
            />
            {title}
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
