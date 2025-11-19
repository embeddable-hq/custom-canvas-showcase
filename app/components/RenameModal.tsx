"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { borders } from "../lib/tokens";
import { type TDashboardItem } from "./Sidebar";
import Modal from "./Modal";

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboard: TDashboardItem | null;
  onSave: (dashboard: TDashboardItem, newName: string) => void;
}

export default function RenameModal({
  isOpen,
  onClose,
  dashboard,
  onSave,
}: RenameModalProps) {
  // Initialize state with lazy initializer
  // State will reset automatically when key (dashboard.id) changes in parent
  const [newName, setNewName] = useState<string>(() => {
    return dashboard?.name || "";
  });

  if (!isOpen || !dashboard) return null;

  const handleSave = () => {
    if (newName.trim() && newName.trim() !== dashboard.name) {
      onSave(dashboard, newName.trim());
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen && !!dashboard}
      onClose={onClose}
      title="Rename Dashboard"
      buttonText="Rename Dashboard"
      onButtonClick={handleSave}
      buttonDisabled={!newName.trim() || newName.trim() === dashboard.name}
    >
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "px-3 py-2 rounded-md border",
          borders.radius.sm,
          "text-sm",
          "bg-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "w-full"
        )}
        placeholder="Enter dashboard name"
        autoFocus
      />
    </Modal>
  );
}

