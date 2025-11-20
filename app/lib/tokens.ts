/**
 * Design Tokens for Tailwind
 * 
 * Note: Many utilities are now available directly via @theme configuration:
 * - Colors: text-default, bg-subtle, bg-chart-1, bg-btn-primary
 * - Font sizes: text-font-sm, text-font-md
 * - Font weights: font-medium, font-bold
 * - Line heights: leading-md, leading-l
 * - Spacing: p-core-md, gap-core-sm, etc.
 * - Border radius: rounded-sm, rounded-pill
 * 
 * This file now contains:
 * 1. Complex combinations that can't be expressed as single utilities
 * 2. Utilities for CSS variables not yet mapped in @theme
 * 3. Convenience functions for common patterns
 */

// Typography Tokens - Use Tailwind utilities where possible
export const typography = {
  // Font Families
  fontFamily: {
    inter: "font-[Inter]",
    interPlain: "font-[Inter,sans-serif]",
  },

  // Use: text-font-sm, text-font-md (from @theme)
  fontSize: {
    sm: "text-font-sm",
    md: "text-font-md",
  },

  // Use: font-medium, font-bold (from @theme)
  fontWeight: {
    medium: "font-medium",
    bold: "font-bold",
    normal: "font-normal",
  },

  // Use: leading-md, leading-l (from @theme)
  lineHeight: {
    md: "leading-md",
    l: "leading-l",
  },

  // Use: text-default, text-inverted (from @theme)
  textColor: {
    default: "text-default",
    inverted: "text-inverted",
  },

  // Complete Text Styles (combinations) - Use for inline styles
  text: {
    small: "text-default text-font-sm font-medium leading-md",
    medium: "text-default text-font-md font-bold leading-l",
  },
} as const;

// Color Tokens - Use Tailwind utilities from @theme
export const colors = {
  semantic: {
    textDefault: "text-default", // Now a simple utility! (or fallback to arbitrary)
    textInverted: "text-inverted",
    backgroundSubtle: "bg-[var(--em-sem-background-subtle,#E4E4EA)]", // Fallback to arbitrary value
    chartColor1: "bg-[var(--em-sem-chart-color-1,#FF5400)]", // Fallback to arbitrary value
  },
  button: {
    primaryBackground: "bg-btn-primary",
  },
  select: {
    background: "bg-[var(--em-sl-menu-background-color-default,#FFF)]",
    border: "border-[var(--em-sl-menu-border-color-default,#D2D2D5)]",
    text: "text-[var(--em-sl-menu-label-text-default,#212129)]",
  },
  actionIcon: {
    background: "bg-[var(--em-action-icon-background-default,#EDEDF1)]",
  },
} as const;

// Spacing Tokens - Use from @theme where possible
export const spacing = {
  core: {
    xs: "p-core-xs", // Or use: p-[var(--em-core-spacing-100,0.25rem)]
    sm: "gap-core-sm",
    md: "p-core-md", // Or use: p-[var(--em-core-spacing-300,0.75rem)]
    lg: "p-core-lg",
    mdGap: "gap-core-md",
  },
  app: "p-[var(--app-spacing,1rem)]",
  appGap: "gap-[var(--app-spacing)]",
  sidebar: {
    padding: "p-[var(--app-spacing,1rem)]",
    paddingMobile: "p-[var(--app-spacing,1rem)]",
    paddingDesktop: "p-0 pl-[var(--app-spacing,1rem)]",
    gap: "gap-[var(--app-spacing,1rem)]",
  },
  select: {
    padding: "p-[var(--em-sl-menu-padding-default,0.75rem)]",
    paddingLeft: "pl-[calc(var(--em-sl-menu-padding-default,0.75rem)+1.5rem)]",
    paddingRight: "pr-[calc(var(--em-sl-menu-padding-default,0.75rem)+2rem)]",
    paddingLeftIcon: "pl-[var(--em-sl-menu-padding-default,0.75rem)]",
  },
  button: {
    labelPadding: "px-[var(--em-btn-pr-label-padding-default,0.5rem)]",
    paddingSmall: "px-[var(--em-btn-pr-padding-top-bottom-small,0.375rem)] py-[var(--em-btn-pr-padding-left-right-small,0.375rem)]",
  },
  actionIcon: {
    padding: "py-[var(--em-action-icon-padding-top-bottom,0.5rem)] px-[var(--em-action-icon-padding-left-right,0.125rem)]",
  },
} as const;

// Border Tokens - Use from @theme where possible
export const borders = {
  radius: {
    sm: "rounded-sm", 
    pill: "rounded-pill", 
    button: "rounded-[var(--em-btn-pr-border-radius-default,624.9375rem)]",
    select: "rounded-[var(--em-sl-menu-border-radius-default,0.5rem)]",
    actionIcon: "rounded-[var(--em-action-icon-border-radius-default,624.9375rem)]",
  },
  width: {
    thin: "border-[var(--em-core-border-width-050,2px)]",
    select: "border-[var(--em-sl-menu-border-width-default,1px)]",
  },
  color: {
    select: "border-[var(--em-sl-menu-border-color-default,#D2D2D5)]",
  },
  select: {
    complete: "rounded-[var(--em-sl-menu-border-radius-default,0.5rem)] border-[var(--em-sl-menu-border-width-default,1px)] border-solid border-[var(--em-sl-menu-border-color-default,#D2D2D5)]",
  },
} as const;

