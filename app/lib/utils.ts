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
  dropdownItem: 'block w-full px-4 py-3 text-left bg-transparent border-none text-[var(--foreground)] cursor-pointer transition-colors hover:bg-black/5',
};

