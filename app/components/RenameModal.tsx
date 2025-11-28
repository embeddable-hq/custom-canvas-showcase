"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { borders } from "../lib/tokens";
import { type TDashboardItem } from "./Sidebar";
import Modal from "./Modal";
import {
  RENAME_MODAL_TITLE,
  RENAME_MODAL_BUTTON_TEXT,
  RENAME_MODAL_PLACEHOLDER,
} from "../lib/modalConstants";

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
  const [newDashboardName, setNewDashboardName] = useState<string>(() => {
    return dashboard?.name || "";
  });

  if (!isOpen || !dashboard) return null;

  const handleSave = () => {
    if (newDashboardName.trim() && newDashboardName.trim() !== dashboard.name) {
      onSave(dashboard, newDashboardName.trim());
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
      title={RENAME_MODAL_TITLE}
      buttonText={RENAME_MODAL_BUTTON_TEXT}
      onButtonClick={handleSave}
      buttonDisabled={!newDashboardName.trim() || newDashboardName.trim() === dashboard.name}
    >
      <input
        type="text"
        value={newDashboardName}
        onChange={(e) => setNewDashboardName(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          "px-3 py-2 rounded-md border",
          borders.radius.sm,
          "text-sm",
          "bg-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "w-full"
        )}
        placeholder={RENAME_MODAL_PLACEHOLDER}
        autoFocus
      />
    </Modal>
  );
}

