"use client";

import { cn, classes } from "../lib/utils";
import { spacing } from "../lib/tokens";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";
import { DashboardItem, type TDashboardItem, type UserId, users } from "./Sidebar";

interface MobileNavigationProps {
  navItems: string[];
  selectedItem: string;
  dashboards: TDashboardItem[];
  selectedCustomCanvasState?: string | null;
  selectedUserId: UserId;
  onDashboardSelect: (dashboard: TDashboardItem, userEmail: string) => void;
  onUserSelect: (id: UserId) => void;
  helpItems: { label: string; href?: string; icon?: string }[];
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
    <div className={cn("lg:hidden flex flex-col h-full w-full", spacing.appGap)}>
      {/* Header navigation */}
      <nav className={cn("flex flex-col w-full", spacing.appGap)}>
        {navItems.map((item) => (
          <div key={item} className="w-full">
            <button
              className={cn(
                "text-left",
                "text-sm font-[var(--em-font-weight-medium,500)] leading-4",
                "p-[var(--em-core-spacing-300,0.75rem)]",
                item === selectedItem
                  ? cn(
                      "flex items-center",
                      "h-6",
                      "rounded-[var(--em-core-border-radius-200,0.5rem)]",
                      "bg-[var(--em-sem-chart-color-1,#FF5400)]",
                      "text-[var(--em-sem-text-inverted,#FFF)] font-semibold",
                      "w-auto inline-flex"
                    )
                  : cn("text-[var(--em-sem-text-default,#212129)]")
              )}
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              {item}
            </button>
          </div>
        ))}
      </nav>

      {/* Switch users section */}
      <div
        className={cn(
          "flex",
          "gap-[var(--em-core-spacing-200,0.5rem)] items-center"
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
      <div className="flex-shrink-0" style={{ paddingBottom: 'var(--app-spacing, 1rem)' }}>
        <Dropdown
          trigger={
            <button
              className={cn(
                "w-10 h-10 rounded-full bg-[var(--em-btn-pr-background-default,#5C5C66)] text-white",
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

