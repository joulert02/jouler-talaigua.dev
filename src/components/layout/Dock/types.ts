import type { DockIconName } from "../../../config/navigation";

/**
 * One Dock link as the Dock draws it: the label already in the page's language and the href already localized. The
 * caller (Base.astro) resolves both from `src/config/navigation.ts`, so the Dock itself knows nothing about i18n.
 */
export interface DockLink {
  id: string;
  label: string;
  href: string;
  icon: DockIconName;
}
