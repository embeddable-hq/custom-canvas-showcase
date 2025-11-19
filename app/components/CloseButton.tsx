"use client";

import { cn } from "../lib/utils";
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
        className
      )}
      style={{
        width: "var(--em-action-icon-size-width, 1.25rem)",
        height: "var(--em-action-icon-size-height, 2rem)",
        padding:
          "var(--em-action-icon-padding-top-bottom, 0.5rem) var(--em-action-icon-padding-left-right, 0.125rem)",
        borderRadius:
          "var(--em-action-icon-border-radius-default, 624.9375rem)",
        background: "var(--em-action-icon-background-default, #EDEDF1)",
      }}
    >
      <IconX className="w-4 h-4" />
    </button>
  );
}

