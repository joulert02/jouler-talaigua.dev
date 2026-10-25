# Portfolio v6 · design proposal

Integration note · 2026-10-25: this proposal and its HTML, styles, scripts and assets are now included in the main repository checkout alongside Claude’s design documents. The isolation statements below describe the original October 23 implementation session. v7 is the current proposal under owner review; v5 and v6 remain historical comparisons. This import does not approve the design, verify sample content, or integrate it into the production Astro pages.
Status: isolated local proposal for owner review. Not an approved replacement for v5.

## Baseline and isolation

- Code baseline: `claude/design-direction`.
- Design baseline: Home v5, artifact `AGs2uSGhxJbFN1NN1cfZrr`.
- Proposal branch: `codex/portfolio-v6-proposal`, in a separate managed checkout.
- The current checkout and its untracked design documents must remain unchanged.
- Source supplied by the owner: `JOTA Home v4.html`; its internal prototype label is Home v5. A byte-for-byte copy is retained under `public/design/v5/index.html`.

## Intent

Let visitors get to know Jouler through his work and an explorable personal desk. Projects and the quality of the site should demonstrate user-focused engineering. Do not turn the introduction into a list of hiring requirements, technology badges, location details, or availability claims.

## Proposed hero

Senior Full-Stack Software Engineer

I build products with care for the people using them—and the teams behind them.

Keep the existing personal name, career path, contact actions, and links. The copy is proposed for review, not confirmed final biography.

## Changes to evaluate

1. Remove the prototype toolbar (version, date, old-version links, scale controls). The Claude artifact toolbar belongs to its host; a local standalone preview naturally excludes it.
2. Remove the separate JOTA header row. Integrate the JOTA signature into the main card, retaining the full public name as the primary heading and leaving the signature visible in expanded desk mode.
3. Give the expand action a visible “Explore my desk” label.
4. Expand the same desk, retaining its central card and existing objects. Include all personal objects in a larger scrollable canvas with drag and keyboard movement; do not replace the desk with an empty gallery.
5. Keep movement and discovery intentional. Preserve the card as a protected area, avoid stealing touch scrolling, and keep opening/flipping distinct from dragging.
6. Keep the roadmap accessible from its object; remove it from the main dock in this proposal. Its title must distinguish growth direction from achieved role.
7. Keep hobbies personal. Remove forced engineering metaphors; do not invent preferences or replace owner-provided facts.
8. Give cases dedicated URLs with browser-native cross-document View Transitions and normal navigation when unsupported or reduced motion is requested.
9. Keep location in the ticket and CV; no new location, time-zone, availability or technology row in the hero.
10. Treat project details, outcomes, article copy and dates as inherited sample content. Do not manufacture final case studies or notes for this design iteration.

## Narrative thread

Care for users, shaped by QA experience; building products and frontend architecture; extending that care to teams through leadership and teaching. Show this through the hero, real projects and later owner-written notes, without turning each interest into professional justification.

## Validation

- No changes in the original checkout; new branch confirmed in the separate checkout.
- Desktop and mobile: no version toolbar or separate brand header; JOTA still visible.
- Expanded desk: main card retained, all objects discoverable by movement, clear close action, focus restored after closing.
- Drag does not trigger flip; pointer and keyboard movement remain usable; card stays protected.
- Project URLs support direct load, browser Back and new-tab opening; transitions respect reduced motion.
- No roadmap link in the main dock; roadmap object still opens its content.
- Existing sample content is not represented as newly verified publication.
- Local preview only; no commit, push, deployment or publication.

## Local review

This is a static design prototype derived from the supplied HTML, kept under Astro’s `public/` directory. The existing Astro views and production content are unchanged. No dependencies were added. Production component integration and final case/note authoring are outside this proposal.

Run from this checkout:

```sh
python3 -m http.server 4326 --bind 127.0.0.1 --directory public
```

- Proposal: `http://127.0.0.1:4326/design/v6/`
- Original: `http://127.0.0.1:4326/design/v5/`
- Implementation: `public/design/v6/index.html`, `app.js`, `styles.css`, and the five `work/` route directories.
- Shared photographs were extracted losslessly from the supplied HTML into `public/design/assets/`.

## Verification · 2026-10-23

- JavaScript syntax checked with Node.
- Desktop and 390 × 844 viewport inspected in Chrome.
- Expanded desk retains the identity card and all ten objects; mobile card fits the viewport horizontally.
- Pointer drag onto the identity card settles outside it without flipping the object.
- Keyboard M / arrows / Enter exercised in the expanded desk; final position settles outside the card. Flip remains inactive during movement.
- Closing exploration returns focus to its launch button.
- Theme toggles both ways; roadmap object opens its view; roadmap is absent from the main dock.
- Favorites and Bancolombia cases navigated through real links; direct reload and browser Back exercised.
- Mobile page has no horizontal overflow outside its intentionally scrollable desk.
- Native transition support detected in the test browser. Browsers without support use normal document navigation; reduced motion disables transitions in CSS and same-document navigation in JavaScript.
- Original checkout still reports `claude/design-direction` with the same untracked files as at session start. Proposal checkout is on `codex/portfolio-v6-proposal`; no commit, push or deployment performed.

Reference checked through Context7 on 2026-10-23: [Astro view transitions guide](https://docs.astro.build/en/guides/view-transitions/), specifically the distinction between browser-native cross-document transitions and the client router. This prototype uses native CSS transitions and ordinary page links.
