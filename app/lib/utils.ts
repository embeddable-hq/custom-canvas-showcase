import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Typography base classes
const typography = {
  // Base font family
  fontInter: "font-[Inter]",
  fontInterSans: "font-[Inter,sans-serif]",

  // Text colors
  colorDefault: "text-[var(--so-sem-text-default,#212129)]",
  colorMuted: "text-[var(--so-sem-text-muted,#5C5C66)]",
  colorDropdown: "text-[var(--so-sl-item-left-label-text-default,#212129)]",

  // Font sizes
  sizeXs: "text-[length:var(--so-font-size-xs,0.75rem)]",
  sizeSm: "text-[length:var(--so-font-size-sm,0.875rem)]",
  sizeMd: "text-[length:var(--so-font-size-md,1rem)]",
  sizeDropdown: "text-[length:var(--so-sl-item-left-label-font-size,0.75rem)]",

  // Font weights
  weightRegular: "font-[weight:var(--so-font-weight-regular,400)]",
  weightMedium: "font-[weight:var(--so-font-weight-medium,500)]",
  weightBold: "font-[weight:var(--so-font-weight-bold,700)]",
  weightDropdown: "font-[weight:var(--so-sl-item-left-label-font-weight,500)]",

  // Line heights
  lineHeightSm: "leading-[var(--so-line-height-sm,0.875rem)]",
  lineHeightMd: "leading-[var(--so-line-height-md,1rem)]",
  lineHeightL: "leading-[var(--so-line-height-l,1.1875rem)]",
  lineHeightDropdown:
    "leading-[var(--so-sl-item-left-label-font-line-height,0.875rem)]",

  // Text alignment
  alignCenter: "text-center",
};

// Navigation menu text base (common styles)
const navMenuTextBase = cn(
  typography.fontInter,
  typography.sizeSm,
  typography.weightMedium,
  typography.lineHeightMd
);

// Common class patterns
export const classes = {
  // Text colors
  textForegroundMuted: "text-[var(--foreground)]",

  // Spacing
  appPadding: "p-[var(--app-spacing,1rem)]",
  appPaddingY: "py-[var(--app-spacing,1rem)]",

  // Borders
  borderDivider: "border-black/10",

  // Dropdown container
  dropdownContainer:
    "inline-flex flex-col items-start gap-[var(--so-select-menu-list-gap-default,0.5rem)] p-[var(--so-padding-200,0.5rem)] rounded-[var(--so-border-radius-300,0.75rem)] bg-[var(--so-sl-menu-background-color-default,#FFF)] shadow-[var(--so-core-shadow-default-position-x,0)_var(--so-core-shadow-default-position-y,1px)_var(--so-core-shadow-default-blur,40px)_var(--so-core-shadow-default-spread,0)_var(--so-core-shadow-default-color,rgba(33,33,41,0.25))]",
  // Dropdown separator
  dropdownSeparator:
    "border-t border-black/10 w-full",
  // Dropdown item
  dropdownItem:
    "flex w-full items-center h-[var(--so-sl-item-size-height,2rem)] p-[var(--so-sl-item-padding-default,0.5rem)] rounded-[var(--so-sl-item-border-radius-default,0.5rem)] text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-[var(--so-sl-item-background-color-hover,#F7F7F8)]",
  dropdownItemText: cn(
    typography.colorDropdown,
    typography.fontInter,
    typography.sizeDropdown,
    typography.weightDropdown,
    typography.lineHeightDropdown
  ),

  // Footer text
  footerText: cn(
    typography.colorMuted,
    typography.alignCenter,
    typography.fontInter,
    typography.sizeXs,
    "font-normal",
    typography.weightRegular,
    typography.lineHeightSm
  ),

  // Switch users text
  switchUsersText: cn(
    typography.colorDefault,
    typography.alignCenter,
    typography.fontInter,
    typography.sizeXs,
    typography.weightMedium,
    typography.lineHeightSm
  ),

  // Navigation menu text (unselected)
  navMenuTextUnselected: cn(typography.colorDefault, navMenuTextBase),
  // Navigation menu text (selected)
  navMenuTextSelected: cn(
    "text-[var(--so-sem-text-inverted,#FFF)]",
    navMenuTextBase
  ),

  // Text styles (matching components.textStyles)
  textSmall: cn(
    typography.colorDefault,
    typography.fontInterSans,
    typography.sizeSm,
    typography.weightMedium,
    typography.lineHeightMd
  ),
  textMedium: cn(
    typography.colorDefault,
    typography.fontInter,
    typography.sizeMd,
    typography.weightBold,
    typography.lineHeightL
  ),

  // Layout classes
  pageContainer: "max-w-[var(--page-max-width,100%)] mx-auto",
  gridContainer:
    "[grid-template-columns:repeat(var(--grid-columns,4),minmax(0,1fr))] gap-[var(--app-spacing)]",
  mainPadding: "pl-[var(--app-spacing,1rem)] pr-[var(--app-spacing,1rem)]",

  // Select menu wrapper
  selectMenuWrapper:
    "h-[var(--so-sl-menu-size-height-default,2.5rem)] min-w-[var(--so-select-menu-size-width-min-width,4rem)] max-w-[var(--so-select-menu-size-width-max-width,25rem)] items-center flex-[1_0_0]",

  // Close button
  closeButton:
    "w-[var(--so-action-icon-size-width,1.25rem)] h-[var(--so-action-icon-size-height,2rem)] py-[var(--so-action-icon-padding-top-bottom,0.5rem)] px-[var(--so-action-icon-padding-left-right,0.125rem)] rounded-[var(--so-action-icon-border-radius-default,624.9375rem)] bg-[var(--so-action-icon-background-default,#EDEDF1)]",

  // User avatar base (dynamic colors handled inline)
  userAvatarLarge:
    "p-[var(--so-core-spacing-100,0.25rem)] rounded-[var(--so-core-border-radius-500,624.9375rem)]",
  userAvatarInner:
    "w-[var(--so-core-size-600,1.5rem)] h-[var(--so-core-size-600,1.5rem)] rounded-[var(--so-core-border-radius-500,624.9375rem)]",
  userAvatarText:
    "font-[Inter,sans-serif] font-[weight:var(--so-font-weight-bold,700)]",

  // Mobile navigation text
  mobileNavText: "font-[Inter,sans-serif]",

  // Modal
  modalContent:
    "p-[var(--app-spacing,1rem)] gap-[var(--app-spacing,1rem)] shadow-[var(--so-core-shadow-default-position-x,0)_var(--so-core-shadow-default-position-y,1px)_var(--so-core-shadow-default-blur,40px)_var(--so-core-shadow-default-spread,0)_var(--so-core-shadow-default-color,rgba(33,33,41,0.25))]",
};
