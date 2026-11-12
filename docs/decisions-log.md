# Decisions log

One line per decision, newest first. Details live in the linked document.

- **2026-11-12 · SP-03 recommendation (pending owner acceptance, [#23](https://github.com/joulert02/jouler-talaigua.dev/issues/23)):** pure components take already-resolved copy as one typed `labels` object; containers (Base, views, IdentityCard, Footer, CareerPath, AboutMe) read the language once. Labels are built with a plain helper (option 3), not a HOC (1) or a wrapper per component (2). This comes from reading the code and Astro's component model; nothing was installed or run (see "Not verified").

  | | 1. HOC `withLabels` | 2. Wrapper `.astro` | 3. Helper `labelsFor` |
  | --- | --- | --- | --- |
  | Typed props under `astro check` | Not expected: `.astro` files compile to render functions with no public wrapping API, so it would need casts | Yes | Yes (`labels: ThemeToggleLabels`) |
  | Slots and `<script>` | Slots forwarded by hand through internal APIs; scripts are bundled per module, so runtime wrapping is fragile | Yes (`<Pure {labels}><slot /></Pure>`) | Unchanged: the component renders directly |
  | Cost per component | One shared factory, plus casts and internal API use | About 10 lines and one more file each | 1 type in the component, 1 line in the container |
  | Storybook Controls | The story renders the wrapper, so Controls stay tied to translations | Same: Controls reach the wrapper, not the labels | The story renders the pure component; `labels` is an editable object control |

  Why 3: it is the only option where the story renders the same component the site renders, so the copy changes from Controls with no `locale` control. A page still cannot mix languages, because containers call the helper with the one page language. Option 2 stays an escape hatch for a container that needs composition, not a pattern per component.

  Sketch, to implement on acceptance: `labelsFor(lang, { label: "dock.themeLabel", tooltip: "dock.themeTooltip" })` returns `{ label: string; tooltip: string }`, typed from the map's keys, in `src/i18n/ui.ts`.

  Not verified: the ThemeToggle probe for each option was not built or run through `astro check` or Storybook, because dependencies were not installed in this run and installing them was not permitted. The option 1 and 2 cells are expectations to confirm before accepting. The migration of the issue's table has not started; it waits for acceptance.

- **2026-11-12 · HU-01 closed (scope changes in [#3](https://github.com/joulert02/jouler-talaigua.dev/issues/3)):**
  - **Body text and Home:** body text is 16px, the browser default, against the 17px in the HU acceptance. The identity card lands in HU-01, centered from 561px and at the top on phones, with copy version A in both languages.
  - **"More about me":** it is its own page, and the card morphs into it with cross-document view transitions, which [ADR 002](adr/002-language-switch-transitions.md) also adopts for the language switch.
  - **Dock and settings:** the Dock takes ready links (`DockLink`) and steps away at the footer as in v11. On phones, theme and language move into a settings gear.
  - **Out for now:** Roadmap and "A letter for you". The footer has no language pill.
  - **Follow-ups:** components that are pure vs. containers in [SP-03](https://github.com/joulert02/jouler-talaigua.dev/issues/23), and the language switch's own transition, after the board, in [HU-15](https://github.com/joulert02/jouler-talaigua.dev/issues/25).

- **2026-10-30 · SP-01 answered, HU-01 ready to plan:** HU-01 can be planned from Storybook, [the handoff](design/handoff.md) and `v11/` without reading the rounds. Settled inside HU-01: the dock keeps both variants (v11 without Roadmap, and one with it) until the layout is implemented; the Home language switch is designed first in `v12/`; the Draft scales (space, radius, motion) are frozen against v11 in the browser. The design docs target WCAG 2.2 AA. Testing moves to stories (interaction, accessibility, visual) through [SP-02](https://github.com/joulert02/jouler-talaigua.dev/issues/20), in parallel with HU-01; node tests stay for global guards.

- **2026-10-30 · design documentation and tokens (SP-01):** design rules live in Storybook (Introduction, Foundations, Content, Accessibility, then Patterns and component docs), read live from `src/styles/tokens.css`; markdown keeps planning ([handoff](design/handoff.md)) and history. Tokens are one semantic layer named `--{category}-{role}-{variant}`, with no brand prefix and `--_name` for component-local variables; the spacing, radius and motion scales are Draft until the owner reviews them. Patterns pages are written once Home is built and iterated with each page. Onest, Geist Mono and Caveat are self-hosted; Inter stays for the OG images until HU-11. `guidelines.md` was folded into Storybook and the handoff (superseded statements below).

- **2026-10-29 · workflow and backlog:** this project's tasks live in the GitHub Project (the Notion Sprint Board stays as history). Work follows trunk-based development with `feature/*` and `fix/*` branches, semantic commits and a `Co-Authored-By` trailer per agent; `claude/*` branches are retired. The plan is in [the backlog](backlog.md): a spike and 14 vertical user stories, taken one at a time.

- **2026-10-28 · owner sealed v10:** the prototype is closed with the Mercado Libre and Pragma cases; its file hashes in `history/v10.json` are now final and any further change is a new version (v11). Primary intro: media beside "What I learned" (photo for Mercado Libre, the PRAGMA video for Pragma), with the plain version kept as a secondary variant in `learned/`. Video optimization and ES/EN subtitles are for development. No pre-commit hook for the hash check (owner: not needed). Details: [v10-proposal.md](design/v10-proposal.md).

- **2026-10-27 · owner closed the Mercado Libre case design (v10):** the main page keeps the "What I learned" intro; the alternative intro (`intro-c`: role text, quote, team photo, floating "See what we built" button) stays as a variant to decide in testing; proposal B (violet frame) is discarded. Visual fidelity of each example is refined when the production components are built. Team-photo publication permission and replacement of the third-party product photos are pending. See [v10 proposal](design/v10-proposal.md).

- **2026-10-26:** Project copy approved for design: Mercado Libre, Bancolombia, GoodRx, CAPS+ and the PRAGMA brand platforms (Personajes assets pending). The Bancolombia team photo is designed in now; permission is requested before publication by showing the built page. v9 (project screens) is built by Claude and reviewed by Codex. See [project content](content/projects/README.md).
- **2026-10-25 · interaction accepted:** Jouler tested v8, accepted the interaction changes and requested a commit. Desktop Home captures scroll/pan, with Work restoring normal page scrolling. Mobile exploration uses an animated compact card and floating Close. The earlier v7 behavior remains available for comparison; final copy and production integration remain pending. See [v8 proposal](design/v8-proposal.md).

- **2026-10-25:** Project content: six pages in three tiers. Full cases for Mercado Libre (Favorites & Gift Lists), Bancolombia and GoodRx; one brand-platforms showcase (Nosotras Online, Personajes NOL, TENA, Petys); short status pages for CAPS+ and Personal Nexus. The prize roulette is dropped. See [project content](content/projects/README.md).
- **2026-10-25:** Brand sites appear as live previews: a cached capture that expands with a View Transition, with the live site embedded when allowed and "Open site ↗" always available.
- **2026-10-25:** Case content is gathered through interviews and written by the lead in Jouler's voice. See [interviews](content/projects/INTERVIEW.md).
- **2026-10-25:** Consolidate Claude's design documents and Codex's HTML prototypes in this repository. v7 is the current review proposal; v5/v6 remain intact comparisons. Use local HTML for future review iterations; retain old artifact links as provenance. See [history guide](design/README.md).
- **2026-10-23 · owner direction:** Home arrival prioritizes the identity card, then personal objects, then the dock; Work need not appear in the first viewport if it is one click away. Work and Projects are both understood; v7 retains Work.
- **2026-10-23 · owner direction:** Mobile More about me opens an immersive, navigable desk. Keep the identity card in exploration; letter and roadmap are discoveries inside it. See [round 7](design/rounds.md#round-7--2026-10-23--immersive-home-and-mobile-exploration).
- **2026-10-23 · owner direction:** Use direct drag and short, interruptible wheel easing for exploration, plus stronger typography and spacing for Work. Physical-device feel and the v7 design remain under review.
- **2026-10-23 · owner direction:** Remove the prototype controls and separate JOTA header; keep JOTA inside the identity card. Roadmap is reached through its object rather than the main dock. These supersede the October 22 header/dock description below.
- **2026-10-23 · owner direction:** Projects/site quality should demonstrate expertise and professional fit. Keep location in the ticket/CV; avoid a hero checklist. Hobbies stay personal. The users-and-teams hero sentence is a proposal, and inherited cases/notes require owner-authored final content.
- **2026-10-23 · owner accepted direction:** Give each case its own URL and use View Transitions where available, with normal navigation otherwise.
- **2026-10-22:** Navigation is a floating dock (Home, Work, Notes, Roadmap, copy email, theme); the header only carries the JOTA mark. See [rounds](design/rounds.md).
- **2026-10-22:** Notes are plain notes: a compact list of 3 on the home (only with 3 or more real notes), /notes grouped by year, and a simple note page.
- **2026-10-22:** Home layout is the sober board (option B). See [principles](design/principles.md).
- **2026-10-22:** Accent: vivid violet (fill `#6E44F0`, text `#5A31D9`). Typeface: Onest. Neutral: cool. Scale: compact by default, wide configurable. See [rounds](design/rounds.md#round-3--2026-10-22--specimen-type-accent-scale).
- **2026-10-22:** Design happens in code, in the browser; no Figma.
- **2026-10-22:** Every design iteration is versioned as its own page; nothing is overwritten.
- **2026-10-22:** References closed: Moritz Petersen, Andre Souza, Clara Fois. See [references](design/references.md).
- **2026-09-28:** Rounds 1 and 2 rejected. Switched to a references-first process with the owner as art director. See [rounds](design/rounds.md).
- **2026-09-25:** Stack: Astro. See [ADR 001](adr/001-stack.md).
- **2026-09-25:** Discovery closed. See [brief](discovery-brief.md).

## Superseded statements

| Earlier statement                                           | Now                                          | Since      |
| ----------------------------------------------------------- | -------------------------------------------- | ---------- |
| Dock includes Roadmap (decisions 2026-10-22)                | Rocket object only                           | 2026-10-23 |
| Zoom, overview and recenter on the desk (principles, v7–v8) | Removed; walk the board, `0`/Home recenters  | v11        |
| Notes list of 3 on Home once 3 real notes exist             | No notes on Home; dock and footer reach them | v11        |
| Wheel push at the bottom opens Work (v10)                   | Held drag only                               | v11        |
| "← All work" text link; JOTA mark on case pages (v9)        | Back pill; no mark, no dock on cases         | v10        |
| Screenshots as case visuals (v9)                            | Recreated, working components                | v10        |
| Muted `#5F656E` (principles.md)                             | `#5B616A` (`--color-text-muted`)             | v11        |
| Scale toolbar, wide scale configurable                      | Compact only; no visitor scale setting       | v7         |
| Design tokens listed in `principles.md`                     | `src/styles/tokens.css`, shown in Storybook  | 2026-10-30 |
