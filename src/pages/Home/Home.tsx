import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Home.scss';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/playlists');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='home-page'
    >
      <div className='home-page__overlay'>
        <h1 className='home-page__title'>Добро пожаловать в Медиаплеер</h1>
        <p className='home-page__subtitle'>
          Приложение, в котором Вы можете упорядочить <br />
          и послушать свою музыку
        </p>
        <button className='home-page__button' onClick={handleClick}>
          Войти
        </button>
      </div>
      <div className='home-page__background'></div>
    </motion.div>
  );
};

export default Welcome;
