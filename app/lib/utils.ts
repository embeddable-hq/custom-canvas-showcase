import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Typography base classes
const typography = {
  // Base font family
  fontInter: 'font-[Inter]',
  fontInterSans: 'font-[Inter,sans-serif]',
  
  // Text colors
  colorDefault: 'text-[var(--em-sem-text-default,#212129)]',
  colorMuted: 'text-[var(--em-sem-text-muted,#5C5C66)]',
  colorDropdown: 'text-[var(--em-sl-item-left-label-text-default,#212129)]',
  
  // Font sizes
  sizeXs: 'text-[length:var(--em-font-size-xs,0.75rem)]',
  sizeSm: 'text-[length:var(--em-font-size-sm,0.875rem)]',
  sizeMd: 'text-[length:var(--em-font-size-md,1rem)]',
  sizeDropdown: 'text-[length:var(--em-sl-item-left-label-font-size,0.75rem)]',
  
  // Font weights
  weightRegular: 'font-[weight:var(--em-font-weight-regular,400)]',
  weightMedium: 'font-[weight:var(--em-font-weight-medium,500)]',
  weightBold: 'font-[weight:var(--em-font-weight-bold,700)]',
  weightDropdown: 'font-[weight:var(--em-sl-item-left-label-font-weight,500)]',
  
  // Line heights
  lineHeightSm: 'leading-[var(--em-line-height-sm,0.875rem)]',
  lineHeightMd: 'leading-[var(--em-line-height-md,1rem)]',
  lineHeightL: 'leading-[var(--em-line-height-l,1.1875rem)]',
  lineHeightDropdown: 'leading-[var(--em-sl-item-left-label-font-line-height,0.875rem)]',
  
  // Text alignment
  alignCenter: 'text-center',
};

// Common class patterns
export const classes = {
  // Text colors
  textForegroundMuted: 'text-[var(--foreground)]',
  
  // Spacing
  appPadding: 'p-[var(--app-spacing,1rem)]',
  appPaddingY: 'py-[var(--app-spacing,1rem)]',
  
  // Borders
  borderDivider: 'border-black/10',
  
  // Dropdown item
  dropdownItem: 'block w-full px-4 py-3 text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-black/5',
  dropdownItemText: cn(
    typography.colorDropdown,
    typography.fontInter,
    typography.sizeDropdown,
    'font-normal',
    typography.weightDropdown,
    typography.lineHeightDropdown
  ),
  
  // Footer text
  footerText: cn(
    typography.colorMuted,
    typography.alignCenter,
    typography.fontInter,
    typography.sizeXs,
    'font-normal',
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
  navMenuTextUnselected: cn(
    typography.colorDefault,
    typography.fontInter,
    typography.sizeSm,
    typography.weightMedium,
    typography.lineHeightMd
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
  pageContainer: 'max-w-[var(--page-max-width,100%)] mx-auto',
  gridContainer: '[grid-template-columns:repeat(var(--grid-columns,4),minmax(0,1fr))] gap-[var(--app-spacing)]',
  mainPadding: 'pl-[var(--app-spacing,1rem)] pr-[var(--app-spacing,1rem)]',
  
  // Select menu wrapper
  selectMenuWrapper: 'h-[var(--em-sl-menu-size-height-default,2.5rem)] min-w-[var(--em-select-menu-size-width-min-width,4rem)] max-w-[var(--em-select-menu-size-width-max-width,25rem)] p-[var(--em-sl-menu-padding-default,0.75rem)] items-center flex-[1_0_0]',
  
  // Close button
  closeButton: 'w-[var(--em-action-icon-size-width,1.25rem)] h-[var(--em-action-icon-size-height,2rem)] py-[var(--em-action-icon-padding-top-bottom,0.5rem)] px-[var(--em-action-icon-padding-left-right,0.125rem)] rounded-[var(--em-action-icon-border-radius-default,624.9375rem)] bg-[var(--em-action-icon-background-default,#EDEDF1)]',
  
  // User avatar base (dynamic colors handled inline)
  userAvatarLarge: 'p-[var(--em-core-spacing-100,0.25rem)] rounded-[var(--em-core-border-radius-500,624.9375rem)]',
  userAvatarInner: 'w-[var(--em-core-size-600,1.5rem)] h-[var(--em-core-size-600,1.5rem)] rounded-[var(--em-core-border-radius-500,624.9375rem)]',
  userAvatarText: 'font-[Inter,sans-serif] font-[weight:var(--em-font-weight-bold,700)]',
  
  // Mobile navigation text
  mobileNavText: 'font-[Inter,sans-serif]',
  
  // Modal
  modalContent: 'p-[var(--app-spacing,1rem)] gap-[var(--app-spacing,1rem)] shadow-[var(--em-core-shadow-default-position-x,0)_var(--em-core-shadow-default-position-y,1px)_var(--em-core-shadow-default-blur,40px)_var(--em-core-shadow-default-spread,0)_var(--em-core-shadow-default-color,rgba(33,33,41,0.25))]',
};

