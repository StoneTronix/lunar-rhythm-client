import React from 'react';
import { motion } from 'framer-motion';
import TrackSearch from '../../components/TrackSearch/TrackSearch';

import './Library.scss'

const Library: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="library-page"
    >
      <h1 className="library-page__title">Библиотека треков</h1>
      <div className='library-page__content'>
        <TrackSearch />
      </div>      
    </motion.div>
  );
};

export default Library;