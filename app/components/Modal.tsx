"use client";

import { ReactNode } from "react";
import { cn, classes } from "../lib/utils";
import { spacing, borders, colors, typography } from "../lib/tokens";
import CloseButton from "./CloseButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  buttonDisabled?: boolean;
}

/**
 * Reusable modal component
 * Used for permissions and rename modals
 * 
 * @param isOpen - Controls whether the modal is visible
 * @param onClose - Callback function when modal should be closed
 * @param title - Modal title text
 * @param children - Modal content
 * @param buttonText - Text for the primary action button
 * @param onButtonClick - Callback function when primary button is clicked
 * @param buttonDisabled - Whether the primary button should be disabled
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  onButtonClick,
  buttonDisabled = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={cn(
          "flex flex-col items-start",
          "w-[24.5rem]",
          borders.radius.form,
          colors.semantic.backgroundNeutral,
          classes.modalContent
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center justify-between w-full"
          )}
        >
          <h2
            className={cn(
              typography.fontSize.md,
              typography.fontWeight.bold,
              colors.foreground.text
            )}
          >
            {title}
          </h2>
          <CloseButton onClick={onClose} ariaLabel="Close modal" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 w-full">
          {children}
        </div>

        {/* Footer - Button */}
        <button
          onClick={onButtonClick}
          disabled={buttonDisabled}
          className={cn(
            "flex justify-center items-center self-stretch",
            spacing.core.md,
            borders.radius.button,
            colors.button.primaryBackground,
            "text-white",
            typography.fontSize.sm,
            typography.fontWeight.medium,
            typography.lineHeight.md,
            "cursor-pointer",
            "transition-colors",
            "hover:opacity-90",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "w-full",
            typography.fontFamily.interPlain
          )}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

