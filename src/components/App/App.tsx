import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Home from '@pages/Home/Home';
import Library from '@pages/Library/Library';
import Playlists from '@pages/Playlists/Playlists';
import Settings from '@pages/Settings/Settings';

import Navbar from '../Navbar/Navbar';
import ControlBar from '../ControlBar/ControlBar';

import { ThemeProvider } from '../../contexts/ThemeContext';
import { PlayerProvider } from '../../contexts/PlayerContext';
import { PlaylistsProvider } from '../../contexts/PlaylistsContext';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <ThemeProvider>
  <PlayerProvider> 
    <PlaylistsProvider>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Navbar />
        </div>        
        <div className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
          </AnimatePresence>
        </div>
        <div>
          <ControlBar />
        </div>        
      </DndProvider>
    </PlaylistsProvider>
  </PlayerProvider>
</ThemeProvider>
  );
};

export default App;
