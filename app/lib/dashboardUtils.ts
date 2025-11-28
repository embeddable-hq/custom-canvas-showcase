import { type TDashboardItem, type UserId } from "../components/Sidebar";
import { users, type User, getAllUserIds } from "../../utils/constants";
import {
  PERMISSION_WRITE,
  PERMISSION_READONLY,
  PERMISSION_NO_ACCESS,
  type Permission,
} from "../components/PermissionsModal";
import { createDefaultPermissions } from "./userUtils";
import { STORAGE_KEY_DASHBOARD_PERMISSIONS } from "../../utils/constants";

/**
 * Generates a unique random ID for dashboards
 * Uses crypto.randomUUID if available, otherwise falls back to timestamp + random
 */
export const generateDashboardId = (): string => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Gets users with access to a dashboard based on permissions
 * Returns users with "write" or "readonly" access, or all users if no permissions set
 */
export const getUsersWithAccess = (
  dashboard: TDashboardItem
): User[] => {
  if (!dashboard.permissions) {
    // If no permissions set, show all users from dashboard.users
    return dashboard.users
      .map((userId) => users.find((u) => u.id === userId))
      .filter((u): u is User => u !== undefined);
  }

  // Filter based on permissions
  return (Object.keys(dashboard.permissions) as UserId[])
    .filter(
      (userId) =>
        dashboard.permissions![userId] === PERMISSION_WRITE ||
        dashboard.permissions![userId] === PERMISSION_READONLY
    )
    .map((userId) => users.find((u) => u.id === userId))
    .filter((u): u is User => u !== undefined);
};

/**
 * Gets the default dashboards configuration
 */
export const getDefaultDashboards = (): TDashboardItem[] => {
  const allUserIds = getAllUserIds();
  const defaultPermissions = createDefaultPermissions();
  const dashboardId = generateDashboardId();
  
  return [
    {
      id: dashboardId,
      name: "Dashboard 1",
      users: allUserIds,
      state: `customCanvasState${dashboardId}`,
      permissions: defaultPermissions,
    },
  ];
};

/**
 * Loads dashboards from session storage
 * Returns default dashboards if storage is unavailable or empty
 */
export const loadDashboardsFromStorage = (): TDashboardItem[] => {
  if (typeof window === "undefined") {
    return getDefaultDashboards();
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY_DASHBOARD_PERMISSIONS);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed;
    }
  } catch (error) {
    console.error("Error loading dashboards from session storage:", error);
  }
  
  return getDefaultDashboards();
};

/**
 * Loads dashboards asynchronously with a small delay to prevent flash
 */
export const loadDashboardsAsync = (): Promise<TDashboardItem[]> => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        resolve(loadDashboardsFromStorage());
      });
    } else {
      resolve(getDefaultDashboards());
    }
  });
};

/**
 * Saves dashboards to session storage
 */
export const saveDashboardsToStorage = (dashboards: TDashboardItem[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(
      STORAGE_KEY_DASHBOARD_PERMISSIONS,
      JSON.stringify(dashboards)
    );
  } catch (error) {
    console.error("Error saving dashboards to session storage:", error);
  }
};

/**
 * Filters dashboards based on selected user and their permissions
 */
export const filterDashboardsByUser = (
  dashboards: TDashboardItem[],
  selectedUserId: UserId
): TDashboardItem[] => {
  return dashboards.filter((dashboard) => {
    // If dashboard has permissions object, check the selected user's permission
    if (dashboard.permissions) {
      const userPermission = dashboard.permissions[selectedUserId];
      // If permission exists and is not "no access", show the dashboard
      return userPermission && userPermission !== PERMISSION_NO_ACCESS;
    }
    // If no permissions set, fall back to checking users array
    return dashboard.users.includes(selectedUserId);
  });
};

/**
 * Creates a new dashboard with default permissions
 */
export const createNewDashboard = (
  dashboardNumber: number,
  allUserIds: UserId[],
  defaultPermissions: Record<UserId, Permission>
): TDashboardItem => {
  const dashboardId = generateDashboardId();
  const usersWithAccess = allUserIds.filter(
    (userId) => defaultPermissions[userId] !== PERMISSION_NO_ACCESS
  );

  return {
    id: dashboardId,
    name: `Dashboard ${dashboardNumber}`,
    users: usersWithAccess,
    state: `customCanvasState${dashboardId}`,
    permissions: defaultPermissions,
  };
};

