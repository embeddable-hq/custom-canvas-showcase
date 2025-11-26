"use client";

import { cn } from "../lib/utils";
import { selectMenu } from "../lib/tokens";
import { spacing } from "../lib/tokens";
import Image from "next/image";
import { ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  leftIcon?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  children: ReactNode;
  className?: string;
}

const SELECT_DROPDOWN_ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`;

const getSelectStyle = () => ({
  ...selectMenu.style,
  backgroundImage: SELECT_DROPDOWN_ICON,
  backgroundSize: "12px 12px",
  backgroundRepeat: "no-repeat",
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

  return (
    <div className={cn("relative", widthClass)}>
      {leftIcon && (
        <Image
          src={leftIcon.src}
          alt={leftIcon.alt || ""}
          width={leftIcon.width || 16}
          height={leftIcon.height || 16}
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
    </div>
  );
}

