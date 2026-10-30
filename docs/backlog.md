# Implementation backlog

The summary below gives the order at a glance. Each spike (`SP-NN`) and user story (`HU-NN`) is detailed only in its issue in the [GitHub Project](https://github.com/users/joulert02/projects/2), which also holds its status. An HU keeps its initial scope as written; what changes while it is built (extra criteria, extra setup, a different approach) is recorded as comments on its issue. Design context for upcoming HUs lives in [the handoff](design/handoff.md) and the [decision log](decisions-log.md).

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
- **Naming:** `HU-NN-<context>` for user stories, where `NN` is the planned order, and `SP-NN-<context>` for spikes.

## Size scale

S = one sitting. M = a few sittings. L = more than that.

## Order at a glance

`SP-01` is a spike and goes first; `SP-02` is a spike that runs in parallel with HU-01; the rest are HUs.

| #   | Item                                                                                   | Slice delivered                                         | Size |
| --- | -------------------------------------------------------------------------------------- | ------------------------------------------------------- | ---- |
| SP  | [`SP-01-design-handoff`](https://github.com/joulert02/jouler-talaigua.dev/issues/4)    | Design docs ready to plan from (spike, no code)         | S    |
| SP  | [`SP-02-testing-setup`](https://github.com/joulert02/jouler-talaigua.dev/issues/20)    | Story-based interaction, a11y and visual tests (spike)  | S    |
| 01  | [`HU-01-home-foundation`](https://github.com/joulert02/jouler-talaigua.dev/issues/3)   | Real Home, plus the cross-page components and Storybook | L    |
| 02  | [`HU-02-home-board`](https://github.com/joulert02/jouler-talaigua.dev/issues/5)        | The explorable board on desktop, compact card on mobile | L    |
| 03  | [`HU-03-work-hub`](https://github.com/joulert02/jouler-talaigua.dev/issues/6)          | Work: the project list with preview                     | M    |
| 04  | [`HU-04-case-pragma`](https://github.com/joulert02/jouler-talaigua.dev/issues/7)       | Case page foundation, built with the Pragma showcase    | L    |
| 05  | [`HU-05-case-bancolombia`](https://github.com/joulert02/jouler-talaigua.dev/issues/8)  | Bancolombia case                                        | M    |
| 06  | [`HU-06-case-meli`](https://github.com/joulert02/jouler-talaigua.dev/issues/9)         | Mercado Libre case                                      | L    |
| 07  | [`HU-07-case-groundcover`](https://github.com/joulert02/jouler-talaigua.dev/issues/10) | GoodRx observability migration case                     | M    |
| 08  | [`HU-08-case-caps`](https://github.com/joulert02/jouler-talaigua.dev/issues/11)        | CAPS+ status page                                       | S    |
| 09  | [`HU-09-notes`](https://github.com/joulert02/jouler-talaigua.dev/issues/12)            | Notes hub and note page                                 | M    |
| 10  | [`HU-10-roadmap-letter`](https://github.com/joulert02/jouler-talaigua.dev/issues/13)   | Roadmap, letter and More about me                       | M    |
| 11  | [`HU-11-seo-sharing`](https://github.com/joulert02/jouler-talaigua.dev/issues/14)      | OG images, sitemap, metadata, hreflang                  | S    |
| 12  | [`HU-12-not-found`](https://github.com/joulert02/jouler-talaigua.dev/issues/15)        | Designed and implemented 404 page                       | S    |
| 13  | [`HU-13-quality`](https://github.com/joulert02/jouler-talaigua.dev/issues/16)          | Audits of SEO, accessibility, performance and copy      | M    |
| 14  | [`HU-14-launch`](https://github.com/joulert02/jouler-talaigua.dev/issues/17)           | Production environment, domain, deploy                  | M    |

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
