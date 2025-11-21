"use client";

import { useState, useCallback, useRef } from "react";
import { cn, classes } from "./lib/utils";
import Header from "./components/Header";
import Sidebar, {
  type TDashboardItem,
} from "./components/Sidebar";
import { users, type UserId } from "../utils/constants";
import Embeddable from "./components/Embeddable";
import DashboardHeader from "./components/DashboardHeader";
import { getEmailFromUserId } from "./lib/userUtils";
import { NAV_ITEMS, DEFAULT_SELECTED_NAV_ITEM } from "../utils/constants";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState<TDashboardItem | null>(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("red");
  // Initialize with first user from users array
  const [selectedUserId, setSelectedUserId] = useState<UserId>(
    users[0]?.id || "denis"
  );

  // Derive state from selectedDashboard
  const selectedCustomCanvasState = selectedDashboard?.state || "";
  const selectedDashboardName = selectedDashboard?.name || "";
  const navItems = NAV_ITEMS;
  const selectedNavItem = DEFAULT_SELECTED_NAV_ITEM;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSelectDashboard = useCallback(
    (dashboard: TDashboardItem, userEmail: string) => {
      setSelectedDashboard(dashboard);
      setSelectedUserEmail(userEmail);
    },
    []
  );

  const handleDashboardRename = useCallback(
    (dashboardId: string, newName: string) => {
      // Update the selected dashboard name if it's the current one
      if (selectedDashboard && selectedDashboard.id === dashboardId) {
        setSelectedDashboard({ ...selectedDashboard, name: newName });
      }
    },
    [selectedDashboard]
  );

  const handlePermissionsUpdate = useCallback(
    (dashboard: TDashboardItem) => {
      // If the updated dashboard is the currently selected one, update our state
      // This will trigger a token refresh with the new readonly status
      if (selectedDashboard && dashboard.id === selectedDashboard.id) {
        setSelectedDashboard(dashboard);
      }
    },
    [selectedDashboard]
  );

  const sidebarUpdateNameRef = useRef<
    ((state: string, name: string) => void) | null
  >(null);

  const handleNameChangeFromHeader = useCallback(
    (newName: string) => {
      // Update the selected dashboard name
      if (selectedDashboard) {
        setSelectedDashboard({ ...selectedDashboard, name: newName });
        // Update the dashboard in Sidebar
        if (sidebarUpdateNameRef.current && selectedDashboard.state) {
          sidebarUpdateNameRef.current(selectedDashboard.state, newName);
        }
      }
    },
    [selectedDashboard]
  );

  const handleThemeChange = useCallback((theme: string) => {
    setSelectedTheme(theme);
  }, []);

  // Handle user selection - update email to trigger new token fetch
  const handleUserSelect = useCallback(
    (userId: UserId) => {
      setSelectedUserId(userId);
      // Update user email immediately to trigger new token fetch
      if (selectedDashboard) {
        const userEmail = getEmailFromUserId(userId);
        setSelectedUserEmail(userEmail);
      }
    },
    [selectedDashboard]
  );
  return (
    <div
      className="flex flex-col min-h-screen w-full bg-white"
      style={{
        maxWidth: "var(--page-max-width, 100%)",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Header
        onMenuClick={toggleSidebar}
        navItems={navItems}
        selectedNavItem={selectedNavItem}
        selectedUserId={selectedUserId}
        onUserSelect={handleUserSelect}
      />
      <div
        className="grid flex-1 min-w-0 min-h-0"
        style={{
          gridTemplateColumns: "repeat(var(--grid-columns, 4), minmax(0, 1fr))",
          gap: "var(--app-spacing)",
        }}
      >
        <Sidebar
          selectedCustomCanvasState={selectedCustomCanvasState}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          navItems={navItems}
          selectedNavItem={selectedNavItem}
          onDashboardSelect={handleSelectDashboard}
          selectedUserId={selectedUserId}
          onUserSelect={handleUserSelect}
          onDashboardRename={handleDashboardRename}
          onUpdateDashboardName={sidebarUpdateNameRef}
          onPermissionsUpdate={handlePermissionsUpdate}
        />
        <main
          className={cn(
            "flex flex-col min-h-0",
            "min-h-[31.25rem]",
            "gap-2.5",
            "col-span-4 md:col-span-8 lg:col-span-9"
          )}
          style={{
            paddingLeft: "var(--app-spacing, 1rem)",
            paddingRight: "var(--app-spacing, 1rem)",
          }}
        >
          <div className="flex-1 flex flex-col w-full">
            {selectedCustomCanvasState && (
              <DashboardHeader
                dashboardName={selectedDashboardName}
                onNameChange={handleNameChangeFromHeader}
                selectedTheme={selectedTheme}
                onThemeChange={handleThemeChange}
              />
            )}
            <div className="flex-1">
              <Embeddable
                customCanvasState={selectedCustomCanvasState}
                userEmail={selectedUserEmail}
                customCanvasReadOnly={
                  selectedDashboard?.permissions?.[selectedUserId] === "readonly"
                }
                theme={selectedTheme}
              />
            </div>
          </div>
          <footer
            className={cn(
              "flex justify-center items-center self-stretch mt-auto",
              "gap-2.5",
              classes.appPadding,
              classes.footerText
            )}
          >
            © 2025 TMD Technology Limited. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
