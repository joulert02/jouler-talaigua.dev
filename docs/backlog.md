# Implementation backlog

**Status:** reviewed by the owner on 2026-10-29 with the decisions below. Pending the owner's go-ahead to create the issues in the GitHub Project.

## How we use it

- **One user story (HU) is one vertical slice.** It can touch architecture, docs, components, content and tests, but only what its page or section needs. Nothing is built "for later".
- **Every HU ends in something visible** on a Cloudflare Pages preview, reviewed by the owner on a real phone and a desktop.
- **One HU at a time:** take it with an agent, plan it (spec and plan in `docs/superpowers/` when it is architectural, a short design in chat when it is bounded), execute together, close it. If an HU grows too much, it is split into sub-tasks.
- **Git workflow (trunk-based development).** `main` is the trunk. Work happens on short-lived branches named by type, `feature/<slug>` for new work and `fix/<slug>` for corrections (for example `feature/hu-01-home-foundation`), kept small and integrated into `main` often. Branches are not named after the agent (no `claude/*`). Commits are semantic (Conventional Commits). Each commit made by an agent ends with a `Co-Authored-By` line naming that agent. Integration of a feature branch follows the owner's rule when integrating.
- **Quality belongs to each HU.** Every HU meets its own accessibility, performance, SEO and copy bar before it closes. The audit HU near the end is a verification pass, not where quality is created.
- **Copy is finished per HU, in both languages.** An HU closes with its English and Spanish copy complete and approved by the owner. Translations stay provisional until then.
- **Components live in Storybook.** Every component an HU creates ships with its stories. Storybook also documents the guidelines, principles and visual line, as a personal design system.
- **Visual source:** the sealed prototype `docs/design/v11/` and `docs/design/principles.md`. Anything not designed yet (the 404 page) is designed first in a new `docs/design/v12/` folder, never by editing v11.
- **Content source:** `docs/content/projects/`. `TODO(verify)` markers stay until the owner confirms them.
- **Tasks and issues of this project live in the GitHub Project** (owner's decision, 2026-10-29), not in Notion.
- **Naming:** `HU-NN-<context>`, where `NN` is the planned order.

## Size scale

S = one sitting. M = a few sittings. L = more than that.

## Order at a glance

`SP-01` is a spike and goes first; the rest are HUs.

| #   | Item                     | Slice delivered                                         | Size |
| --- | ------------------------ | ------------------------------------------------------- | ---- |
| SP  | `SP-01-design-handoff`   | Design docs ready to plan from (spike, no code)         | S    |
| 01  | `HU-01-home-foundation`  | Real Home, plus the cross-page components and Storybook | L    |
| 02  | `HU-02-home-board`       | The explorable board on desktop, compact card on mobile | L    |
| 03  | `HU-03-work-hub`         | Work: the project list with preview                     | M    |
| 04  | `HU-04-case-pragma`      | Case page foundation, built with the Pragma showcase    | L    |
| 05  | `HU-05-case-bancolombia` | Bancolombia case                                        | M    |
| 06  | `HU-06-case-meli`        | Mercado Libre case                                      | L    |
| 07  | `HU-07-case-groundcover` | GoodRx observability migration case                     | M    |
| 08  | `HU-08-case-caps`        | CAPS+ status page                                       | S    |
| 09  | `HU-09-notes`            | Notes hub and note page                                 | M    |
| 10  | `HU-10-roadmap-letter`   | Roadmap, letter and More about me                       | M    |
| 11  | `HU-11-seo-sharing`      | OG images, sitemap, metadata, hreflang                  | S    |
| 12  | `HU-12-not-found`        | Designed and implemented 404 page                       | S    |
| 13  | `HU-13-quality`          | Audits of SEO, accessibility, performance and copy      | M    |
| 14  | `HU-14-launch`           | Production environment, domain, deploy                  | M    |

---

## HU-01-home-foundation

**Context.** The site has a spike (`src/views/Home.astro`) and a sealed Home design (v11). This is the walking skeleton: the smallest real Home that goes all the way to a Cloudflare preview. As the first HU it carries the cross-page components, which later HUs reuse; if it grows too much it is split into sub-tasks.

**Vertical scope.** Uses the SP-01 tokens and freezes their Draft scales (space, radius, motion) · self-hosted fonts on the site (Storybook already loads them) · base layout and JOTA mark · dock (Home, Work, Notes, Roadmap, copy email, theme) · identity card · footer with contact · theme toggle (vanilla) · English at the root and Spanish under `/es/` with a language switch · reduced-motion rules · preview deploy · the first Storybook Patterns pages, written once Home is built, and the stories of every component created here · decision-log lines for what is decided here.

**Acceptance.**

- The Home on a preview URL shows the identity card, the dock and the contact footer, in light and dark, with finished copy in English and Spanish.
- Body text is 17px or more; contrast and focus states pass on the real components (`principles.md`).
- No client JavaScript beyond the theme toggle and the dock (site chrome is vanilla, per the ADR).
- Every component has a story; the Patterns of the Home and its navigation are in Storybook.
- `npm run ci` passes. Lighthouse mobile shows no regression from the spike's 100/100/100/100.

**Depends on.** SP-01-design-handoff.

**Out of scope.** The explorable board (HU-02), notes, cases, OG images.

**Owner provides.** CV download file and photo consent.

---

## HU-02-home-board

**Context.** On the sealed Home the visitor drags a desk of personal objects. It is the most distinctive and riskiest part, so it has its own slice and does not delay the layout.

**Vertical scope.** Desk camera and drag/inertia · objects and their dialogs · keyboard access (Tab brings each object into view, `0`/Home recenters) · hint pill ("Drag to explore" / "Keep dragging for Work ↓") · drag-only hand-off to Work (held 2.6 s, wheel never opens it) · mobile compact card with floating Close · vanilla vs. React decision (an ADR if React is chosen) · reduced-motion behavior · stories for the board components.

**Acceptance.**

- Desktop (≥ 901 px): drag moves the camera, wheel and trackpad never open Work, a held drag at the bottom edge fills the pill and opens Work, releasing cancels.
- Mobile: the compact card opens and closes with the finger, and the page still scrolls normally.
- Everything is reachable by keyboard and announced sensibly by a screen reader; reduced motion removes the bounce and shortens the fill.
- Verified on Chromium, Safari, Firefox and one real phone (v11 only verified Chromium).
- Copy of the objects finished in both languages.

**Depends on.** HU-01.

**Out of scope.** The content behind each object (HU-09 notes, HU-10 roadmap and letter).

---

## HU-03-work-hub

**Context.** Work is the second door of the Home: a list of projects with a preview, and the way into each case.

**Vertical scope.** Work page route (EN and ES) · project list and preview from content collections (replacing the spike's `ProjectList`) · the project schema fields the list needs · links to case routes · stories for the list components.

**Acceptance.**

- The projects appear in the agreed tiers with approved titles and one-line summaries in both languages.
- Cases not built yet are clearly "coming" (no link) rather than broken.
- It works with keyboard and touch, and the hand-off from HU-02 lands on it.

**Depends on.** HU-01. Integrates with HU-02 when both exist.

---

## HU-04-case-pragma

**Context.** First case: its design is closed and the project card names it as the first to implement. It is a brand-platform showcase, so it also forces the case foundation to handle live previews, video and playgrounds. If it grows too much, it splits into the case foundation and the Pragma page.

**Vertical scope.** Case layout and header · shared back pill · case content components (`<Context>`, `<Role>`, `<Decision>`, `<Metric>`, `<Figure>`, `<Stack>`, as the brief asks) · "What I learned" intro with media on the right · MDX content for Pragma in both languages · live-preview frame with cached capture and on-click View Transition, with the iframe loaded only after the click · Petys, TENA and Nosotras playgrounds · Pragma video: optimization (≤ 8 MB), ES and EN subtitles or transcript · stories for every new component.

**Acceptance.**

- Matches the sealed v10/v11 design on desktop and mobile, in light and dark.
- The framing policy of each brand site is checked; a blocked site shows the capture plus "Open site ↗".
- The video is optimized and accessible.
- Content components are documented so another case can be assembled without touching code.
- Finished copy in English and Spanish.

**Depends on.** HU-03 and, for publication, PRAGMA's OK to self-host the video and the pending Personajes exports (owner).

---

## HU-05-case-bancolombia

**Context.** Architecture and team-enablement case. Follows the v9 pattern and is not yet refined like Pragma and Mercado Libre.

**Vertical scope.** MDX content in both languages · micro frontends diagram (Module Federation, Clean Architecture) · team photo, shown only once permission is confirmed · stories for any new component.

**Acceptance.** Meets the quality bar of HU-04; no photo is published without the owner's permission.

**Depends on.** HU-04.

---

## HU-06-case-meli

**Context.** Closed design. Its recreated product screens stress the component system the most.

**Vertical scope.** MDX content in both languages · recreated product examples as components (visual fidelity refined here) · desktop and mobile variants · replacement of third-party product photos in `assets/meli-ui/` before publishing · `intro-c` variant decided in testing · stories.

**Acceptance.**

- Matches the closed design; third-party product photos are gone or cleared.
- No accessibility claims about the recreated third-party screens.
- The team photo ships only with the owner's confirmed permission.

**Depends on.** HU-04.

---

## HU-07-case-groundcover

**Context.** The GoodRx observability migration (Datadog to groundcover) with a short cards note. GoodRx may be named (decided 2026-10-25).

**Vertical scope.** MDX content in both languages · figures and cards · stories for any new component.

**Acceptance.** Meets the quality bar of HU-04.

**Depends on.** HU-04.

---

## HU-08-case-caps

**Context.** A short "Under construction" page for the Cast & Crew CAPS+ migration.

**Vertical scope.** Status layout reusing the case foundation · CAPS+ content in both languages with client-confidential material left out.

**Acceptance.** The page claims no results or clearance that do not exist; it stays "under construction" until the client clearance is confirmed.

**Depends on.** HU-04.

**Note.** EKOU Personal Nexus was deferred to a later iteration (`docs/content/projects/README.md`) and has no HU. The spike already has a draft of it in `src/content/projects/`; it is excluded from publication until it gets one.

---

## HU-09-notes

**Context.** Notes are short things written along the way. The Home no longer lists them; the dock and footer reach them.

**Vertical scope.** Notes hub grouped by year · note page with date, body, "Discuss on LinkedIn" and "Copy link" · articles collection · shared back pill (Home / All notes) · the first real notes written by the owner, in both languages · stories.

**Acceptance.**

- The hub and a note match v11 on both breakpoints; the back control is the same one the cases use.
- No sample note is published: the placeholder check blocks them.
- RSS decision recorded.

**Depends on.** HU-01. At least one real note from the owner.

---

## HU-10-roadmap-letter

**Context.** Three discovery pieces behind the desk: the Roadmap ("Growing from Senior toward Staff"), the letter, and More about me (10 `TODO(verify)` markers pending).

**Vertical scope.** Roadmap page and timeline · letter page · More about me page · back control decision (text link or shared pill) · board objects linking to them · stories.

**Acceptance.** Staff/Frontend Platform appears as a growth direction, not a title already held; every personal fact is confirmed by the owner or kept as `TODO(verify)`. Finished copy in both languages.

**Depends on.** HU-01, and HU-02 for the objects.

---

## HU-11-seo-sharing

**Context.** The spike already generates OG images with Satori. This applies them to the real pages.

**Vertical scope.** Metadata and canonical per page · hreflang and `x-default` · sitemap (only published pages) · OG images per page type, drawn with Onest (then remove `@fontsource/inter`) · `robots`.

**Acceptance.** Every published page has metadata and an OG image; the sitemap lists only what is public.

**Depends on.** The pages it covers.

---

## HU-12-not-found

**Context.** The 404 page has to be designed before it is built, and must exist before deployment.

**Vertical scope.** Design in a new `docs/design/v12/` folder (v11 stays sealed), reviewed by the owner · implementation in both languages · a way back that fits the dock and back control · story.

**Acceptance.** Unknown routes show the page in the visitor's language, with a clear way back; it follows `principles.md`.

**Depends on.** HU-01.

---

## HU-13-quality

**Context.** Quality is built in each HU. This HU is only the verification pass across the whole site, run with an agent.

**Vertical scope.** Four audits, each recorded in the decision log with findings and what was fixed:

- **SEO:** metadata, canonicals, hreflang, sitemap, OG images, structured data if used.
- **Accessibility:** keyboard-only, screen reader (VoiceOver), zoom at 200%, contrast and focus on the real pages.
- **Performance:** Core Web Vitals and Lighthouse on the real pages against the ADR's 95+ target.
- **Copy:** English and Spanish read side by side, tone, consistency, no sample text, no `TODO(verify)` left in published content, strict placeholder check passing.

**Acceptance.** Each audit has a written result; findings are fixed or consciously accepted by the owner.

**Depends on.** All pages shipped (HU-01 to HU-12).

**Out of scope.** Fixing large issues here: anything big becomes its own HU.

---

## HU-14-launch

**Context.** The technical work to enable the production environment, with no quality work left over.

**Vertical scope.** Cloudflare Pages production branch `main` · domain and DNS · analytics decision · environment and redirects · production deploy checklist.

**Acceptance.** The site is served from the production domain; the checklist is recorded in the decision log. Deployment happens only on the owner's go-ahead.

**Depends on.** HU-13.

---

## SP-01-design-handoff

**Type.** Spike. The answer is a set of documents and a recommendation; nothing is built.

**Context.** Before implementing, the design documentation has to be ready to plan from. The prototype is sealed (v11) but its decisions are spread across the principles, the rounds, the proposals and the decision log.

**Question.** Can HU-01 be planned from the documentation alone, without reading the design rounds?

**Output.**

1. **Design guidelines in one place.** The decisions of `principles.md`, the rounds and the v11 proposal folded into one set (tokens, type scale, accent, motion, back control, dock), pointing to `v11/` as the visual source, in the shape Storybook will document.
2. **Handoff map.** A table: each v11 page (Home, Work, case, notes, roadmap, letter) to its HU, component list and content file.
3. **Blockers made explicit.** Which `TODO(verify)` and external permissions block which HU (photo permissions, PRAGMA video OK, Personajes exports, CAPS+ clearance, CV file, domain).
4. **Repository docs aligned with the owner's decisions.** _Done 2026-10-29:_ `AGENTS.md`, `docs/WORKING-AGREEMENT.md`, `docs/discovery-brief.md`, `docs/decisions-log.md` and the project card now say that tasks live in the GitHub Project and that work is trunk-based (`feature/*`, `fix/*`, semantic commits, `Co-Authored-By` per agent).

_Scope extended 2026-10-30 (issue #4 comment):_ SP-01 also delivers the CSS tokens and the Storybook Introduction, Foundations, Content and Accessibility pages.

**Done when.** The owner agrees HU-01 can be planned from these documents. The recommendation (ready, or what is still missing) is recorded in the decision log.

**Blocks.** HU-01.

---

## Decisions recorded

| Date       | Decision                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-29 | This project's tasks and issues live in the GitHub Project.                                                                 |
| 2026-10-29 | Trunk-based development: `feature/*` and `fix/*` branches, semantic commits, `Co-Authored-By` by agent; no more `claude/*`. |
| 2026-10-29 | Case order: Pragma, Bancolombia, Mercado Libre, GoodRx (groundcover), CAPS+.                                                |
| 2026-10-29 | The Home layout (HU-01) and the board (HU-02) are separate HUs.                                                             |
| 2026-10-29 | Each HU closes with finished copy in both languages; copy is audited at the end by an agent.                                |
| 2026-10-29 | All components live in Storybook, with the guidelines and principles as a personal design system.                           |
| 2026-10-29 | HU-01 carries the cross-page components; it is split into sub-tasks only if it gets too big.                                |
| 2026-10-29 | Quality is built per HU; the quality HU only audits SEO, accessibility, performance and copy.                               |
| 2026-10-29 | The 404 page is its own HU (design, then implementation) before deployment; launch is technical only.                       |

## What is not in the backlog

Anything not tied to a page or section: tooling changes, dependency upgrades, new design versions (those go into a new `v12/` folder), the `jota-design` skill, and EKOU Personal Nexus. They become HUs only if the owner asks.
