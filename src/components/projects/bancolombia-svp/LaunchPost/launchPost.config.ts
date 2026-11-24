// Copy for LaunchPost. Draft for the owner's review (2026-11-23).
import type { Lang } from "../../../../i18n/ui";

/** The post (owner's activity, 10 June 2025 per its id) and LinkedIn's official embed of it ("Embed this post"). */
export const launchPost = {
  url: "https://www.linkedin.com/feed/update/urn:li:activity:7338328797470945280/",
  embed: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7338328797470945280",
} as const;

export const launchPostCopy = {
  en: {
    meta: "LinkedIn · June 2025 · in Spanish",
    open: "Open on LinkedIn",
    frameTitle: "My LinkedIn post about the launch of Sucursal Virtual Personas",
  },
  es: {
    meta: "LinkedIn · junio de 2025",
    open: "Abrir en LinkedIn",
    frameTitle: "Mi publicación en LinkedIn sobre el lanzamiento de la Sucursal Virtual Personas",
  },
} as const satisfies Record<Lang, Record<string, string>>;
