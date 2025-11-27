"use client";

import { cn } from "../lib/utils";
import { selectMenu } from "../lib/tokens";
import { spacing } from "../lib/tokens";
import { ReactNode } from "react";
import { IconChevronDown, type TablerIcon } from "@tabler/icons-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  leftIcon?: TablerIcon;
  children: ReactNode;
  className?: string;
}

const getSelectStyle = () => ({
  ...selectMenu.style,
});

/**
 * Reusable select component with consistent styling
 * Used in theme selector and permissions modal
 */
export default function Select({
  leftIcon,
  children,
  className,
  ...props
}: SelectProps) {
  const selectStyle = getSelectStyle();

  // Extract width classes from className to apply to wrapper
  const widthClass = className?.includes("w-") 
    ? className.match(/\bw-[^\s]*/)?.[0] 
    : "w-full";
  const selectClassName = className?.replace(/\bw-[^\s]*/g, "").trim();

  // Build select classes - use paddingLeftIcon when no icon, paddingLeft when icon exists
  const selectClasses = selectMenu.className
    .split(" ")
    .map((cls) => {
      // Replace paddingLeft with appropriate padding based on icon presence
      if (cls === spacing.select.paddingLeft) {
        return leftIcon ? spacing.select.paddingLeft : spacing.select.paddingLeftIcon;
      }
      return cls;
    })
    .join(" ");

  const LeftIconComponent = leftIcon;
  
  return (
    <div className={cn("relative", widthClass)}>
      {LeftIconComponent && (
        <LeftIconComponent
          size={16}
          className={`absolute ${selectMenu.iconPosition} top-1/2 -translate-y-1/2 pointer-events-none z-10`}
        />
      )}
      <select
        className={cn(selectClasses, selectClassName, "w-full")}
        style={selectStyle}
        {...props}
      >
        {children}
      </select>
      <IconChevronDown
        size={12}
        className="absolute right-[var(--so-sl-menu-padding-default,0.75rem)] top-1/2 -translate-y-1/2 pointer-events-none z-10 text-[#666]"
      />
    </div>
  );
}

