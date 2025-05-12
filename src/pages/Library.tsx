import React from 'react';
import { motion } from 'framer-motion';

const Library: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Библиотека треков</h1>
    </motion.div>
  );
};

export default Library;