"use client";

import { useState } from "react";
import { cn, classes } from "../lib/utils";
import { IconPencil, IconBrush } from "@tabler/icons-react";
import Select from "./Select";

interface DashboardHeaderProps {
  dashboardName: string;
  onNameChange: (name: string) => void;
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

/**
 * Available theme options for the dashboard
 * Extracted as a constant for reusability and maintainability
 */
export const THEME_OPTIONS = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
] as const;

export default function DashboardHeader({
  dashboardName,
  onNameChange,
  selectedTheme,
  onThemeChange,
}: DashboardHeaderProps) {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [editedDashboardName, setEditedDashboardName] = useState<string>("");

  const handleEditClick = () => {
    setEditedDashboardName(dashboardName);
    setIsNameEditing(true);
  };

  const handleNameBlur = () => {
    if (editedDashboardName.trim()) {
      onNameChange(editedDashboardName.trim());
    }
    setIsNameEditing(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameBlur();
    } else if (e.key === "Escape") {
      setEditedDashboardName(dashboardName);
      setIsNameEditing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2 md:gap-0">
      {/* Dashboard name - hidden on mobile and tablet, only show on desktop */}
      <div className="hidden lg:flex items-center gap-2">
        {isNameEditing ? (
          <input
            type="text"
            value={editedDashboardName}
            onChange={(e) => setEditedDashboardName(e.target.value)}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyDown}
            autoFocus
            className={cn(
              "outline-none border-none bg-transparent",
              classes.textMedium
            )}
          />
        ) : (
          <>
            <h2 className={classes.textMedium}>{dashboardName}</h2>
            <button
              onClick={handleEditClick}
              className="cursor-pointer p-1 hover:opacity-70 transition-opacity"
              aria-label="Edit dashboard name"
            >
              <IconPencil size={16} />
            </button>
          </>
        )}
      </div>
      <div
        className={cn(
          "flex flex-none w-full",
          "md:ml-auto md:w-1/2",
          "lg:w-[calc((2/12)/(9/12)*100%)]",
          classes.selectMenuWrapper
        )}
      >
        <Select
          leftIcon={IconBrush}
          className="w-full"
          value={selectedTheme}
          onChange={(e) => onThemeChange(e.target.value)}
        >
          {THEME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
