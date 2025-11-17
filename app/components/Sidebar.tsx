"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { cn, classes } from "../lib/utils";
import { IconX, IconDotsVertical } from "@tabler/icons-react";
import Dropdown from "./Dropdown";
import UserAvatar from "./UserAvatar";

// Dynamically import IconButton to avoid SSR issues with navigator
const IconButton = dynamic(
  () => import("@embeddable.com/remarkable-ui").then((mod) => ({ default: mod.IconButton })),
  { ssr: false }
);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: string[];
  selectedItem: string;
  userAvatarClass?: string; // Kept for backward compatibility but not used
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

interface DashboardItem {
  id: string;
  name: string;
  users: UserId[];
  selected?: boolean;
}

const dashboardItems: DashboardItem[] = [
  { id: "1", name: "Dashboard 1", users: ["denis", "karl"], selected: false },
  { id: "2", name: "Dashboard 2", users: ["denis", "karl", "erin"], selected: true },
  { id: "3", name: "Dashboard 3", users: ["erin"], selected: false },
  { id: "4", name: "Dashboard 4", users: ["denis", "erin"], selected: false },
];

function DashboardItemComponent({ item }: { item: DashboardItem }) {

  const itemUsers = item.users
    .map((userId) => users.find((u) => u.id === userId))
    .filter((u): u is User => u !== undefined);

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        "p-[var(--em-core-spacing-300,0.75rem)]",
        "self-stretch",
        "rounded-[var(--em-core-border-radius-200,0.5rem)]",
        "transition-colors cursor-pointer",
        item.selected 
          ? "bg-[var(--em-sem-background-subtle,#E4E4EA)]"
          : "hover:bg-black/5"
      )}
    >
      <a 
        href="#" 
        className={cn("no-underline flex-1")}
        style={{
          color: "var(--em-sem-text-default, #212129)",
          fontFamily: "Inter, sans-serif",
          fontSize: "var(--em-font-size-sm, 0.875rem)",
          fontStyle: "normal",
          fontWeight: "var(--em-font-weight-medium, 500)",
          lineHeight: "var(--em-line-height-md, 1rem)",
        }}
      >
        {item.name}
      </a>
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
        items={[
          { label: "Edit" },
          { label: "Share" },
          { label: "Delete" },
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
  selectedItem,
}: SidebarProps) {
  const [selectedUserId, setSelectedUserId] = useState<UserId>("denis");

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
        {/* Close icon - top right */}
        <div className="md:hidden w-full flex justify-end">
          <IconButton icon={IconX} onClick={onClose} aria-label="Close menu" />
        </div>

        {/* Desktop: Original sidebar dashboard items */}
        <div className="hidden md:block w-full">
          <nav className="flex flex-col gap-2 w-full">
            {dashboardItems.map((item) => (
              <DashboardItemComponent key={item.id} item={item} />
            ))}
          </nav>
        </div>

        {/* Mobile: Reorganized menu */}
        <div className="md:hidden flex flex-col h-full w-full gap-[var(--app-spacing,1rem)]">
          {/* Header navigation */}
           <nav className="flex flex-col gap-[var(--app-spacing,1rem)] w-full">
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
                       : cn(
                           "text-[var(--em-sem-text-default,#212129)]",
                         )
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
            className={cn("flex", "gap-[var(--em-core-spacing-200,0.5rem)] items-center")}
          >
            <span className={cn("text-sm pl-2", classes.textForegroundMuted)}>
              Switch users:
            </span>
            <div className="flex items-center justify-center">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
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

          {/* Sidebar dashboard items */}
          <div className="mb-6">
            <nav className="flex flex-col gap-2 w-full">
              {dashboardItems.map((item) => (
                <DashboardItemComponent key={item.id} item={item} />
              ))}
            </nav>
          </div>
          <div className="mt-auto pb-8">
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
      </aside>
    </>
  );
}
