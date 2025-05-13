import React, { useState } from 'react';
// import { usePlayer } from '../context/PlaylistsContext';

const CreatePlaylist: React.FC = () => {
  const [playlistName, setPlaylistName] = useState('');
  // const { playlists, setPlaylists } = usePlayer();

  const handleCreatePlaylist = () => {
    if (playlistName.trim() === '') return;

    const newPlaylist = {
      id: Date.now().toString(),
      name: playlistName,
      tracks: [],
      createdAt: new Date().toISOString(),
    };

    // setPlaylists([...playlists, newPlaylist]);
    setPlaylistName('');
  };

  return (
    <div>
      <h2>Создать новый плейлист</h2>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Введите название плейлиста"
      />
      <button onClick={handleCreatePlaylist}>Создать</button>
    </div>
  );
};

export default CreatePlaylist;
