import { FC, useState } from 'react';

import ModalBase from '@components/Modal/ModalBase';
import { usePlaylists } from '@contexts/PlaylistsContext';

import './PlaylistCreateModal.scss';

interface PlaylistCreateModalProps {
  onClose: () => void;
}

const PlaylistCreateModal: FC<PlaylistCreateModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const { createPlaylist } = usePlaylists();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      await createPlaylist(title);
      onClose();
    } catch (error) {
      console.error('Ошибка при создании плейлиста:', error);
    }
  };

  return (
    <ModalBase title="Новый плейлист" onClose={onClose}>
      <form onSubmit={handleSubmit} className="playlist-create-form">
        <input
          type="text"
          placeholder="Введите название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="playlist-create-input"
          autoFocus
        />
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Отмена
          </button>
          <button type="submit" disabled={!title.trim()}>
            Создать
          </button>
        </div>
      </form>
    </ModalBase>
  );
};

export default PlaylistCreateModal;