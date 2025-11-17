"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { cn, classes } from "../lib/utils";
import { IconX, IconDotsVertical } from "@tabler/icons-react";
import Dropdown from "./Dropdown";

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

function UserAvatar({ 
  user, 
  showTooltip = false, 
  size = "small",
  selected = false
}: { 
  user: User; 
  showTooltip?: boolean;
  size?: "small" | "large";
  selected?: boolean;
}) {
  const [showPopup, setShowPopup] = useState(false);

  const isLarge = size === "large";
  const innerSize = isLarge 
    ? "var(--em-core-size-600, 1.5rem)" 
    : "1rem";
  const fontSize = isLarge ? "1.02rem" : "0.58331rem";
  const lineHeight = isLarge ? "1.17rem" : "0.66669rem";
  const borderRadius = isLarge 
    ? "var(--em-core-border-radius-500,624.9375rem)" 
    : "416.625rem";

  return (
    <div className="relative">
      {isLarge ? (
        // Large avatars: always have padding for consistent size, border only on selected/hover
        <div
          className={cn(
            "flex justify-center items-center",
            "cursor-pointer",
            "inline-flex",
            "transition-all"
          )}
          style={{
            padding: "var(--em-core-spacing-100, 0.25rem)",
            borderRadius: borderRadius,
            border: selected
              ? `var(--em-core-border-width-050, 2px) solid ${user.textColor}`
              : 'transparent',
          }}
          onMouseEnter={(e) => {
            if (!selected) {
              e.currentTarget.style.border = `var(--em-core-border-width-050, 2px) solid ${user.textColor}`;
            }
            if (showTooltip) setShowPopup(true);
          }}
          onMouseLeave={(e) => {
            if (!selected) {
              e.currentTarget.style.border = 'transparent';
            }
            setShowPopup(false);
          }}
        >
          {/* Inner circle: fixed size with background */}
          <div
            className="flex justify-center items-center"
            style={{
              width: "var(--em-core-size-600, 1.5rem)",
              height: "var(--em-core-size-600, 1.5rem)",
              background: user.bgColor,
              borderRadius: borderRadius,
            }}
          >
            <span
              className="text-center font-bold"
              style={{
                color: user.textColor,
                fontFamily: "Inter, sans-serif",
                fontSize: fontSize,
                fontStyle: "normal",
                fontWeight: "var(--em-font-weight-bold, 700)",
                lineHeight: lineHeight,
              }}
            >
              {user.name[0]}
            </span>
          </div>
        </div>
      ) : (
        // Small avatars: simple circle without ring
        <div
          className={cn(
            "flex justify-center items-center",
            "cursor-pointer"
          )}
          style={{
            width: innerSize,
            height: innerSize,
            background: user.bgColor,
            borderRadius: borderRadius,
          }}
          onMouseEnter={() => showTooltip && setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          <span
            className="text-center font-bold"
            style={{
              color: user.textColor,
              fontFamily: "Inter, sans-serif",
              fontSize: fontSize,
              fontStyle: "normal",
              fontWeight: "var(--em-font-weight-bold, 700)",
              lineHeight: lineHeight,
            }}
          >
            {user.name[0]}
          </span>
        </div>
      )}
      {showPopup && showTooltip && (
        <div
          className={cn(
            "absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2",
            "bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-[1000]"
          )}
        >
          {user.name}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}

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
