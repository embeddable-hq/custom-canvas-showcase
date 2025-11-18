"use client";

import { useState, useEffect } from "react";
import { cn, classes } from "../lib/utils";
import { spacing, borders, colors, components } from "../lib/tokens";
import { IconX, IconDotsVertical } from "@tabler/icons-react";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: string[];
  selectedItem: string;
  userAvatarClass?: string;
  onEmbeddableSelect: (embeddableId: string, embeddableName: string) => void;
  selectedEmbeddableId?: string | null;
}

export type UserId = "denis" | "karl" | "erin";

export interface User {
  id: UserId;
  name: string;
  bgColor: string;
  textColor: string;
}

export const users: User[] = [
  {
    id: "denis",
    name: "Denis",
    bgColor: "var(--user-color-background-1, #C5E4FF)",
    textColor: "var(--user-color-text-1, #1768AF)",
  },
  {
    id: "karl",
    name: "Karl",
    bgColor: "var(--user-color-background-2, #E8D7FF)",
    textColor: "var(--user-color-text-2, #5B17B2)",
  },
  {
    id: "erin",
    name: "Erin",
    bgColor: "var(--user-color-background-3, #CFEFCF)",
    textColor: "var(--user-color-text-3, #277A27)",
  },
];

export interface DashboardItem {
  id: string;
  name: string;
  users: UserId[];
  selected?: boolean;
}

export interface EmbeddableApiResponse {
  embeddables: {
    id: string;
    name: string;
    tags: string[];
    lastPublishedAt?: {
      latest?: string;
      production?: string;
      staging?: string;
      development?: string;
    };
  }[];
}

export function EmbeddableItem({
  embeddable,
  onSelect,
  isSelected,
}: {
  embeddable: DashboardItem;
  onSelect: (id: string, name: string) => void;
  isSelected?: boolean;
}) {
  const itemUsers = embeddable.users
    .map((userId) => users.find((u) => u.id === userId))
    .filter((u): u is User => u !== undefined);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("handleClick", embeddable.id);
    onSelect(embeddable.id, embeddable.name);
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
        isSelected
          ? colors.semantic.backgroundSubtle
          : "hover:bg-black/5"
      )}
    >
      <div
        className={cn("no-underline flex-1")}
        style={components.textStyles.small}
      >
        {embeddable.name}
      </div>
      {itemUsers.length > 0 && (
        <div className="flex items-center gap-1">
          {itemUsers.slice(0, 3).map((user) => (
            <UserAvatar key={user.id} user={user} showTooltip={true} />
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
        items={[{ label: "Edit" }, { label: "Share" }, { label: "Delete" }]}
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
  selectedItem,
  onEmbeddableSelect,
  selectedEmbeddableId,
}: SidebarProps) {
  const [selectedUserId, setSelectedUserId] = useState<UserId>("denis");
  const [embeddables, setEmbeddables] = useState<DashboardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmbeddables() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/embeddables");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch embeddables: ${response.statusText}`
          );
        }

        const data: EmbeddableApiResponse = await response.json();

        // Map API response to DashboardItem format
        const mappedItems: DashboardItem[] = data.embeddables.map(
          (embeddable) => ({
            id: embeddable.id,
            name: embeddable.name,
            users: [], // API doesn't provide users, defaulting to empty array
            selected: false, // Selection is now handled by parent component
          })
        );

        setEmbeddables(mappedItems);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch embeddables"
        );
        console.error("Error fetching embeddables:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEmbeddables();
  }, []); // Only fetch once on mount

  // Auto-select first embeddable when embeddables are loaded and none is selected
  useEffect(() => {
    if (
      embeddables.length > 0 &&
      !selectedEmbeddableId &&
      onEmbeddableSelect
    ) {
      onEmbeddableSelect(embeddables[0].id, embeddables[0].name);
    }
  }, [embeddables, selectedEmbeddableId, onEmbeddableSelect]);

  const helpItems = [
    { label: "Documentation" },
    { label: "Support" },
    { label: "Feedback" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[999]"
          onClick={onClose}
        ></div>
      )}
      <aside
        className={cn(
          "flex flex-col items-end",
          "w-[14.875rem] min-w-[var(--min-width-sidenav,15.5rem)]",
          "h-[66.0625rem] md:h-full",
          "p-[var(--app-spacing,1rem)] md:p-0 md:pl-[2rem]",
          "gap-[var(--app-spacing,1rem)]",
          "bg-white transition-transform",
          "fixed md:relative left-0 top-0 z-[1000]",
          "shadow-lg md:shadow-none",
          classes.borderDivider,
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <div className="md:hidden w-full flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className={cn(
              "flex justify-between items-center",
              "flex-shrink-0",
              "cursor-pointer",
              "border-none"
            )}
            style={{
              width: "var(--em-action-icon-size-width, 1.25rem)",
              height: "var(--em-action-icon-size-height, 2rem)",
              padding: "var(--em-action-icon-padding-top-bottom, 0.5rem) var(--em-action-icon-padding-left-right, 0.125rem)",
              borderRadius: "var(--em-action-icon-border-radius-default, 624.9375rem)",
              background: "var(--em-action-icon-background-default, #EDEDF1)",
            }}
          >
            <IconX className="w-4 h-4" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <DesktopNavigation
          embeddables={embeddables}
          loading={loading}
          error={error}
          selectedEmbeddableId={selectedEmbeddableId}
          onEmbeddableSelect={onEmbeddableSelect}
        />

        {/* Mobile Navigation */}
        <MobileNavigation
          navItems={navItems}
          selectedItem={selectedItem}
          embeddables={embeddables}
          loading={loading}
          error={error}
          selectedEmbeddableId={selectedEmbeddableId}
          selectedUserId={selectedUserId}
          onEmbeddableSelect={onEmbeddableSelect}
          onUserSelect={setSelectedUserId}
          helpItems={helpItems}
        />
      </aside>
    </>
  );
}
