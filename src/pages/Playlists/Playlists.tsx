import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import PlaylistList from '../../components/PlaylistList/PlaylistList';
import Tracklist from '../../components/Tracklist/Tracklist';
import { useSelectedPlaylist } from '../../hooks/useSelectedPlaylist';

import './Playlists.scss';

const Playlists: FC = () => {
  const { selectedPlaylist, selectPlaylist } = useSelectedPlaylist();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth <= 768); // 768px - обычная точка перелома для мобильных устройств
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleBackToList = () => {
    selectPlaylist(null);
  };

  const renderDesktopView = () => (
    <>
      <div className="widget__wrapper">
        <PlaylistList />
      </div>
      <div className="widget__wrapper">
        {selectedPlaylist && <Tracklist playlist={selectedPlaylist} />}
      </div>
    </>
  );

  const renderMobileView = () => (
    <div className="widget__wrapper">
      {selectedPlaylist ? (
        <>
          <Tracklist playlist={selectedPlaylist} />
        </>
      ) : (
        <PlaylistList />
      )}
    </div>
  );

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
        {isMobileView ? renderMobileView() : renderDesktopView()}
      </div>
    </motion.div>
  );
};

export default Playlists;