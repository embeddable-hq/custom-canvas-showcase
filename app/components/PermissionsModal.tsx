"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { type TDashboardItem } from "./Sidebar";
import { users, type UserId, getAllUserIds } from "../../utils/constants";
import { createDefaultPermissions } from "../lib/userUtils";
import Select from "./Select";
import Modal from "./Modal";

export type Permission = "write" | "readonly" | "no access";

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
        permissions[userId] = dashboard.permissions?.[userId] || "write";
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
      title="Edit Permissions"
      buttonText="Save"
      onButtonClick={handleSave}
    >
      {users.map((user) => (
        <div key={user.id} className="flex flex-col gap-3 w-full">
          <span
            className={cn(
              "text-sm font-medium",
              "text-[var(--foreground)]"
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
            <option value="write">Write</option>
            <option value="readonly">Readonly</option>
            <option value="no access">No access</option>
          </Select>
        </div>
      ))}
    </Modal>
  );
}
