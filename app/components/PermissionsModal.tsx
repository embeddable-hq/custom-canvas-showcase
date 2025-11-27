"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { colors } from "../lib/tokens";
import { type TDashboardItem } from "./Sidebar";
import { users, type UserId, getAllUserIds } from "../../utils/constants";
import { createDefaultPermissions } from "../lib/userUtils";
import Select from "./Select";
import Modal from "./Modal";

export const PERMISSION_WRITE = "write" as const;
export const PERMISSION_READONLY = "readonly" as const;
export const PERMISSION_NO_ACCESS = "no access" as const;

export type Permission = typeof PERMISSION_WRITE | typeof PERMISSION_READONLY | typeof PERMISSION_NO_ACCESS;

const PERMISSION_OPTIONS = [
  { value: PERMISSION_WRITE, label: "Write" },
  { value: PERMISSION_READONLY, label: "Readonly" },
  { value: PERMISSION_NO_ACCESS, label: "No access" },
] as const;

const PERMISSIONS_MODAL_TITLE = "Edit Permissions";
const PERMISSIONS_MODAL_BUTTON_TEXT = "Save";

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboard: TDashboardItem | null;
  onSave: (
    dashboard: TDashboardItem,
    permissions: Record<UserId, Permission>
  ) => void;
}

export default function PermissionsModal({
  isOpen,
  onClose,
  dashboard,
  onSave,
}: PermissionsModalProps) {

  const [permissions, setPermissions] = useState<Record<UserId, Permission>>(() => {
    if (dashboard?.permissions) {
      const allUserIds = getAllUserIds();
      const permissions: Record<UserId, Permission> = {} as Record<UserId, Permission>;
      
      allUserIds.forEach((userId) => {
        permissions[userId] = dashboard.permissions?.[userId] || PERMISSION_WRITE;
      });
      
      return permissions;
    }
    return createDefaultPermissions();
  });

  if (!isOpen || !dashboard) return null;

  const handlePermissionChange = (userId: UserId, permission: Permission) => {
    setPermissions((prev) => ({
      ...prev,
      [userId]: permission,
    }));
  };

  const handleSave = () => {
    onSave(dashboard, permissions);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen && !!dashboard}
      onClose={onClose}
      title={PERMISSIONS_MODAL_TITLE}
      buttonText={PERMISSIONS_MODAL_BUTTON_TEXT}
      onButtonClick={handleSave}
    >
      {users.map((user) => (
        <div key={user.id} className="flex flex-col gap-3 w-full">
          <span
            className={cn(
              "text-sm font-medium",
              colors.foreground.text
            )}
          >
            {user.mail}
          </span>
          <Select
            value={permissions[user.id]}
            onChange={(e) =>
              handlePermissionChange(
                user.id,
                e.target.value as Permission
              )
            }
            className="w-full"
          >
            {PERMISSION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </Modal>
  );
}
