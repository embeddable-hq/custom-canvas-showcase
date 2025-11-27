"use client";

import { cn, classes } from "../lib/utils";
import { IconX } from "@tabler/icons-react";

interface CloseButtonProps {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

/**
 * Reusable close button component
 * Matches the mobile sidebar close button styling
 */
export default function CloseButton({
  onClick,
  ariaLabel = "Close",
  className,
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex justify-between items-center",
        "flex-shrink-0",
        "cursor-pointer",
        "border-none",
        classes.closeButton,
        className
      )}
    >
      <IconX size={16} />
    </button>
  );
}

