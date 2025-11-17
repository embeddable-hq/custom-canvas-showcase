"use client";

import { useState, useEffect, useRef } from "react";
import { cn, classes } from "../lib/utils";
import { IconButton } from "@embeddable.com/remarkable-ui";
import { IconX } from "@tabler/icons-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: string[];
  selectedItem: string;
  userAvatarClass: string;
}

export default function Sidebar({
  isOpen,
  onClose,
  navItems,
  selectedItem,
  userAvatarClass,
}: SidebarProps) {
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const helpContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        helpContainerRef.current &&
        !helpContainerRef.current.contains(event.target as Node)
      ) {
        setHelpDropdownOpen(false);
      }
    };

    if (helpDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [helpDropdownOpen]);

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
          "p-[var(--app-spacing,1rem)]",
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

        {/* Desktop: Original sidebar content */}
        <div className="hidden md:block pt-8 w-full">
          <nav className="flex flex-col gap-2 w-full">
            <a href="#" className={classes.sidebarLink}>
              Dashboard
            </a>
            <a href="#" className={classes.sidebarLink}>
              Settings
            </a>
            <a href="#" className={classes.sidebarLink}>
              Reports
            </a>
            <a href="#" className={classes.sidebarLink}>
              Tools
            </a>
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
            <div className="flex gap-2">
              <div className={userAvatarClass}></div>
              <div className={userAvatarClass}></div>
              <div className={userAvatarClass}></div>
            </div>
          </div>

          {/* Sidebar items */}
          <div className="mb-6">
            <nav className="flex flex-col gap-2 w-full">
              <a href="#" className={classes.sidebarLink}>
                Dashboard
              </a>
              <a href="#" className={classes.sidebarLink}>
                Settings
              </a>
              <a href="#" className={classes.sidebarLink}>
                Reports
              </a>
              <a href="#" className={classes.sidebarLink}>
                Tools
              </a>
            </nav>
          </div>
          <div className="mt-auto pb-8">
            <div className="relative" ref={helpContainerRef}>
              <button
                className={cn(
                  "w-10 h-10 rounded-full bg-[var(--em-btn-pr-background-default,#5C5C66)] text-white",
                  "flex items-center justify-center text-lg font-semibold",
                  "transition-transform hover:scale-105"
                )}
                onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                aria-label="Help"
              >
                <span>?</span>
              </button>
              {helpDropdownOpen && (
                <div
                  className={cn(
                    "absolute bottom-[calc(100%+0.5rem)] left-0",
                    "bg-white border rounded-lg shadow-lg min-w-[10rem] z-[1000] overflow-hidden",
                    classes.borderDivider
                  )}
                >
                  <button className={classes.dropdownItem}>
                    Documentation
                  </button>
                  <button className={classes.dropdownItem}>Support</button>
                  <button className={classes.dropdownItem}>Feedback</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
