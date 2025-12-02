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
    textDefault: "text-default",
    textInverted: "text-inverted",
    textError: "text-error",
    backgroundSubtle: "bg-subtle",
    backgroundNeutral: "bg-neutral",
    chartColor1: "bg-chart-1",
  },
  foreground: {
    text: "text-foreground",
  },
  button: {
    primaryBackground: "bg-btn-primary",
  },
  select: {
    background: "bg-sl-menu-bg",
    border: "border-sl-menu-border",
    text: "text-sl-menu-text",
  },
  actionIcon: {
    background: "bg-action-icon-bg",
  },
  embeddable: {
    background: "bg-[var(--em-background-color-default,#f7f7f8)]",
  },
} as const;

// Spacing Tokens - Use from @theme where possible
export const spacing = {
  core: {
    xs: "p-core-xs",
    sm: "gap-core-sm",
    md: "p-core-md",
    mdPadding: "p-core-md",
    lg: "p-core-lg",
    mdGap: "gap-core-md",
    smGap: "gap-core-sm",
  },
  app: "p-app",
  appGap: "gap-app",
  sidebar: {
    padding: "p-app",
    paddingMobile: "p-app",
    paddingDesktop: "p-0 pl-app",
    gap: "gap-app",
  },
  select: {
    padding: "p-sl-menu-padding",
    paddingLeft: "pl-[calc(var(--so-sl-menu-padding-default,0.75rem)+1.5rem)]",
    paddingRight: "pr-[calc(var(--so-sl-menu-padding-default,0.75rem)+2rem)]",
    paddingLeftIcon: "pl-sl-menu-padding",
  },
  button: {
    labelPadding: "px-btn-label-padding",
    paddingSmall: "px-btn-padding-small-x py-btn-padding-small-y",
  },
  actionIcon: {
    padding: "py-action-icon-padding-y px-action-icon-padding-x",
  },
} as const;

// Border Tokens - Use from @theme where possible
export const borders = {
  radius: {
    sm: "rounded-sm", 
    pill: "rounded-pill", 
    button: "rounded-button",
    select: "rounded-select",
    actionIcon: "rounded-action-icon",
    form: "rounded-form",
    embeddable: "rounded-[var(--em-card-border-radius-default,2rem)]",
  },
  width: {
    thin: "border-thin",
    select: "border-select",
  },
  color: {
    select: "border-sl-menu-border",
  },
  select: {
    complete: "rounded-select border-select border-solid border-sl-menu-border",
  },
} as const;

// Size Tokens
export const sizes = {
  core: {
    lg: "w-core-lg h-core-lg",
    lgWidth: "w-core-lg",
    lgHeight: "h-core-lg",
  },
  select: {
    height: "h-sl-menu-height",
    minWidth: "min-w-select-menu-min-width",
    maxWidth: "max-w-select-menu-max-width",
  },
  actionIcon: {
    width: "w-action-icon-width",
    height: "h-action-icon-height",
  },
  sidebar: {
    width: "w-sidebar-width",
    minWidth: "min-w-sidebar-min-width",
    height: "h-sidebar-height",
  },
  dropdown: {
    icon: {
      width: "w-sl-item-icon-width",
      height: "h-sl-item-icon-height",
    },
  },
} as const;

// Select Menu Tokens (complete sets)
export const selectMenu = {
  // For the select element itself - layout and spacing via Tailwind utilities
  // Typography must be inline styles due to browser default overrides on <select> elements
  className: [
    "flex items-center",
    "appearance-none cursor-pointer",
    sizes.select.height,
    sizes.select.minWidth,
    sizes.select.maxWidth,
    spacing.select.padding,
    spacing.select.paddingLeft,
    spacing.select.paddingRight,
    colors.select.background,
    borders.radius.select,
  ].join(" "),

  // For the icon inside select
  iconPosition: `left-sl-menu-padding`,

  // Inline styles for typography (required due to browser defaults) and visual styles
  style: {
    // Typography - using CSS variables for maintainability
    color: "var(--so-sl-menu-label-text-default, #212129)",
    fontFamily: "var(--so-sl-menu-label-font-family, Inter)",
    fontSize: "var(--so-sl-menu-label-font-size, 0.75rem)",
    fontStyle: "normal",
    fontWeight: "var(--so-sl-menu-label-font-weight, 500)",
    lineHeight: "var(--so-sl-menu-label-font-line-height, 0.875rem)",
    // Visual styles
    border: "var(--so-sl-menu-border-width-default, 1px) solid var(--so-sl-menu-border-color-default, #D2D2D5)",
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
      "color-white",
      spacing.button.paddingSmall,
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
    "h-[100dvh] lg:h-auto", // Use dynamic viewport height for mobile to account for browser UI
    spacing.sidebar.paddingMobile,
    "fixed lg:relative left-0 top-0 z-[1000]",
    "shadow-lg lg:shadow-none",
    "lg:w-auto lg:max-w-full lg:min-w-sidebar-min-width",
    "md:p-app",
    "lg:p-0 lg:pl-app",
    "lg:col-span-3",
    "pb-[env(safe-area-inset-bottom)]", // Add safe area padding for mobile browsers
  ].join(" "),
  translateOpen: "translate-x-0 lg:translate-x-0",
  translateClosed: "-translate-x-full lg:translate-x-0",
} as const;

// Components - For inline styles that can't be Tailwind classes
export const components = {
  textStyles: {
    small: {
      color: "var(--so-sem-text-default, #212129)",
      fontFamily: "Inter, sans-serif",
      fontSize: "var(--so-font-size-sm, 0.875rem)",
      fontStyle: "normal",
      fontWeight: "var(--so-font-weight-medium, 500)",
      lineHeight: "var(--so-line-height-md, 1rem)",
    },
    medium: {
      color: "var(--so-sem-text-default, #212129)",
      fontFamily: "Inter",
      fontSize: "var(--so-font-size-md, 1rem)",
      fontStyle: "normal",
      fontWeight: "var(--so-font-weight-bold, 700)",
      lineHeight: "var(--so-line-height-l, 1.1875rem)",
    },
  },
} as const;
