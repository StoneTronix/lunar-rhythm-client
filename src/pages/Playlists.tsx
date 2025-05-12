import React, { useState } from 'react';
import { motion } from 'framer-motion';
import playlistsData from '../data/mockPlaylists.json';
import { Playlist } from '../types';
import { PlaylistList } from '../components/PlaylistList';
import { PlaylistView } from '../components/PlaylistView';

import '../styles/Playlists.scss';

const Playlists: React.FC = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

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
        <PlaylistList playlists={playlistsData} onSelect={setSelectedPlaylist} />
        {selectedPlaylist && <PlaylistView playlist={selectedPlaylist} />}
      </div>
    </motion.div>
  );
};

export default Playlists;
