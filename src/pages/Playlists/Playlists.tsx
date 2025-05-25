import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { usePlaylists } from '../../contexts/PlaylistsContext'
import { PlaylistList } from '../../components/PlaylistList/PlaylistList';
import PlaylistView from '../../components/Tracklist/Tracklist';

import './Playlists.scss';

const Playlists: React.FC = () => {
  const { playlists } = usePlaylists();
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId) || null;
  
  /*
  useEffect(() => {
    if (!playlists.length) {
      fetchPlaylists();
    }
  }, [playlists, fetchPlaylists]);  
  */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="playlists-page"
    >
      <h1 className="playlists-page__title">Мои Плейлисты</h1>
      <div className="playlists-page__content">
        <div className="widget__wrapper">
          <PlaylistList          
            playlists={playlists} 
            onSelect={(playlist) => setSelectedPlaylistId(playlist.id)} 
          />
        </div>
        <div className="widget__wrapper">
          {selectedPlaylist && <PlaylistView playlist={selectedPlaylist} />}
        </div>
      </div>
    </motion.div>
  );
};

export default Playlists;
