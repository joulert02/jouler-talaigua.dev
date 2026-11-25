import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const lang = z.enum(["en", "es"]);

// Projects: one file per language and project; the Work page lists them (HU-03), each case page renders one (HU-04 on).
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      summary: z.string(),
      lang,
      /** Content tier (docs/content/projects/README.md): 1 full case, 2 showcase, 3 status page. */
      tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      /** Position on the Work page, oldest work first; unique across tiers. */
      order: z.number().int(),
      focus: z.array(z.string()).default([]),
      /** Shown on the Work page's preview and thumbnails; without one, the preview shows a status tile. */
      cover: image().optional(),
      /** Whether the case page is built: a "coming" case gets a "Coming soon" tag and a short page at its route (WorkCaseComing). */
      case: z.enum(["coming", "live"]),
      /** Client work or Jouler's own product; a personal project carries a violet "Personal" tag on the Work page. */
      kind: z.enum(["client", "personal"]).default("client"),
      /** A status that replaces "Coming soon" on the Work page, e.g. "Under construction". */
      label: z.string().optional(),
    }),
});

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang,
    kind: z.enum(["article", "workshop", "talk"]).default("article"),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// Standalone pages whose copy lives in Markdown (e.g. "More about me").
const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.{md,mdx}" }),
  schema: z.object({ title: z.string(), description: z.string(), lang }),
});

export const collections = { projects, articles, pages };
