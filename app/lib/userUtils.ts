import { Permission, PERMISSION_WRITE, PERMISSION_NO_ACCESS } from "../components/PermissionsModal";
import { users, getAllUserIds, type UserId } from "../../utils/constants";

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
 * All users get "write" by default
 */
export const createDefaultPermissions = (): Record<UserId, Permission> => {
  const allUserIds = getAllUserIds();
  const permissions: Record<UserId, Permission> = {} as Record<UserId, Permission>;
  
  allUserIds.forEach((userId) => {
    permissions[userId] = PERMISSION_WRITE;
  });
  
  return permissions;
};

/**
 * Ensures all users are included in permissions object
 * Fills in missing users with the provided default permission
 */
export const ensureCompletePermissions = (
  permissions: Partial<Record<UserId, Permission>>,
  defaultPermission: Permission = PERMISSION_NO_ACCESS
): Record<UserId, Permission> => {
  const allUserIds = getAllUserIds();
  const completePermissions: Record<UserId, Permission> = {} as Record<UserId, Permission>;
  
  allUserIds.forEach((userId) => {
    completePermissions[userId] = permissions[userId] || defaultPermission;
  });
  
  return completePermissions;
};

/**
 * Gets default permissions for editing
 * If existing permissions are provided, merges them with all users (filling missing with write access)
 * Otherwise returns default permissions for all users (write access)
 */
export const getDefaultPermissions = (
  existingPermissions?: Record<UserId, Permission>
): Record<UserId, Permission> => {
  if (existingPermissions) {
    const allUserIds = getAllUserIds();
    const permissions: Record<UserId, Permission> = {} as Record<UserId, Permission>;
    
    allUserIds.forEach((userId) => {
      permissions[userId] = existingPermissions[userId] || PERMISSION_WRITE;
    });
    
    return permissions;
  }
  return createDefaultPermissions();
};

