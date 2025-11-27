export const envConfig = {
  embeddableApiKey: process.env.EMBEDDABLE_API_KEY,
  embeddableApiUrl: process.env.NEXT_PUBLIC_EMBEDDABLE_API_URL,
  embeddableBaseUrl: process.env.NEXT_PUBLIC_EMBEDDABLE_BASE_URL,
  embeddableScriptUrl: process.env.NEXT_PUBLIC_EMBEDDABLE_SCRIPT_URL,
  userEmail: process.env.NEXT_PUBLIC_USER_EMAIL,
  EMBEDDABLE_ID: process.env.EMBEDDABLE_ID,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  githubRepositoryUrl: process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL,
  documentationUrl: process.env.NEXT_PUBLIC_DOCUMENTATION_URL,
};

// Storage keys
export const STORAGE_KEY_DASHBOARD_PERMISSIONS = "dashboard-permissions";

// Navigation
export const NAV_ITEMS: string[] = ["Shop", "Gift cards", "Analytics", "Profile", "About"];
export const DEFAULT_SELECTED_NAV_ITEM = "Analytics";

// Token expiry (7 days in seconds)
export const TOKEN_EXPIRY_SECONDS = 60 * 60 * 24 * 7;

// User types and data
export type UserId = "denis" | "karl" | "erin";

export interface User {
  id: UserId;
  name: string;
  mail: string;
  bgColor: string;
  textColor: string;
}

export const users: User[] = [
  {
    id: "denis",
    name: "Denis",
    mail: "denis@embeddable.de",
    bgColor: "var(--user-color-background-1, #C5E4FF)",
    textColor: "var(--user-color-text-1, #1768AF)",
  },
  {
    id: "karl",
    name: "Karl",
    mail: "karl@embeddable.de",
    bgColor: "var(--user-color-background-2, #E8D7FF)",
    textColor: "var(--user-color-text-2, #5B17B2)",
  },
  {
    id: "erin",
    name: "Erin",
    mail: "erin@embeddable.de",
    bgColor: "var(--user-color-background-3, #CFEFCF)",
    textColor: "var(--user-color-text-3, #277A27)",
  },
];

/**
 * Gets all user IDs from the users array
 */
export const getAllUserIds = (): UserId[] => {
  return users.map((user) => user.id);
};

// Help menu items
export interface HelpItem {
  label: string;
  href?: string;
  icon?: string;
}

export const getHelpItems = (): HelpItem[] => {
  return [
    { 
      label: "Docs", 
      href: envConfig.documentationUrl,
      icon: "/docs.svg"
    },
    { 
      label: "Github", 
      href: envConfig.githubRepositoryUrl,
      icon: "/github.svg"
    },
    { 
      label: "Contact", 
      href: envConfig.contactEmail ? `mailto:${envConfig.contactEmail}` : undefined,
      icon: "/contact.svg"
    },
  ];
};
