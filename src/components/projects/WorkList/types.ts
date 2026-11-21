import type { ImageMetadata } from "astro";

/** One project on the Work page, ready to show: copy in the page's language, links with their locale prefix. */
export interface WorkItem {
  slug: string;
  company: string;
  title: string;
  summary: string;
  focus: readonly string[];
  /** The preview on desktop and the cover under the row on touch screens; without one, the preview shows a status tile. */
  cover?: ImageMetadata | undefined;
  /** The case page. A case that is not built yet has none and is listed without a link. */
  href?: string | undefined;
  /** Tags beside the title, e.g. "Personal" and "Coming soon"; none for a live client case. */
  tags: readonly WorkTag[];
}

/** A label beside a project's title: `muted` (grey) for its state, `accent` (violet) for a kind worth noticing. */
export interface WorkTag {
  label: string;
  tone: "muted" | "accent";
}
