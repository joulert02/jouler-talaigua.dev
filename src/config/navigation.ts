import type { UiKey } from "../i18n/ui";

export type DockIconName = "home" | "work" | "notes" | "roadmap";
interface NavigationEntry {
  id: string;
  labelKey: UiKey;
  href: string;
  icon: DockIconName;
}

// TODO(verify): routes before integrating the dock into the site.
export const navigation = [
  { id: "home", labelKey: "dock.home", href: "#TODO(verify)-home", icon: "home" },
  { id: "work", labelKey: "dock.work", href: "#TODO(verify)-work", icon: "work" },
  { id: "notes", labelKey: "dock.notes", href: "#TODO(verify)-notes", icon: "notes" },
  { id: "roadmap", labelKey: "dock.roadmap", href: "#TODO(verify)-roadmap", icon: "roadmap" },
] as const satisfies readonly NavigationEntry[];
export interface NavigationItem extends NavigationEntry {
  id: (typeof navigation)[number]["id"];
}
