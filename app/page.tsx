"use client";

import { useState } from "react";
import { cn, classes } from "./lib/utils";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navItems = ['Shop', 'Gift cards', 'Analytics', 'Profile', 'About'];
  const selectedItem = 'Analytics';
  const userAvatarClass = 'w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header onMenuClick={toggleSidebar} navItems={navItems} selectedItem={selectedItem} />
      <div className="flex flex-1 min-w-0 min-h-0">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          navItems={navItems}
          selectedItem={selectedItem}
          userAvatarClass={userAvatarClass}
        />
        <main
          className={cn(
            "flex flex-col items-end flex-1 min-h-0",
            "min-h-[31.25rem] px-8 md:px-[var(--app-spacing,1rem)]",
            "gap-2.5"
          )}
        >
          <div className="w-full max-w-full">
            <h1 className="text-3xl font-semibold mb-4">Analytics Dashboard</h1>
            <p className="opacity-70 mb-8">
              This is the main content area for the showcase application.
            </p>
          </div>
          <footer
            className={cn(
              "flex justify-center items-center self-stretch mt-auto",
              "gap-2.5 text-sm",
              classes.appPadding,
              classes.textForegroundMuted
            )}
          >
            © 2025 TMD Technology Limited. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
