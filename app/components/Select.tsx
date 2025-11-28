"use client";

import { cn } from "../lib/utils";
import { selectMenu, spacing, sizes, colors, borders } from "../lib/tokens";
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

  // Build base select classes - use conditional padding based on icon presence
  const baseSelectClasses = [
    "flex items-center",
    "appearance-none cursor-pointer",
    sizes.select.height,
    sizes.select.minWidth,
    sizes.select.maxWidth,
    spacing.select.padding,
    leftIcon ? spacing.select.paddingLeft : spacing.select.paddingLeftIcon,
    spacing.select.paddingRight,
    colors.select.background,
    borders.radius.select,
    "w-full",
  ];

  const LeftIconComponent = leftIcon;
  
  return (
    <div className="relative w-full">
      {LeftIconComponent && (
        <LeftIconComponent
          size={16}
          className={`absolute ${selectMenu.iconPosition} top-1/2 -translate-y-1/2 pointer-events-none z-10`}
        />
      )}
      <select
        className={cn(baseSelectClasses, className)}
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

