import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative mx-auto px-4 py-8 max-w-6xl pb-32 overflow-visible">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;