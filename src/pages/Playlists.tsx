import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Playlist } from '../types';
import { PlaylistList } from '../components/PlaylistList';
import PlaylistView from '../components/PlaylistView';

import '../styles/Playlists.scss';

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  // Получение плейлистов с сервера
  useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch('http://localhost:4000/api/playlists');
      if (response.ok) {
        const data = await response.json();
        setPlaylists(data);
      } else {
        console.error('Не удалось загрузить плейлисты');
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="playlists-page"
    >
      <h1>Мои Плейлисты</h1>
      <div className="content">
        <PlaylistList playlists={playlists} onSelect={setSelectedPlaylist} />
        {selectedPlaylist && <PlaylistView playlist={selectedPlaylist} />}
      </div>
    </motion.div>
  );
};

export default Playlists;
