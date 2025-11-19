"use client";

import { useState, useCallback, useRef } from "react";
import { cn, classes } from "./lib/utils";
import Header from "./components/Header";
import Sidebar, { type TDashboardItem, type UserId, users } from "./components/Sidebar";
import EmbeddableRenderer from "./components/EmbeddableRenderer";
import DashboardHeader from "./components/DashboardHeader";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCustomCanvasState, setSelectedCustomCanvasState] = useState<string>("");
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>("");
  const [selectedDashboardName, setSelectedDashboardName] = useState<string>("");
  // Initialize with first user from users array
  const [selectedUserId, setSelectedUserId] = useState<UserId>(users[0]?.id || "denis");
  const navItems = ['Shop', 'Gift cards', 'Analytics', 'Profile', 'About'];
  const selectedNavItem = 'Analytics';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSelectDashboard = useCallback((dashboard: TDashboardItem, userEmail: string) => {
    setSelectedCustomCanvasState(dashboard.state);
    setSelectedUserEmail(userEmail);
    setSelectedDashboardName(dashboard.name);
  }, []);

  const handleDashboardRename = useCallback((dashboardId: string, newName: string) => {
    setSelectedDashboardName(newName);
  }, []);

  const sidebarUpdateNameRef = useRef<((state: string, name: string) => void) | null>(null);

  const handleNameChangeFromHeader = useCallback((newName: string) => {
    setSelectedDashboardName(newName);
    // Update the dashboard in Sidebar
    if (sidebarUpdateNameRef.current && selectedCustomCanvasState) {
      sidebarUpdateNameRef.current(selectedCustomCanvasState, newName);
    }
  }, [selectedCustomCanvasState]);
  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header 
        onMenuClick={toggleSidebar} 
        navItems={navItems} 
        selectedNavItem={selectedNavItem}
        selectedUserId={selectedUserId}
        onUserSelect={setSelectedUserId}
      />
      <div className="flex flex-1 min-w-0 min-h-0">
        <Sidebar
          selectedCustomCanvasState={selectedCustomCanvasState}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          navItems={navItems}
          selectedNavItem={selectedNavItem}
          onDashboardSelect={handleSelectDashboard}
          selectedUserId={selectedUserId}
          onUserSelect={setSelectedUserId}
          onDashboardRename={handleDashboardRename}
          onUpdateDashboardName={sidebarUpdateNameRef}
        />
        <main
          className={cn(
            "flex flex-col items-end flex-1 min-h-0",
            "min-h-[31.25rem] px-8 md:px-[var(--app-spacing,1rem)]",
            "gap-2.5"
          )}
        >
          <div className="w-full max-w-full flex-1 flex flex-col">
            {selectedCustomCanvasState && (
              <DashboardHeader
                dashboardName={selectedDashboardName}
                onNameChange={handleNameChangeFromHeader}
              />
            )}
            <div className="flex-1">
              <EmbeddableRenderer customCanvasState={selectedCustomCanvasState} userEmail={selectedUserEmail} />
            </div>
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