// Size Tokens
export const sizes = {
  core: {
    lg: "w-[var(--em-core-size-600,1.5rem)] h-[var(--em-core-size-600,1.5rem)]",
    lgWidth: "w-[var(--em-core-size-600,1.5rem)]",
    lgHeight: "h-[var(--em-core-size-600,1.5rem)]",
  },
  select: {
    height: "h-[var(--em-sl-menu-size-height-default,2.5rem)]",
    minWidth: "min-w-[var(--em-select-menu-size-width-min-width,4rem)]",
    maxWidth: "max-w-[var(--em-select-menu-size-width-max-width,25rem)]",
  },
  actionIcon: {
    width: "w-[var(--em-action-icon-size-width,1.25rem)]",
    height: "h-[var(--em-action-icon-size-height,2rem)]",
  },
  sidebar: {
    width: "w-[var(--sidebar-width,14.875rem)]",
    minWidth: "min-w-[var(--min-width-sidenav,15.5rem)]",
    height: "h-[var(--sidebar-height,66.0625rem)]",
  },
  dropdown: {
    icon: {
      width: "w-[var(--em-sl-item-icon-size-width,1rem)]",
      height: "h-[var(--em-sl-item-icon-size-height,1rem)]",
    },
  },
} as const;

// Select Menu Tokens (complete sets)
export const selectMenu = {
  // For the select element itself
  className: [
    "flex items-center",
    "appearance-none",
    "cursor-pointer",
    "bg-no-repeat bg-right",
    sizes.select.height,
    sizes.select.minWidth,
    sizes.select.maxWidth,
    spacing.select.padding,
    spacing.select.paddingLeft,
    spacing.select.paddingRight,
    colors.select.text,
    "font-[var(--em-sl-menu-label-font-family,Inter)]",
    "text-[length:var(--em-sl-menu-label-font-size,0.75rem)]",
    "font-normal",
    "leading-[var(--em-sl-menu-label-font-line-height,0.875rem)]",
  ].join(" "),

  // For the icon inside select
  iconPosition: `left-[var(--em-sl-menu-padding-default,0.75rem)]`,

  // Inline styles that can't be expressed as Tailwind classes
  style: {
    borderRadius: "var(--em-sl-menu-border-radius-default, 0.5rem)",
    border: "var(--em-sl-menu-border-width-default, 1px) solid var(--em-sl-menu-border-color-default, #D2D2D5)",
    background: "var(--em-sl-menu-background-color-default, #FFF)",
    fontWeight: "var(--em-sl-menu-label-font-weight, 500)",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
    backgroundPosition: "right var(--em-sl-menu-padding-default, 0.75rem) center",
    backgroundSize: "12px 12px",
    backgroundRepeat: "no-repeat",
  },
} as const;

// Button Tokens
export const button = {
  primary: {
    // Small button styles (for mobile toggle, etc.)
    small: [
      "flex",
      "border-none",
      "cursor-pointer",
      "rounded-full",
      "justify-center",
      "items-center",
      "h-[var(--em-btn-pr-size-height-small,2rem)]",
      "min-w-[2rem]",
      "py-[var(--em-btn-pr-padding-top-bottom-small,0.375rem)]",
      "px-[var(--em-btn-pr-padding-left-right-small,0.375rem)]",
      colors.button.primaryBackground,
    ].join(" "),
  },
} as const;

// Sidebar Tokens
export const sidebar = {
  base: [
    "flex flex-col items-end",
    "bg-white transition-transform",
    spacing.sidebar.gap,
    sizes.sidebar.width,
    sizes.sidebar.minWidth,
    "h-screen lg:h-auto",
    spacing.sidebar.paddingMobile,
    "fixed lg:relative left-0 top-0 z-[1000]",
    "shadow-lg lg:shadow-none",
    "lg:w-auto lg:max-w-full lg:min-w-[var(--min-width-sidenav,15.5rem)]",
    "md:p-0 md:pl-[var(--app-spacing,1rem)]",
    "lg:col-span-3",
  ].join(" "),
  translateOpen: "translate-x-0 lg:translate-x-0",
  translateClosed: "-translate-x-full lg:translate-x-0",
} as const;

// Components - For inline styles that can't be Tailwind classes
export const components = {
  textStyles: {
    small: {
      color: "var(--em-sem-text-default, #212129)",
      fontFamily: "Inter, sans-serif",
      fontSize: "var(--em-font-size-sm, 0.875rem)",
      fontStyle: "normal",
      fontWeight: "var(--em-font-weight-medium, 500)",
      lineHeight: "var(--em-line-height-md, 1rem)",
    },
    medium: {
      color: "var(--em-sem-text-default, #212129)",
      fontFamily: "Inter",
      fontSize: "var(--em-font-size-md, 1rem)",
      fontStyle: "normal",
      fontWeight: "var(--em-font-weight-bold, 700)",
      lineHeight: "var(--em-line-height-l, 1.1875rem)",
    },
  },
} as const;
