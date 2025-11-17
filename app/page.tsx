'use client';

import { useState } from 'react';
import { cn, classes } from './lib/utils';
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
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header onMenuClick={toggleSidebar} />
      <div className="flex flex-1 min-w-0">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <main className={cn(
          'flex min-h-[31.25rem] flex-col items-end gap-2.5 flex-1',
          classes.appPaddingX
        )}>
          <div className="w-full max-w-full">
            <h1 className="text-3xl font-semibold mb-4">
              Analytics Dashboard
            </h1>
            <p className="opacity-70 mb-8">
              This is the main content area for the showcase application.
            </p>
          </div>
          <footer className={cn(
            'flex justify-center items-center self-stretch mt-auto',
            'gap-2.5 text-sm',
            classes.appPadding,
            classes.textForegroundMuted
          )}>
            © 2025  TMD Technology Limited. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
