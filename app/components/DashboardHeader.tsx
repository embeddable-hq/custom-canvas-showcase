"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { components } from "../lib/tokens";
import Image from "next/image";
import Select from "./Select";

interface DashboardHeaderProps {
  dashboardName: string;
  onNameChange: (name: string) => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function DashboardHeader({
  dashboardName,
  onNameChange,
  selectedTheme,
  onThemeChange,
}: DashboardHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState<string>("");

  const handleEditClick = () => {
    setEditedName(dashboardName);
    setIsEditingName(true);
  };

  const handleNameBlur = () => {
    if (editedName.trim()) {
      onNameChange(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameBlur();
    } else if (e.key === "Escape") {
      setEditedName(dashboardName);
      setIsEditingName(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full mb-4 gap-2 md:gap-0">
      {/* Dashboard name - hidden on mobile and tablet, only show on desktop */}
      <div className="hidden lg:flex items-center gap-2">
        {isEditingName ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            autoFocus
            className="outline-none border-none bg-transparent"
            style={components.textStyles.medium}
          />
        ) : (
          <>
            <h2 style={components.textStyles.medium}>
              {dashboardName || "Dashboard"}
            </h2>
            <button
              onClick={handleEditClick}
              className="cursor-pointer p-1 hover:opacity-70 transition-opacity"
              aria-label="Edit dashboard name"
            >
              <Image src="/edit.svg" alt="Edit" width={16} height={16} />
            </button>
          </>
        )}
      </div>
      {/* Dropdown - always right-aligned */}
      <div 
        className="flex md:ml-auto"
        style={{
          height: 'var(--em-sl-menu-size-height-default, 2.5rem)',
          minWidth: 'var(--em-select-menu-size-width-min-width, 4rem)',
          maxWidth: 'var(--em-select-menu-size-width-max-width, 25rem)',
          padding: 'var(--em-sl-menu-padding-default, 0.75rem)',
          alignItems: 'center',
          flex: '1 0 0',
        }}
      >
        <Select
          leftIcon={{
            src: "/pen.svg",
            alt: "",
            width: 16,
            height: 16,
          }}
          className="w-full"
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          <option value="red">Red</option>
          <option value="green">Green</option>
        </Select>
      </div>
    </div>
  );
}

