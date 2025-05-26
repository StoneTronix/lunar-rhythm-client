import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import ControlBar from '../ControlBar/ControlBar';
import './Layout.scss';

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__content">
        <Outlet />
      </main>
      <ControlBar />
    </div>
  );
};

export default Layout;