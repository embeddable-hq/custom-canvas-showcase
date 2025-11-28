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

/**
 * Gets the select element inline styles
 * Pure function that returns the select menu style object
 */
const getSelectStyle = () => ({
  ...selectMenu.style,
});

/**
 * Reusable select component with consistent styling
 * Used in theme selector and permissions modal
 * 
 * @param leftIcon - Optional icon to display on the left side of the select
 * @param children - Option elements to render inside the select
 * @param className - Additional CSS classes to apply
 * @param props - All other standard HTML select element props
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
    "w-full",
    sizes.select.height,
    sizes.select.minWidth,
    sizes.select.maxWidth,
    spacing.select.padding,
    leftIcon ? spacing.select.paddingLeft : spacing.select.paddingLeftIcon,
    spacing.select.paddingRight,
    colors.select.background,
    borders.radius.select,
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

