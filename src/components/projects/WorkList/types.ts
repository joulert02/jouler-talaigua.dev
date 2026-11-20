import type { ImageMetadata } from "astro";

/** One project on the Work page, ready to show: copy in the page's language, links with their locale prefix. */
export interface WorkItem {
  slug: string;
  company: string;
  title: string;
  summary: string;
  focus: readonly string[];
  /** Preview and thumbnail; without one, both show a status tile. */
  cover?: ImageMetadata | undefined;
  /** The case page. A case that is not built yet has none and is listed without a link. */
  href?: string | undefined;
  /** Tag beside the title, e.g. "Coming soon" or "Under construction"; none for a live case. */
  status?: string | undefined;
}
