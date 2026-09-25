import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";

export const slugOf = (id: string): string => id.split("/").slice(1).join("/");

export async function getProjects(lang: Lang): Promise<CollectionEntry<"projects">[]> {
  const all = await getCollection("projects", (p) => p.data.lang === lang);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
