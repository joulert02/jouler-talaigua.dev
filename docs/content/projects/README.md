# Project content review

**Status:** tentative English content for Jouler's review, updated 2026-10-25. These files define the material for the project screens; they are not published case studies, approved copy, or production Astro content.

## Structure: six pages in three tiers

Agreed with Jouler on 2026-10-25. Deep cases show three different facets (product, architecture and teams, platform/observability); the brand work is one showcase; current work gets short status pages.

| Tier          | Page                                                                                | Format                                    | Status                                       |
| ------------- | ----------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------- |
| 1 · Full case | [Mercado Libre — Lists & Gift Registry](mercado-libre-favorites-gift-lists.md)      | Product and engineering case              | Approved for design                          |
| 1 · Full case | [Bancolombia — Sucursal Virtual Personas](bancolombia-sucursal-virtual-personas.md) | Architecture and team enablement          | Approved; team photo permission pending      |
| 1 · Full case | [GoodRx — Datadog to groundcover](goodrx-groundcover-migration-redesign.md)         | Observability migration; short cards note | Approved for design                          |
| 2 · Showcase  | [Brand platforms at PRAGMA](pragma-brand-platforms.md)                              | One page, four live previews              | Copy approved; Personajes XD exports pending |
| 3 · Status    | [Cast & Crew — CAPS+ migration](caps-migration.md)                                  | Short "Under construction" page           | Approved for design                          |
| 3 · Status    | [EKOU Personal Nexus](ekou-personal-nexus.md)                                       | Short "In progress" page                  | Deferred to a later iteration                |

## Decisions on 2026-10-25

- **Prize roulette is out.** Jouler dropped it: the experience is no longer live. Mercado Libre is represented only by Favorites & Gift Lists. The v7/v8 prototypes still show a prize-roulette case and need updating in the next design iteration.
- **GoodRx can be named.** Jouler is allowed to say he worked on GoodRx and will add it to LinkedIn.
- **Brand sites are public**, so the page references them directly and shows them as live previews (below).
- **Voice:** the copy speaks confidently about what Jouler did and leaves out what he didn't. Boundaries live in "Evidence and boundaries" and the review notes, never as disclaimers in visitor-facing text.
- **Content comes from interviews**, not from filling in markers. See [INTERVIEW.md](INTERVIEW.md).

## Live previews

Jouler's request: instead of static screenshots, show the real site in a cached frame; on click, a View Transition opens the live project.

Proposed pattern for the design iteration:

1. **At rest:** a cached capture of the site inside a browser frame (image or short muted loop), generated at build time with Playwright, so the page stays fast and works offline.
2. **On click:** a View Transition expands the frame to a large panel on the same page. Inside it, the live site loads in an `<iframe>` when the site allows embedding.
3. **Always available:** "Open site ↗" opens the real URL in a new tab.

Constraints to check before implementing:

- Many sites block being shown inside another site (`X-Frame-Options` or CSP `frame-ancestors`). Banking (Bancolombia) and Mercado Libre almost certainly do. Each brand site must be tested; when blocked, the panel shows the cached capture plus "Open site ↗".
- A View Transition can animate within our page, but not into another website. The transition ends in our panel or before the new tab opens.
- Live sites change over time. The cached capture shows the current public site, not the version Jouler worked on, so the caption says "Live site" rather than implying authorship of everything visible.
- Embedded third-party sites load their own scripts, cookies and trackers. Load the iframe only after the click, never on page load.

Check a site's framing policy from the Mac with: `curl -sI https://www.tena.com.co/ | grep -iE "x-frame-options|frame-ancestors"`.

## How to read a draft

Each file separates:

1. **Evidence and boundaries:** what a source actually supports. A LinkedIn description verifies what the profile reports; it is not independent validation of a result.
2. **Tentative copy:** listing text and proposed page sections, written for visitors.
3. **Screen content plan:** which content and assets each section needs. Editorial priorities, not finished layouts.
4. **Owner review:** the missing facts. `TODO(verify)` means the content is not ready to publish.

The technical thread should emerge through concrete work: product behavior at Mercado Libre, architecture and team enablement at Bancolombia, observability at GoodRx, and audience-specific interfaces in the brand projects.

## Sources and images

- [Source ledger](sources.md): URLs, dates checked, what each source supports and its limits.
- [Asset review](assets.md): all supplied images, candidate usage and missing visuals.

Original images stay in the owner's local assets folder, outside the repository; [assets.md](assets.md) lists them by path relative to that folder. Some captures contain personal or account context and need clean derivatives before use.

## Next step

With the copy approved (2026-10-26), the project screens are designed as a new prototype version in `docs/design/`, preserving earlier ones. Translation to Spanish and the Astro content collections come after that.

## History

Superseded drafts (the pre-interview versions and the four separate brand drafts) were removed on 2026-10-26 to keep this folder readable. Recover any of them with `git show 4317597:docs/content/projects/archive/<file>.md`.
