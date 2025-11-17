"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { cn, classes } from "../lib/utils";

interface DropdownItem {
  label: string;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  position?: "top" | "bottom" | "left" | "right";
  align?: "start" | "end" | "center";
  className?: string;
}

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

  const positionClasses = {
    top: "bottom-[calc(100%+0.5rem)]",
    bottom: "top-[calc(100%+0.5rem)]",
    left: "right-[calc(100%+0.5rem)]",
    right: "left-[calc(100%+0.5rem)]",
  };

  const alignClasses = {
    start: position === "top" || position === "bottom" ? "left-0" : "top-0",
    end: position === "top" || position === "bottom" ? "right-0" : "bottom-0",
    center:
      position === "top" || position === "bottom"
        ? "left-1/2 -translate-x-1/2"
        : "top-1/2 -translate-y-1/2",
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute",
            positionClasses[position],
            alignClasses[align],
            "bg-white border rounded-lg shadow-lg min-w-[10rem] z-[1000] overflow-hidden",
            classes.borderDivider
          )}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className={classes.dropdownItem}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

