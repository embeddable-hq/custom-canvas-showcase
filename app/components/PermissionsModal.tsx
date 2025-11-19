"use client";

import { useState } from "react";
import { cn } from "../lib/utils";
import { spacing, borders, colors, typography } from "../lib/tokens";
import { users, type UserId, type TDashboardItem, getAllUserIds } from "./Sidebar";
import { createDefaultPermissions } from "../lib/userUtils";
import CloseButton from "./CloseButton";
import Select from "./Select";

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
        permissions[userId] = dashboard.permissions?.[userId] || "readonly";
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

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50"
      onClick={handleCancel}
    >
      <div
        className={cn(
          "flex flex-col items-start",
          "w-[24.5rem]",
          "rounded-[var(--em-form-border-radius-default,2rem)]",
          "bg-[var(--em-sem-background-neutral,#FFF)]"
        )}
        style={{
          padding: "calc(var(--app-spacing, 1rem) * 2)",
          gap: "calc(var(--app-spacing, 1rem) * 2)",
          boxShadow: "var(--em-core-shadow-default-position-x, 0) var(--em-core-shadow-default-position-y, 1px) var(--em-core-shadow-default-blur, 40px) var(--em-core-shadow-default-spread, 0) var(--em-core-shadow-default-color, rgba(33, 33, 41, 0.25))",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between w-full"
          )}
        >
          <h2
            className={cn(
              typography.fontSize.md,
              typography.fontWeight.bold,
              "text-[var(--foreground)]"
            )}
          >
            Edit Permissions
          </h2>
          <CloseButton onClick={handleCancel} ariaLabel="Close modal" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 w-full">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col gap-3 w-full">
              <span
                className={cn(
                  typography.fontSize.sm,
                  typography.fontWeight.medium,
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
        </div>

        {/* Footer - Save button only */}
        <button
          onClick={handleSave}
          className={cn(
            "flex justify-center items-center self-stretch",
            spacing.core.md,
            borders.radius.button,
            colors.button.primaryBackground,
            "text-white",
            typography.fontSize.sm,
            typography.fontWeight.medium,
            typography.lineHeight.md,
            "cursor-pointer",
            "transition-colors",
            "hover:opacity-90",
            "w-full",
            typography.fontFamily.interPlain
          )}
        >
          Save
        </button>
      </div>
    </div>
  );
}
