// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Library from './pages/Library';
import Playlists from './pages/Playlists';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';

import { PlayerBar } from './components/PlayerBar';
import { PlayerProvider } from './context/PlayerContext';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <PlayerProvider>
      <div>
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
        <PlayerBar />
      </div>
    </PlayerProvider>
  );
};

export default App;
