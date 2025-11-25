"use client";

import { useState } from "react";
import { cn, classes } from "../lib/utils";
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
    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2 md:gap-0">
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
            className={cn("outline-none border-none bg-transparent", classes.textMedium)}
          />
        ) : (
          <>
            <h2 className={classes.textMedium}>
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
      <div 
        className={cn("flex md:ml-auto w-full md:w-1/2 lg:w-[calc((2/12)/(9/12)*100%)] flex-none", classes.selectMenuWrapper)}
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

