"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { components } from "../lib/tokens";
import Image from "next/image";
import Select from "./Select";

interface DashboardHeaderProps {
  dashboardName: string;
  onNameChange: (name: string) => void;
}

export default function DashboardHeader({
  dashboardName,
  onNameChange,
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
      {/* Dashboard name - hidden on mobile */}
      <div className="hidden md:flex items-center gap-2">
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
      {/* Dropdown - full width on mobile, auto width on desktop */}
      <div className="w-full md:w-auto">
        <Select
          leftIcon={{
            src: "/pen.svg",
            alt: "",
            width: 16,
            height: 16,
          }}
          className="w-full"
          defaultValue=""
        >
          <option value="" disabled>
            Change theme
          </option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </Select>
      </div>
    </div>
  );
}

