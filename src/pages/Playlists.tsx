import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlaylists } from '../context/PlaylistsContext'
import { PlaylistList } from '../components/PlaylistList';
import PlaylistView from '../components/PlaylistView';
import '../styles/Playlists.scss';

const Playlists: React.FC = () => {
  const { playlists, fetchPlaylists } = usePlaylists();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId) || null;
  
  // Загружаем плейлисты при монтировании (если они ещё не загружены)
  useEffect(() => {
    if (!playlists.length) {
      fetchPlaylists();
    }
  }, [playlists, fetchPlaylists]);

  

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
        <PlaylistList playlists={playlists} onSelect={(playlist) => setSelectedPlaylistId(playlist.id)} />
        {selectedPlaylist && <PlaylistView playlist={selectedPlaylist} />}
      </div>
    </motion.div>
  );
};

export default Playlists;
