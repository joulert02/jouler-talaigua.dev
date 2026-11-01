import type { UiKey } from "../i18n/ui";

export type DockIconName = "home" | "work" | "notes" | "roadmap";
interface NavigationEntry {
  id: string;
  labelKey: UiKey;
  href: string;
  icon: DockIconName;
}

// Paths without the locale prefix; DockItem localizes them (localePath).
export const navigation = [
  { id: "home", labelKey: "dock.home", href: "/", icon: "home" },
  { id: "work", labelKey: "dock.work", href: "/projects/", icon: "work" },
  { id: "notes", labelKey: "dock.notes", href: "/notes/", icon: "notes" },
  // Roadmap stays out of the menu for now; its page (/roadmap/) still exists.
  // { id: "roadmap", labelKey: "dock.roadmap", href: "/roadmap/", icon: "roadmap" },
] as const satisfies readonly NavigationEntry[];
export interface NavigationItem extends NavigationEntry {
  id: (typeof navigation)[number]["id"];
}
