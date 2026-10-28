# Portfolio v9 — project case template

**Date:** 2026-10-26. **Status:** built by Claude for Jouler's review; code review by Codex pending. **Branch:** claude/design-direction.

## Scope

v9 derives from v8 and leaves every earlier version unchanged. It brings the approved project content into the prototype for the first time.

- **Home › Work:** the five approved cases in tier order (Mercado Libre, Bancolombia, GoodRx, PRAGMA brand platforms, CAPS+), with approved titles, companies and focus lines. The prize roulette is removed; Personal Nexus is deferred and not listed. Years appear only where already public on the identity card; Bancolombia shows none by Jouler's decision. CAPS+ carries its approved "Under construction" status.
- **Case template:** the Mercado Libre case is built in full as the template for every case.
- **Other cases:** static pages with the approved title, company, headline and summary, marked "Case page in design" until the template is approved (v10).
- **Sample content cleanup:** the home sample note and roadmap line that referred to the prize roulette or an unapproved team size were replaced with wording taken from approved copy. Notes and roadmap remain samples.

## Process

1. Structure proposal written before building.
2. Independent UX review (subagent) of the proposal. Applied: no chapter rail (an inline contents list instead), side-by-side Before/After, no device-mockup hero, neutral coverage visual, approved facts only, the demo as a labeled simulation with a scripted Play. Not applied: a "Results" fact line, because it would be new copy without Jouler's approval.
3. Build, then browser verification and a second, exhaustive independent UX review of the built pages (findings and fixes below).
4. Code review by Codex (cross-provider rule), via `.orca-handoff/2026-10-26-v9-case-review/`.

## Case page anatomy

1. Top bar: JOTA mark (home) and "← All work", which returns to the same row in the Work list (`/design/v9/#work-<slug>`), focused.
2. Header: company label, H1 project title (View Transition name shared with the list title), the approved headline as deck, the approved focus line.
3. Intro: the two approved paragraphs, an inline contents list, and facts limited to the approved Role, Period and Technology.
4. Chapters with numbered labels, a 68ch reading column and visuals up to 1120px:
   - **01 Lists:** two Before/After pairs from clean captures (Spanish labels translated in captions; sample data noted).
   - **02 Tests:** coverage bar (~60% estimate → 80%+, with 80% marked as a deliberate bar) and an illustrative Gherkin scenario, labeled as not Mercado Libre code.
   - **03 Navigation:** an interactive simulation (generic data) comparing page navigation and stack navigation. Play runs the same steps on both phones; results and a stack readout explain the mechanism. Mobile shows one phone with a Before/After switch.
   - **04 What I learned:** the approved quote and paragraphs, with an HTML diagram from product APIs to every device.
5. Next case and All work, then the shared footer and dock.

## Implementation

Static HTML/CSS/JavaScript under `docs/design/v9/`; no packages, no production Astro changes.

- `index.html`, `app.js`, `canvas.js`, `experience.js`, `styles.css`: copied from v8. `app.js` carries the new Work data, row anchors and the return-to-row route; `styles.css` adds status tags and focus rules at the end; storage keys are `jota-v9*`.
- `case.css`, `case.js`: case pages only. `case.js` handles theme (shared with home), copy, dock visibility and the navigation simulation. Case pages do not load the board code.
- `work/<slug>/index.html`: static case pages, so the content is readable without JavaScript and maps directly to future Astro routes.
- `assets/`: clean web derivatives (WebP) of the supplied captures. Personal data cropped (name, address); the annotation box removed from the heart capture.
- Cross-document View Transitions are opt-in (`@view-transition`) and disabled under reduced motion.

## Review

```sh
python3 -m http.server 4326 --bind 0.0.0.0 --directory docs
```

- Case: `http://127.0.0.1:4326/design/v9/work/mercado-libre-lists/`
- Work list: `http://127.0.0.1:4326/design/v9/#work`

## Built-page UX review and fixes · 2026-10-26

A second independent review tested the built pages in the browser (keyboard, contrast, widths 320–1920, reduced motion, demo robustness). Fixed:

- **Blockers:** Play no longer drops keyboard focus (aria-disabled instead of disabled; focus returns to Play). Screenshots are legible: inline crops near 1:1, every capture opens full size in a dialog, and pair images share an aspect ratio. Stub pages no longer show an internal note: they show the approved summary, facts and a contact action.
- **Important:** the demo is inert while Play runs and both phones always run, so switching view or resizing never shows a half-finished comparison; reduced motion keeps the step pauses; the Before list shows its stuck loader immediately; one tab stop per list with arrow keys (roving tabindex); `scroll-padding-bottom` keeps focused elements clear of the dock; touch targets ≥44px.
- **Smaller:** one live announcement per run; footer gets a heading for screen readers; `aria-current="true"` on case pages; 62ch prose; stronger coverage track and 80% marker; hover styles only on hover devices; case and home share the 1240px container; browser Back from a case also returns to its row; real meta descriptions.
- **Kept as is:** the Before card in "Saving a product" is shorter than the After pair; acceptable, since the After shows two devices.

## Verification · 2026-10-26

- Automated checks with Playwright (Chromium) on a local static server:
  - Play keeps focus and ends on "Play again"; manual clicks during Play have no effect; results read "Back at item 1…" (Before) and "Back at item 14…" (After); the Before loader shows "(stuck)".
  - One tabbable item per list; arrow keys move focus.
  - Reduced motion: the run takes about 3 s with every step visible.
  - Mobile: mode switch locked during Play; after the run both modes show their result.
  - Tabbing through the page: 0 of 44 focus targets fully hidden by the dock at 1440 px and at 390 px.
  - No interactive element under 44 px tall at 390 px.
  - Image dialog opens and returns focus to its image button.
  - "← All work" and browser Back both return to the case's row in the Work list, focused.
  - No horizontal overflow at 390 px; no console errors.
- Contrast (from the review): all text tokens pass WCAG AA in light and dark.
- `node scripts/verify-design-history.mjs` passes with v9 added.
- Not verified: Safari and Firefox (cross-document View Transitions are progressive enhancement), real phones, and screen readers beyond the accessibility tree.

## Open for Jouler

- A gift-list capture: the title says Gift Registry, but no supplied capture shows a gift list. Captions avoid implying one.
- Whether the Work list should keep "Under construction" for CAPS+ (approved copy) or use "In progress" (the reviewer's concern: it can read as an unfinished site).
- The Bancolombia team photo, Personajes assets and the iframe check feed v10.
