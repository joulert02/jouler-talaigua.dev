# jouler-talaigua.dev

Personal site of Jouler Talaigua — work (projects, career, writing) and life & interests.
Built with Astro 7, TypeScript (strictest), MDX and content collections. Bilingual: English (default) and Spanish (`/es/`).

## Run locally

```bash
nvm use            # Node 22
npm ci
npm run dev        # http://localhost:4321
```

| Script          | What it does                                   |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Dev server                                     |
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

The consolidated design proposal is **v7**, with the original v5 and the v6 proposal preserved as local HTML history. See [design review and history](docs/design/README.md) for the files, local/network preview instructions and validation boundaries. The final design and real case/note content remain under owner review.
