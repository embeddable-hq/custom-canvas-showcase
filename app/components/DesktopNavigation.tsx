"use client";

import { cn } from "../lib/utils";
import { spacing, borders, colors, typography } from "../lib/tokens";
import { IconPlus } from "@tabler/icons-react";
import { EmbeddableItem, type DashboardItem } from "./Sidebar";

interface DesktopNavigationProps {
  embeddables: DashboardItem[];
  loading: boolean;
  error: string | null;
  selectedEmbeddableId?: string | null;
  onEmbeddableSelect: (id: string, name: string) => void;
}

export default function DesktopNavigation({
  embeddables,
  loading,
  error,
  selectedEmbeddableId,
  onEmbeddableSelect,
}: DesktopNavigationProps) {
  return (
    <div className="hidden md:block w-full">
      <div className="flex flex-col gap-2 w-full">
        {loading ? (
          <div className="p-4 text-sm text-gray-500">Loading...</div>
        ) : error ? (
          <div className="p-4 text-sm text-red-500">{error}</div>
        ) : (
          embeddables.map((embeddable) => (
            <EmbeddableItem
              key={embeddable.id}
              embeddable={embeddable}
              onSelect={onEmbeddableSelect}
              isSelected={embeddable.id === selectedEmbeddableId}
            />
          ))
        )}
      </div>
      <div className="mt-2">
        <button
          onClick={() => {
            // TODO: Handle add embeddable
            console.log("Add new embeddable");
          }}
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

