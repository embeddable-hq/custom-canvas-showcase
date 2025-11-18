"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
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
            style={{
              color: "var(--em-sem-text-default, #212129)",
              fontFamily: "Inter",
              fontSize: "var(--em-font-size-md, 1rem)",
              fontStyle: "normal",
              fontWeight: "var(--em-font-weight-bold, 700)",
              lineHeight: "var(--em-line-height-l, 1.1875rem)",
            }}
          />
        ) : (
          <>
            <h2
              style={{
                color: "var(--em-sem-text-default, #212129)",
                fontFamily: "Inter",
                fontSize: "var(--em-font-size-md, 1rem)",
                fontStyle: "normal",
                fontWeight: "var(--em-font-weight-bold, 700)",
                lineHeight: "var(--em-line-height-l, 1.1875rem)",
              }}
            >
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
          className="absolute left-[var(--em-sl-menu-padding-default,0.75rem)] top-1/2 -translate-y-1/2 pointer-events-none z-10"
        />
        <select
          className={cn(
            "flex items-center",
            "appearance-none",
            "cursor-pointer",
            "bg-no-repeat bg-right",
            "h-[var(--em-sl-menu-size-height-default,2.5rem)]",
            "min-w-[var(--em-select-menu-size-width-min-width,4rem)]",
            "max-w-[var(--em-select-menu-size-width-max-width,25rem)]",
            "p-[var(--em-sl-menu-padding-default,0.75rem)]",
            "pl-[calc(var(--em-sl-menu-padding-default,0.75rem)+1.5rem)]",
            "pr-[calc(var(--em-sl-menu-padding-default,0.75rem)+2rem)]",
            "text-[var(--em-sl-menu-label-text-default,#212129)]",
            "font-[var(--em-sl-menu-label-font-family,Inter)]",
            "text-[length:var(--em-sl-menu-label-font-size,0.75rem)]",
            "font-normal",
            "leading-[var(--em-sl-menu-label-font-line-height,0.875rem)]"
          )}
          style={{
            borderRadius: "var(--em-sl-menu-border-radius-default, 0.5rem)",
            border: "var(--em-sl-menu-border-width-default, 1px) solid var(--em-sl-menu-border-color-default, #D2D2D5)",
            background: "var(--em-sl-menu-background-color-default, #FFF)",
            fontWeight: "var(--em-sl-menu-label-font-weight, 500)",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundPosition: "right var(--em-sl-menu-padding-default, 0.75rem) center",
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

