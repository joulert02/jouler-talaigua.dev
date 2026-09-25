# ADR 001 — Astro as the site framework

- **Status:** Proposed (pending Jouler's review)
- **Date:** 2026-09-25
- **Deciders:** Jouler Talaigua (owner), Claude (project lead)

## Context

jouler.dev is a bilingual (en/es) personal site: profile, case studies, articles and workshops, and a
"life & interests" area. It is almost entirely static content. Interactivity is small (theme, language,
maybe a few demos inside case studies). The site is also a portfolio piece in itself: its performance,
accessibility and engineering decisions are part of what it shows.

Requirements that drive the choice:

1. Near-zero client JavaScript by default; Lighthouse ≥ 95 in every category.
2. First-class Markdown/MDX content with typed frontmatter.
3. i18n routing (en default, `/es/` prefix) with `hreflang` alternates.
4. Dynamic OpenGraph images per page.
5. React available for the occasional interactive piece, since React is Jouler's main stack.
6. Cheap to host on Vercel, previews per PR.

## Options

**Astro 7** — content-first, ships zero JS unless a component opts in (islands). Typed content
collections with loaders, built-in i18n routing, first-party React and MDX integrations.

**Next.js 16** — the stack Jouler uses day-to-day and a strong signal for React-heavy roles. App
Router + Server Components can keep JS low, but the React runtime still ships for any client component,
i18n requires a `[locale]` segment plus middleware or a library, and content collections must be
assembled by hand (MDX + schema validation).

## Spike results (2026-09-25, branch `claude/foundation`)

Validated on Astro 7.3.5, `@astrojs/react` 7.0.0, `@astrojs/mdx` 8.0.2, Node 22:

| Check                                                       | Result                                            |
| ----------------------------------------------------------- | ------------------------------------------------- |
| Content collections (projects, articles) with Zod schema    | ✅ `astro check` 0 errors under `strictest` TS    |
| i18n routing en (root) / es (`/es/`), hreflang + x-default  | ✅                                                |
| Dynamic OG PNG per page (Satori + resvg, build time)        | ✅ ~35 ms per image                               |
| React island (theme toggle)                                 | ✅ works — but costs **~64 KB gzip** of runtime   |
| Same toggle as a vanilla `<script>` in an Astro component   | ✅ 0 external JS files loaded                     |
| Lighthouse (mobile, local preview) — Perf / A11y / BP / SEO | **100 / 100 / 100 / 100** on `/`, `/es/`, project |

The spike's key finding: React islands work, but using them for chrome (theme, language, nav) would
throw away most of the advantage. Rule adopted: **site chrome is vanilla; React only where a component
genuinely needs state and rich interaction.**

## Decision

Use **Astro 7** with TypeScript `strictest`, content collections for projects and articles, built-in
i18n, MDX, sitemap, and build-time OG images. Keep `@astrojs/react` for opt-in islands only.
Deploy as static output on Vercel.

## Consequences

- ➕ Performance and accessibility budgets are easy to hold; the site itself is a credible artifact.
- ➕ Content lives as Markdown in the repo — reviewable in PRs, easy to write in either language.
- ➖ Less direct "look, it's Next.js" signal. Mitigation: case studies and writing cover React/Next
  depth (Mercado Libre SSR + BFF, CAPS+ migration); an ADR like this one explains the trade-off, which
  is itself the kind of judgment the site wants to show.
- ➖ OG images read fonts from `node_modules` at build time; if we move to on-demand rendering this
  needs to change (bundle the font as an asset).
- Revisit if the site needs authenticated or highly dynamic features.
