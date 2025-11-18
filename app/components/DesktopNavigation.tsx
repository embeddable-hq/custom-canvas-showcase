"use client";

import { cn } from "../lib/utils";
import { IconPlus } from "@tabler/icons-react";
import { EmbeddableItem, type DashboardItem } from "./Sidebar";

interface DesktopNavigationProps {
  embeddables: DashboardItem[];
  loading: boolean;
  error: string | null;
  selectedEmbeddableId?: string | null;
  onEmbeddableSelect: (id: string) => void;
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
            "p-[var(--em-core-spacing-300,0.75rem)]",
            "rounded-[var(--em-btn-pr-border-radius-default,624.9375rem)]",
            "bg-[var(--em-btn-pr-background-default,#5C5C66)]",
            "text-white",
            "text-[var(--em-font-size-sm,0.875rem)]",
            "font-[var(--em-font-weight-medium,500)]",
            "leading-[var(--em-line-height-md,1rem)]",
            "cursor-pointer",
            "transition-colors",
            "hover:opacity-90",
            "w-full"
          )}
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        >
          <IconPlus className="w-4 h-4" />
          <span
            className={cn(
              "flex justify-center items-center",
              "py-0 px-[var(--em-btn-pr-label-padding-default,0.5rem)]",
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

