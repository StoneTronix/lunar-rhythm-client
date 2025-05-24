import React, { useState } from 'react';
import { usePlaylists } from '../../../contexts/PlaylistsContext';

const PlaylistCreateModal: React.FC = () => {
  const [title, setTitle] = useState('');
  const { createPlaylist } = usePlaylists();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createPlaylist(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        placeholder="Новый плейлист"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Создать</button>
    </form>
  );
};

export default PlaylistCreateModal;
