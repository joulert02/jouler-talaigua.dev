import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const lang = z.enum(["en", "es"]);

// Projects: status split (published / in progress / idea) comes from the Obsidian brief.
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    lang,
    status: z.enum(["published", "in-progress", "idea"]),
    role: z.string().optional(),
    stack: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    links: z.object({ repo: z.url().optional(), live: z.url().optional() }).default({}),
    date: z.coerce.date(),
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

export const collections = { projects, articles };
