"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { cn, classes } from "../lib/utils";
import { sizes } from "../lib/tokens";
import { type TablerIcon } from "@tabler/icons-react";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: TablerIcon;
  className?: string;
}

type DropdownElement = DropdownItem | { type: "separator" };

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownElement[];
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "end" | "center";
  className?: string;
}

// Constants moved outside component to prevent recreation on every render
const POSITION_CLASSES = {
  top: "bottom-[calc(100%+0.5rem)]",
  bottom: "top-[calc(100%+0.5rem)]",
  left: "right-[calc(100%+0.5rem)]",
  right: "left-[calc(100%+0.5rem)]",
} as const;

/**
 * Pure function to get alignment classes based on dropdown position
 * @param positionTopOrBottom - Whether the dropdown is positioned top or bottom
 * @returns Object with alignment class mappings
 */
const getAlignClasses = (positionTopOrBottom: boolean) => ({
  start: positionTopOrBottom ? "left-0" : "top-0",
  end: positionTopOrBottom ? "right-0" : "bottom-0",
  center: positionTopOrBottom
    ? "left-1/2 -translate-x-1/2"
    : "top-1/2 -translate-y-1/2",
});

export default function Dropdown({
  trigger,
  items,
  position = "bottom",
  align = "end",
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const positionTopOrBottom = position === "top" || position === "bottom";
  const alignClasses = getAlignClasses(positionTopOrBottom);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="flex" onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute",
            POSITION_CLASSES[position],
            alignClasses[align],
            "min-w-[10rem] z-[1000] overflow-hidden",
            classes.dropdownContainer
          )}
        >
          {items.map((element, index) => {
            if ('type' in element && element.type === 'separator') {
              return (
                <div key={`separator-${index}`} className={classes.dropdownSeparator} />
              );
            }
            
            const item = element as DropdownItem;
            
            if (item.href) {
              return (
                <a
                  key={`item-${index}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    classes.dropdownItem,
                    "flex items-center gap-3 w-full"
                  )}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                >
                  {item.icon && (
                    <div
                      className={cn(
                        "flex-shrink-0 flex items-center justify-center",
                        sizes.dropdown.icon.width,
                        sizes.dropdown.icon.height
                      )}
                    >
                      {(() => {
                        const IconComponent = item.icon;
                        return <IconComponent size={16} />;
                      })()}
                    </div>
                  )}
                  <span className={cn(classes.dropdownItemText, item.className)}>
                    {item.label}
                  </span>
                </a>
              );
            }
            
            return (
              <button
                key={item.label}
                className={cn(
                  classes.dropdownItem,
                  "flex items-center gap-3 w-full"
                )}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
              >
                {item.icon && (
                  <div
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center",
                      sizes.dropdown.icon.width,
                      sizes.dropdown.icon.height
                    )}
                  >
                    {(() => {
                      const IconComponent = item.icon;
                      return <IconComponent size={16} className={item.className} />;
                    })()}
                  </div>
                )}
                <span className={cn(classes.dropdownItemText, item.className)}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

