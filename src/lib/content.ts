import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";

export const slugOf = (id: string): string => id.split("/").slice(1).join("/");

/** The projects in one language, in Work order. */
export async function getProjects(lang: Lang): Promise<CollectionEntry<"projects">[]> {
  const all = await getCollection("projects", (p) => p.data.lang === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}
