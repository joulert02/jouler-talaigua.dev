# jouler-talaigua.dev

Personal site of Jouler Talaigua — work (projects, career, writing) and life & interests.
Built with Astro 7, TypeScript (strictest), MDX and content collections. Bilingual: English (default) and Spanish (`/es/`).

## Run locally

```bash
nvm use              # Node 22.19+
npm ci
npm run dev        # http://localhost:4321
```

| Script          | What it does                                   |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Dev server                                     |
| `npm run storybook` | Storybook for Astro components and design documentation |
| `npm run build-storybook` | Build the static Storybook site |
| `npm run build` | Static build to `dist/` (pages + OG images)    |
| `npm run check` | Astro + TypeScript diagnostics                 |
| `npm run lint`  | ESLint                                         |
| `npm run ci`    | Everything CI runs: format, lint, check, build |

## Structure

```
src/
  content/         projects/ and articles/, one folder per language
  content.config.ts  collection schemas
  i18n/            UI strings + locale helpers
  layouts/         Base layout (SEO, hreflang, theme)
  views/           page bodies shared by both locales
  pages/           routes (en at root, es under /es), og/ image endpoints
docs/adr/          architecture decision records
```

## Decisions

- [Discovery brief](docs/discovery-brief.md) — positioning, audience, sitemap, content plan
- [ADR 001 — Astro as the site framework](docs/adr/001-stack.md)

> Status: foundation / spike. Design and real content land after the discovery brief is approved.

## Design review

The current reviewed interaction prototype is **v8**, with v5–v7 preserved as local HTML history. See [design review and history](docs/design/README.md) for the files, local/network preview instructions and validation boundaries. The final design and real case/note content remain under owner review.

## Component workshop

Storybook 10.6.5 is configured for Astro components, CSF Next stories, and standalone MDX documentation under `.storybook/docs/`. Use `definePreview` from `@storybook-astro/framework` and `preview.meta(...).story(...)` in `*.stories.ts` files; MDX pages can embed those stories with Storybook doc blocks. Existing CSF 3 stories remain supported. See the [Design Guidelines](.storybook/docs/DesignGuidelines.mdx) example; approved tokens and patterns will be added after the visual direction is approved.
