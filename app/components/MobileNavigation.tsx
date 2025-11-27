"use client";

import { cn, classes } from "../lib/utils";
import { spacing, borders, colors, typography } from "../lib/tokens";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";
import { DashboardItem, type TDashboardItem } from "./Sidebar";
import { users, type UserId, type HelpItem } from "../../utils/constants";

interface MobileNavigationProps {
  navItems: string[];
  selectedItem: string;
  dashboards: TDashboardItem[];
  selectedCustomCanvasState?: string | null;
  selectedUserId: UserId;
  onDashboardSelect: (dashboard: TDashboardItem, userEmail: string) => void;
  onUserSelect: (id: UserId) => void;
  helpItems: HelpItem[];
  onEditPermissions?: (dashboard: TDashboardItem) => void;
  onRename?: (dashboard: TDashboardItem) => void;
  onDelete?: (dashboard: TDashboardItem) => void;
}

export default function MobileNavigation({
  navItems,
  selectedItem,
  dashboards,
  selectedCustomCanvasState,
  selectedUserId,
  onDashboardSelect,
  onUserSelect,
  helpItems,
  onEditPermissions,
  onRename,
  onDelete,
}: MobileNavigationProps) {

  return (
    <div className={cn("lg:hidden flex flex-col h-full w-full min-h-0", spacing.appGap)}>
      {/* Header navigation */}
      <nav className={cn("flex flex-col w-full flex-shrink-0", spacing.appGap)}>
        {navItems.map((item) => (
          <div key={item} className="w-full">
            <button
              className={cn(
                "text-left",
                "text-sm leading-4",
                typography.fontWeight.medium,
                spacing.core.mdPadding,
                classes.mobileNavText,
                item === selectedItem
                  ? cn(
                      "flex items-center",
                      "h-6",
                      borders.radius.sm,
                      colors.semantic.chartColor1,
                      colors.semantic.textInverted,
                      "font-semibold",
                      "w-auto inline-flex"
                    )
                  : colors.semantic.textDefault
              )}
            >
              {item}
            </button>
          </div>
        ))}
      </nav>

      {/* Switch users section */}
      <div
        className={cn(
          "flex flex-shrink-0",
          spacing.core.smGap,
          "items-center"
        )}
      >
        <span className={cn("text-sm pl-2", classes.textForegroundMuted)}>
          Switch users:
        </span>
        <div className="flex items-center justify-center">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => onUserSelect(user.id)}
              className="cursor-pointer flex items-center justify-center"
            >
              <UserAvatar
                user={user}
                showTooltip={true}
                size="large"
                selected={user.id === selectedUserId}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Embeddables list - scrollable */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col gap-2 w-full">
          {dashboards.map((dashboard) => (
            <DashboardItem
              key={dashboard.id}
              dashboard={dashboard}
              onSelect={onDashboardSelect}
              isSelected={dashboard.state === selectedCustomCanvasState}
              selectedUserId={selectedUserId}
              onEditPermissions={onEditPermissions}
              onRename={onRename}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>

      {/* Help dropdown - fixed at bottom */}
      <div className={cn("flex-shrink-0", classes.appPaddingY, "pb-[max(1rem,env(safe-area-inset-bottom))]")}>
        <Dropdown
          trigger={
            <button
              className={cn(
                "w-10 h-10 rounded-full text-white",
                colors.button.primaryBackground,
                "flex items-center justify-center text-lg font-semibold",
                "transition-transform hover:scale-105"
              )}
              aria-label="Help"
            >
              <span>?</span>
            </button>
          }
          items={helpItems}
          position="top"
          align="start"
        />
      </div>
    </div>
  );
}

