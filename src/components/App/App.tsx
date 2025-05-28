import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Home from '@pages/Home/Home';
import Library from '@pages/Library/Library';
import Playlists from '@pages/Playlists/Playlists';
import Settings from '@pages/Settings/Settings';

import Layout from '../Layout/Layout';

import { ThemeProvider } from '../../contexts/ThemeContext';
import { PlayerProvider } from '../../contexts/PlayerContext';
import { PlaylistsProvider } from '../../contexts/PlaylistsContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <PlaylistsProvider>
          <DndProvider backend={HTML5Backend}>
            <Layout>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </Layout>
          </DndProvider>
        </PlaylistsProvider>
      </PlayerProvider>
    </ThemeProvider>
  );
};

export default App;