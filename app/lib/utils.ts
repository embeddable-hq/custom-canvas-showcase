import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Common class patterns
export const classes = {
  // Text colors
  textForeground: 'text-[var(--foreground)]',
  textForegroundMuted: 'text-[var(--foreground)]',
  
  // Spacing
  appPadding: 'p-[var(--app-spacing,1rem)]',
  appPaddingX: 'px-[var(--app-spacing,1rem)]',
  appPaddingY: 'py-[var(--app-spacing,1rem)]',
  appPaddingL: 'pl-[var(--app-spacing,1rem)]',
  
  // Borders
  borderDivider: 'border-black/10',
  
  // Buttons
  buttonBase: 'cursor-pointer transition-colors',
  buttonHover: 'hover:bg-black/5',
  
  // Sidebar link
  sidebarLink: 'px-2 py-3 text-[var(--foreground)] no-underline rounded-md transition-all hover:bg-black/5',
  
  // Dropdown item
  dropdownItem: 'block w-full px-4 py-3 text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-black/5',
  dropdownItemText: 'text-[var(--em-sl-item-left-label-text-default,#212129)] font-[var(--em-sl-item-left-label-font-family,Inter)] text-[length:var(--em-sl-item-left-label-font-size,0.75rem)] font-normal font-[weight:var(--em-sl-item-left-label-font-weight,500)] leading-[var(--em-sl-item-left-label-font-line-height,0.875rem)]',
  
  // Footer text
  footerText: 'text-[var(--em-sem-text-muted,#5C5C66)] text-center font-[Inter] text-[length:var(--em-font-size-xs,0.75rem)] font-normal font-[weight:var(--em-font-weight-regular,400)] leading-[var(--em-line-height-sm,0.875rem)]',
};

