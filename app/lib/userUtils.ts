import { Permission } from "../components/PermissionsModal";
import { users, getAllUserIds, type UserId } from "../components/Sidebar";

/**
 * Converts a UserId to its corresponding email address
 * Uses the users array as the single source of truth
 */
export const getEmailFromUserId = (userId: UserId): string => {
  const user = users.find((u) => u.id === userId);
  return user?.mail || users[0]?.mail || "";
};

/**
 * Creates default permissions object for all users
 * All users get "readonly" by default
 */
export const createDefaultPermissions = (): Record<UserId, Permission> => {
  const allUserIds = getAllUserIds();
  const permissions: Record<UserId, Permission> = {} as Record<UserId, Permission>;
  
  allUserIds.forEach((userId) => {
    permissions[userId] = "readonly";
  });
  
  return permissions;
};

/**
 * Ensures all users are included in permissions object
 * Fills in missing users with the provided default permission
 */
export const ensureCompletePermissions = (
  permissions: Partial<Record<UserId, Permission>>,
  defaultPermission: Permission = "no access"
): Record<UserId, Permission> => {
  const allUserIds = getAllUserIds();
  const completePermissions: Record<UserId, Permission> = {} as Record<UserId, Permission>;
  
  allUserIds.forEach((userId) => {
    completePermissions[userId] = permissions[userId] || defaultPermission;
  });
  
  return completePermissions;
};

