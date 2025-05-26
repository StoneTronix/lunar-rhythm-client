import React from 'react';
import Navbar from '../Navbar/Navbar';
import ControlBar from '../ControlBar/ControlBar';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__content">
        {children}
      </main>
      <ControlBar />
    </div>
  );
};

export default Layout;