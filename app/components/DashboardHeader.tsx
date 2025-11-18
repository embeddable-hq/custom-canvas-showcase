"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { components, selectMenu } from "../lib/tokens";
import Image from "next/image";

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
    <div className="flex justify-between items-center w-full mb-4">
      <div className="flex items-center gap-2">
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
      <div className="relative">
        <Image
          src="/pen.svg"
          alt=""
          width={16}
          height={16}
          className={`absolute ${selectMenu.iconPosition} top-1/2 -translate-y-1/2 pointer-events-none z-10`}
        />
        <select
          className={cn(selectMenu.className)}
          style={{
            ...selectMenu.style,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundSize: "12px 12px",
            backgroundRepeat: "no-repeat",
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Change theme
          </option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
    </div>
  );
}

