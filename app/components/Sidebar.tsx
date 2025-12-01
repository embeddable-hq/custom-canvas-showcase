"use client";

import { useState, useEffect } from "react";
import { cn, classes } from "../lib/utils";
import {
  spacing,
  borders,
  colors,
  sidebar as sidebarTokens,
} from "../lib/tokens";
import {
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import PermissionsModal, {
  type Permission,
  PERMISSION_NO_ACCESS,
} from "./PermissionsModal";
import RenameModal from "./RenameModal";
import {
  getEmailFromUserId,
  createDefaultPermissions,
  ensureCompletePermissions,
} from "../lib/userUtils";
import CloseButton from "./CloseButton";
import {
  getAllUserIds,
  type UserId,
  HELP_ITEMS,
  STORAGE_KEY_DASHBOARD_PERMISSIONS,
} from "../../utils/constants";
import {
  getUsersWithAccess,
  loadDashboardsAsync,
  saveDashboardsToStorage,
  filterDashboardsByUser,
  createNewDashboard,
} from "../lib/dashboardUtils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: string[];
  selectedNavItem: string;
  userAvatarClass?: string;
  selectedCustomCanvasState: string;
  onDashboardSelect: (dashboard: TDashboardItem, userEmail: string) => void;
  selectedUserId: UserId;
  onUserSelect: (userId: UserId) => void;
  onDashboardRename?: (dashboardId: string, newName: string) => void;
  onUpdateDashboardName?: React.MutableRefObject<
    ((state: string, name: string) => void) | null
  >;
  onPermissionsUpdate?: (dashboard: TDashboardItem) => void;
}

// User types are now exported from constants
export type { UserId, User } from "../../utils/constants";
export { users, getAllUserIds } from "../../utils/constants";

export interface TDashboardItem {
  id: string;
  name: string;
  users: UserId[];
  state: string;
  permissions?: Record<UserId, Permission>;
}

export function DashboardItem({
  dashboard,
  onSelect,
  isSelected,
  selectedUserId,
  onEditPermissions,
  onRename,
  onDelete,
}: {
  dashboard: TDashboardItem;
  onSelect: (dashboard: TDashboardItem, userEmail: string) => void;
  isSelected?: boolean;
  selectedUserId?: UserId;
  onEditPermissions?: (dashboard: TDashboardItem) => void;
  onRename?: (dashboard: TDashboardItem) => void;
  onDelete?: (dashboard: TDashboardItem) => void;
}) {
  const usersWithAccess = getUsersWithAccess(dashboard);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Use the selectedUserId if provided and has access, otherwise use the first user with access
    let selectedUserIdForDashboard: UserId | undefined = selectedUserId;

    // Check if selectedUserId has access to this dashboard
    if (dashboard.permissions && selectedUserId) {
      const userPermission = dashboard.permissions[selectedUserId];
      if (userPermission === PERMISSION_NO_ACCESS) {
        selectedUserIdForDashboard = undefined;
      }
    }

    // If no valid user, use the first user with access
    if (!selectedUserIdForDashboard && usersWithAccess.length > 0) {
      selectedUserIdForDashboard = usersWithAccess[0].id;
    }

    if (selectedUserIdForDashboard) {
      const userEmail = getEmailFromUserId(selectedUserIdForDashboard);
      onSelect(dashboard, userEmail);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center gap-2.5",
        spacing.core.md,
        "self-stretch",
        borders.radius.sm,
        "transition-colors cursor-pointer",
        isSelected ? colors.semantic.backgroundSubtle : "hover:bg-black/5"
      )}
    >
      <div className={cn("no-underline flex-1", classes.textSmall)}>
        {dashboard.name}
      </div>
      {usersWithAccess.length > 0 && (
        <div className="flex items-center gap-1">
          {usersWithAccess.slice(0, 3).map((user) => (
            <UserAvatar key={user.id} user={user} showTooltip={false} />
          ))}
        </div>
      )}
      <Dropdown
        trigger={
          <button
            className="cursor-pointer p-1 rounded"
            aria-label="More options"
          >
            <IconDotsVertical className="w-4 h-4" />
          </button>
        }
        items={[
          {
            label: "Edit permissions",
            onClick: () => onEditPermissions?.(dashboard),
            icon: IconUser,
          },
          { type: "separator" },
          {
            label: "Rename",
            onClick: () => onRename?.(dashboard),
            icon: IconPencil,
          },
          {
            label: "Delete",
            onClick: () => onDelete?.(dashboard),
            icon: IconTrash,
            className: colors.semantic.textError,
          },
        ]}
        position="bottom"
        align="end"
      />
    </div>
  );
}

