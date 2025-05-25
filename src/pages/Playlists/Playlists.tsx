import React from 'react';
import { motion } from 'framer-motion';
import { PlaylistList } from '../../components/PlaylistList/PlaylistList';
import PlaylistView from '../../components/Tracklist/Tracklist';
import { useSelectedPlaylist } from '../../hooks/useSelectedPlaylist';
import './Playlists.scss';

const Playlists: React.FC = () => {
  const { selectedPlaylist } = useSelectedPlaylist();

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
          <PlaylistList />
        </div>
        <div className="widget__wrapper">
          {selectedPlaylist && <PlaylistView playlist={selectedPlaylist} />}
        </div>
      </div>
    </motion.div>
  );
};

export default Playlists;