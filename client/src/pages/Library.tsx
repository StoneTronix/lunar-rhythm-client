import React from 'react';
import { motion } from 'framer-motion';
import TrackSearch from '../components/TrackSearch';

const Library: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="library-page"
    >
      <h1>Библиотека треков</h1>
      <TrackSearch />
    </motion.div>
  );
};

export default Library;