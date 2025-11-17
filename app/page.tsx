'use client';

import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <Header onMenuClick={toggleSidebar} />
        <main className="main-content">
          <div style={{ width: '100%', maxWidth: '100%' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1rem' }}>
              Analytics Dashboard
            </h1>
            <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
              This is the main content area for the showcase application.
            </p>
          </div>
          <footer className="main-footer">
            © 2025  TMD Technology Limited. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