export default function Sidebar({
  isOpen,
  onClose,
  navItems,
  selectedNavItem,
  onDashboardSelect,
  selectedCustomCanvasState,
  selectedUserId,
  onUserSelect,
  onDashboardRename,
  onUpdateDashboardName,
  onPermissionsUpdate,
}: SidebarProps) {
  const [dashboards, setDashboards] = useState<TDashboardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [selectedDashboardForPermissions, setSelectedDashboardForPermissions] =
    useState<TDashboardItem | null>(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [selectedDashboardForRename, setSelectedDashboardForRename] =
    useState<TDashboardItem | null>(null);
  const [pendingPermissionsUpdate, setPendingPermissionsUpdate] =
    useState<TDashboardItem | null>(null);

  // Load dashboards from storage on mount
  useEffect(() => {
    const wasStorageEmpty = typeof window === "undefined" || 
      !sessionStorage.getItem(STORAGE_KEY_DASHBOARD_PERMISSIONS);
    
    loadDashboardsAsync().then((loadedDashboards) => {
      setDashboards(loadedDashboards);
      setIsLoading(false);
      if (wasStorageEmpty && loadedDashboards.length > 0) {
        saveDashboardsToStorage(loadedDashboards);
      }
    });
  }, []);

  // Expose function to update dashboard name by state
  useEffect(() => {
    if (onUpdateDashboardName) {
      onUpdateDashboardName.current = (state: string, name: string) => {
        const updatedDashboards = dashboards.map((d) =>
          d.state === state ? { ...d, name } : d
        );
        setDashboards(updatedDashboards);
        saveDashboardsToStorage(updatedDashboards);
      };
    }
  }, [onUpdateDashboardName, dashboards]);

  // Filter dashboards based on selected user and their permissions
  const filteredDashboards = filterDashboardsByUser(dashboards, selectedUserId);

  // Only select the first dashboard on initial mount after loading completes
  useEffect(() => {
    if (
      !isLoading &&
      filteredDashboards.length > 0 &&
      !selectedCustomCanvasState
    ) {
      const userEmail = getEmailFromUserId(selectedUserId);
      onDashboardSelect(filteredDashboards[0], userEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]); // Run when loading completes

  // When user changes, check if current dashboard is still available
  // If not, select the first available dashboard
  useEffect(() => {
    if (filteredDashboards.length > 0 && selectedCustomCanvasState) {
      const isCurrentDashboardAvailable = filteredDashboards.some(
        (d) => d.state === selectedCustomCanvasState
      );

      // If current dashboard is not in filtered list, select first available
      if (!isCurrentDashboardAvailable) {
        const userEmail = getEmailFromUserId(selectedUserId);
        onDashboardSelect(filteredDashboards[0], userEmail);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserId]);

  const onAddDashboard = () => {
    const defaultPermissions = createDefaultPermissions();
    const allUserIds = getAllUserIds();
    const dashboardNumber = dashboards.length + 1;

    const newDashboard = createNewDashboard(
      dashboardNumber,
      allUserIds,
      defaultPermissions
    );
    
    const updatedDashboards = [...dashboards, newDashboard];
    setDashboards(updatedDashboards);
    saveDashboardsToStorage(updatedDashboards);

    // Select the newly added dashboard using the currently selected user
    const userEmail = getEmailFromUserId(selectedUserId);
    onDashboardSelect(newDashboard, userEmail);
  };

  const handleEditPermissions = (dashboard: TDashboardItem) => {
    setSelectedDashboardForPermissions(dashboard);
    setPermissionsModalOpen(true);
  };

  const handleRename = (dashboard: TDashboardItem) => {
    setSelectedDashboardForRename(dashboard);
    setRenameModalOpen(true);
  };

  const handleSaveRename = (dashboard: TDashboardItem, newName: string) => {
    const updatedDashboards = dashboards.map((d) =>
      d.id === dashboard.id ? { ...d, name: newName } : d
    );
    setDashboards(updatedDashboards);
    saveDashboardsToStorage(updatedDashboards);

    // Notify parent about rename if this is the currently selected dashboard
    if (dashboard.state === selectedCustomCanvasState) {
      onDashboardRename?.(dashboard.id, newName);
    }
  };

  const handleDelete = (dashboard: TDashboardItem) => {
    const updatedDashboards = dashboards.filter((d) => d.id !== dashboard.id);
    setDashboards(updatedDashboards);
    saveDashboardsToStorage(updatedDashboards);

    // If the deleted dashboard was selected, select the first available dashboard
    if (dashboard.state === selectedCustomCanvasState) {
      if (updatedDashboards.length > 0) {
        const userEmail = getEmailFromUserId(selectedUserId);
        onDashboardSelect(updatedDashboards[0], userEmail);
      }
      // If no dashboards left, the selection will be cleared automatically
      // when filteredDashboards becomes empty
    }
  };

  const handleSavePermissions = (
    dashboard: TDashboardItem,
    permissions: Record<UserId, Permission>
  ) => {
    // Ensure all users are in the permissions object (even if "no access")
    const completePermissions = ensureCompletePermissions(
      permissions,
      PERMISSION_NO_ACCESS
    );

    // Update users array to only include users with "write" or "readonly" access
    const allUserIds = getAllUserIds();
    const usersWithAccess: UserId[] = allUserIds.filter(
      (userId) => completePermissions[userId] !== PERMISSION_NO_ACCESS
    );

    setDashboards((prev) => {
      const updated = prev.map((d) =>
        d.id === dashboard.id
          ? { ...d, permissions: completePermissions, users: usersWithAccess }
          : d
      );
      saveDashboardsToStorage(updated);
      return updated;
    });

    // Store the updated dashboard to notify parent after render
    const updatedDashboard: TDashboardItem = {
      ...dashboard,
      permissions: completePermissions,
      users: usersWithAccess,
    };
    if (updatedDashboard.state === selectedCustomCanvasState) {
      setPendingPermissionsUpdate(updatedDashboard);
    }
  };

  // Notify parent about permissions update after render completes
  useEffect(() => {
    if (pendingPermissionsUpdate) {
      onPermissionsUpdate?.(pendingPermissionsUpdate);
      setPendingPermissionsUpdate(null);
    }
  }, [pendingPermissionsUpdate, onPermissionsUpdate]);


  return (
    <>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-[999]"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        ></div>
      )}
      <aside
        className={cn(
          sidebarTokens.base,
          classes.borderDivider,
          isOpen ? sidebarTokens.translateOpen : sidebarTokens.translateClosed,
          "overflow-hidden lg:overflow-visible"
        )}
        aria-label="Navigation sidebar"
      >
        {/* Mobile close button */}
        <div className="lg:hidden w-full flex justify-end flex-shrink-0">
          <CloseButton onClick={onClose} ariaLabel="Close menu" />
        </div>

        {/* Desktop Navigation */}
        {isLoading ? (
          <div className="hidden lg:flex flex-col w-full gap-4">
            <div className="flex items-center justify-center p-4">
              <div className="text-sm text-gray-500">Loading dashboards...</div>
            </div>
          </div>
        ) : (
          <DesktopNavigation
            dashboards={filteredDashboards}
            selectedCustomCanvasState={selectedCustomCanvasState}
            selectedUserId={selectedUserId}
            onDashboardSelect={onDashboardSelect}
            onAddDashboard={onAddDashboard}
            onEditPermissions={handleEditPermissions}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        )}

        {/* Mobile Navigation */}
        {isLoading ? (
          <div
            className={cn(
              "lg:hidden flex flex-col flex-1 min-h-0 w-full",
              spacing.appGap
            )}
          >
            <div className="flex items-center justify-center p-4">
              <div className="text-sm text-gray-500">Loading dashboards...</div>
            </div>
          </div>
        ) : (
          <div className="lg:hidden flex-1 min-h-0">
            <MobileNavigation
              navItems={navItems}
              selectedItem={selectedNavItem}
              dashboards={filteredDashboards}
              selectedCustomCanvasState={selectedCustomCanvasState}
              selectedUserId={selectedUserId}
              onDashboardSelect={onDashboardSelect}
              onUserSelect={onUserSelect}
              helpItems={HELP_ITEMS}
              onEditPermissions={handleEditPermissions}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          </div>
        )}
      </aside>

      {/* Permissions Modal */}
      <PermissionsModal
        key={selectedDashboardForPermissions?.id}
        isOpen={permissionsModalOpen}
        onClose={() => {
          setPermissionsModalOpen(false);
          setSelectedDashboardForPermissions(null);
        }}
        dashboard={selectedDashboardForPermissions}
        onSave={handleSavePermissions}
      />

      {/* Rename Modal */}
      <RenameModal
        key={selectedDashboardForRename?.id}
        isOpen={renameModalOpen}
        onClose={() => {
          setRenameModalOpen(false);
          setSelectedDashboardForRename(null);
        }}
        dashboard={selectedDashboardForRename}
        onSave={handleSaveRename}
      />
    </>
  );
}
