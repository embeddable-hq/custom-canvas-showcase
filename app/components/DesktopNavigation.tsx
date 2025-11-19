"use client";

import { cn } from "../lib/utils";
import { spacing, borders, colors, typography } from "../lib/tokens";
import { IconPlus } from "@tabler/icons-react";
import { DashboardItem, type TDashboardItem, type UserId } from "./Sidebar";

interface DesktopNavigationProps {
  dashboards: TDashboardItem[];
  selectedCustomCanvasState?: string | null;
  selectedUserId?: UserId;
  onDashboardSelect: (dashboard: TDashboardItem, userEmail: string) => void;
  onAddDashboard: () => void;
  onEditPermissions?: (dashboard: TDashboardItem) => void;
}

export default function DesktopNavigation({
  dashboards,
  selectedCustomCanvasState,
  selectedUserId,
  onDashboardSelect,
  onAddDashboard,
  onEditPermissions,
}: DesktopNavigationProps) {
  return (
    <div className="hidden md:flex flex-col w-full gap-4">
      <div className="flex flex-col gap-2 w-full">
        {dashboards.map((dashboard) => (
          <DashboardItem
            key={dashboard.id}
            dashboard={dashboard}
            onSelect={onDashboardSelect}
            isSelected={dashboard.state === selectedCustomCanvasState}
            selectedUserId={selectedUserId}
            onEditPermissions={onEditPermissions}
          />
        ))}
      </div>
      <div className="mt-2">
        <button
          onClick={onAddDashboard}
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
          <IconPlus className="w-4 h-4" />
          <span
            className={cn(
              "flex justify-center items-center",
              "py-0",
              spacing.button.labelPadding,
              "gap-2"
            )}
          >
            Add new dashboard
          </span>
        </button>
      </div>
    </div>
  );
}
