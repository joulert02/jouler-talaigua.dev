# Design rounds

Every round is kept, never overwritten. Each entry records what was proposed, the owner's feedback, and what we learned.

## Round 1 · 2026-09-25 · three directions on a canvas

- **Proposed:** editorial (cream and serif), dark terminal with neon, and a poster with cards. [Canvas](https://claude.ai/artifact/KyQKERy1ZyLaQs5rmP6Z3R).
- **Feedback:** rejected; "se ve muy AI", static.
- **Learned:** all three fell into common AI-generated looks, and a static canvas cannot show the motion the owner cares about.

## Round 2 · 2026-09-28 · three animated HTML prototypes

- **Proposed:** [Green Run](https://claude.ai/artifact/2iLQE85bgKcus4hxbzxeT7) (a spec that runs), [Silks](https://claude.ai/artifact/9LEPtFNr6rFDPTnN5zenjJ) (aerial silks in canvas), [JOTA Letter](https://claude.ai/artifact/UcYMRAuYvRLnvGH2t3xYTg) (a variable-weight monogram).
- **Feedback:** better, but "no dignos de un portafolio senior".
- **Learned:** each was built around a clever metaphor instead of the content, and all three were shown half-finished with placeholder content. The fix was to change the process: references first, chosen by the owner, then one screen finished properly.

## Research · 2026-09-28 to 2026-10-22 · Portfolio Atlas

- 64 portfolios across 13 styles. Result: [references.md](references.md).

## Round 3 · 2026-10-22 · specimen (type, accent, scale)

- **v1** ([link](https://claude.ai/artifact/Sse2w6RodMHDPo9cMEaYw4)): three sober accents (cobalt, indigo, muted violet) and three typefaces.
  - **Copy:** the hero sentence "doesn't say much"; the location with a status dot looks AI-made; unsure about "Writing" in the card.
  - **Interaction:** liked the list's focus-dim and the View Transition; the arrow sat in the wrong column (bug).
  - **Legibility:** the paragraph and the selection (white on accent) were not legible enough, and legibility is the top priority. The scale felt small.
  - **Color and type:** the accents felt "tristes"; he preferred the violet and asked for livelier options. He liked Geist.
- **v2** ([link](https://claude.ai/artifact/Mjv3RJ5Lm5bi1Ttm9zWjYh)): six livelier accents, each with fill and text tones; Geist, Onest, Figtree and Host Grotesk; compact or wide scale; three hero sentences; readable selection; a "More" disclosure.
  - **Choice:** vivid violet, Onest, compact scale (wide stays configurable), the concrete sentence, accent-text selection, cool neutral.
  - **Open:** keep "More" for now, test it against plain links later, and get a UX review of where it belongs.
- **Learned:** vivid colors need a separate, darker text tone to stay accessible, so "lively" and "legible" are not a trade-off.

## Round 4 · 2026-10-22 · Home as a sober board (option B)

- **v3** ([link](https://claude.ai/artifact/U5MiwwDQSjNYTt8AfKY1sQ)):
  - **Card:** name, role, the concrete sentence, CTAs, and a career path. A prototype toggle switches between plain links and the "More" disclosure.
  - **Objects:** a teaching photo, a portrait, a COL→MAD ticket, a "now learning" note, and two placeholders for the owner's photos. Draggable and flippable on desktop; a swipeable strip on mobile.
  - **Selected work:** a list with focus-dim and a sticky preview; a View Transition into the detail.
- **Independent UX review:**
  - Use a plain "More about me" link to a separate page, not a disclosure: the board already carries the personal layer.
  - Make the CTAs work.
  - Show stack and location at a glance.
  - Keep objects off the card.
  - Make the objects accessible.
  - Order the mobile strip by information value.
  - Raise the 0.38 dim on the list.
- **v3.1** (same link, version 2 of that page):
  - **Bugs fixed:** two photo slots overlapped the card and one was clipped. Objects are now anchored to the side gutters.
  - **Contact:** "Get in touch" and the footer email are working links.
  - **Accessibility:** removed the aria-labels that hid the back faces; added alt text.
  - **Hint:** larger and centred.
  - **Mobile:** the strip starts with the ticket and the note.
  - **Copy:** "6+ yrs exp." replaces the ambiguous "Seat 6+ yrs".
- **Owner feedback on v3:**
  - **Board:** loves drag & drop and wants the card to be a locked zone. Likes the photos and the ticket; wants "Now learning" replaced by a rocket that opens a Senior → Staff roadmap. Wants more personal objects (moto, pole, Feid, Naruto, League of Legends, the Colombian flag, a letter to curious visitors) and an expand icon to show more.
  - **Navigation:** the top nav feels template-like. Asked whether "Get in touch" and "Contact" go to the same place.
  - **Notes and footer:** wants Notes (not a blog) with comments and LinkedIn sharing, and a footer like Clara's.
  - **Layout:** the work section had a big empty space on the right.
- **v4** ([link](https://claude.ai/artifact/DKeHeH2PWjzoYpUntqiA54)), with each decision validated by an independent UX review first:
  - **Locked card zone:** a dropped object is pushed off the card along the drag direction, the board edges clamp it, and the card shows a dashed outline while dragging. Keyboard users press M to move with the arrow keys. Positions persist.
  - **Objects:** 5 on the board (teaching, moto with the plate blurred, ticket with a tiny Colombian flag, rocket, letter). "Explore the desk" opens a modal dialog with all 10 (adds portrait, a Feid record, a Naruto card, a League of Legends card, pole). Pole sport lives only in explore mode, with the photo on the back face, for recruiter safety. Third-party brands appear as text only.
  - **Roadmap and letter:** the rocket launches into a roadmap view with done / in progress / next milestones and no percentages. The envelope opens a letter: handwritten greeting and signature, body in the reading font.
  - **Header and contact:** the nav links are gone; the header keeps the JOTA mark and one "Get in touch". Every contact action leads to a single contact block, and the email with a copy button is also inside the card.
  - **Footer:** Clara-style, with Site, Elsewhere and Contact columns plus a large wordmark.
  - **Selected work:** 7/5 columns with a sticky preview; the detail view now uses the full width (fixes the empty box); thumbnails replace hover on touch.
  - **Notes:** example cards with "Share on LinkedIn" and "Copy link".
- **Open for the owner:** the comments strategy for Notes, the letter text, the Staff-level goals, music, anime and LoL details, and whether pole sport is the right label (the brief said aerial silks).

## Round 5 · supplied Home v5 · 2026-10-22 baseline

- **Source:** Jouler supplied `JOTA Home v4.html` for [the v5 artifact](https://claude.ai/artifact/AGs2uSGhxJbFN1NN1cfZrr). The filename/title says v4; the page's internal label says Home v5. The exact export is now [local v5](v5/index.html).
- **Owner clarification:** visitors should infer user-focused engineering and professional fit from the projects and the portfolio itself. Do not add a stack, availability or time-zone checklist to the hero; the COL→MAD ticket and downloadable CV provide the location context he wants.
- **Curiosity:** movement and overlap are intentional parts of discovery. The roadmap is primarily an object for interested visitors, not a main navigation priority.
- **Narrative:** care for users and teams, the QA-to-engineering trajectory, architecture, leadership and teaching should form a coherent professional thread. Hobbies need no engineering metaphor. Project claims and note/letter examples are provisional; Jouler will supply original content.

## Round 6 · 2026-10-23 · isolated Codex proposal

- **Proposed:** [local v6](v6/index.html), derived from v5 on a separate branch. Removed the prototype toolbar and separate JOTA header; retained JOTA inside the identity card. Added a visible Explore my desk action, kept the card in expanded exploration, removed Roadmap from the dock, and gave five cases dedicated URLs with native View Transitions. See [v6 proposal](v6-proposal.md).
- **Hero proposal:** “I build products with care for the people using them—and the teams behind them.” It remains draft copy, not a final approved headline.
- **Owner feedback:** the framed board and glimpse of Work beneath it diluted immersion and created competing focal points. The owner's full-screen adjustment restored the hierarchy: card first, objects second, menu third. Work/Projects should be immediately accessible from the dock; either label is understood.
- **Work feedback:** the list, preview and Notes felt flat at the same visual weight. Use Clara's scale, spacing and section separation to make projects stand out. Smooth wheel input and a pannable board should feel more considered.
- **Learned:** recruiter access does not require exposing Work in the first viewport. Preserve a calm arrival, then give professional content a clear editorial hierarchy when reached.

## Round 7 · 2026-10-23 · immersive Home and mobile exploration

- **Current proposal:** [local v7](v7/index.html), preserving v6 unchanged. Full-screen desktop introduction; Work below the initial viewport and reachable from the dock. Work has a large heading, company labels, larger project titles, shorter metadata and a substantial preview; Notes has a separate, quieter entrance.
- **Mobile direction from the owner:** show the identity card first. More about me opens the immersive desk rather than the letter. Curious visitors can pan, move objects, and discover the letter, roadmap and personal interests there.
- **Desk:** background drag pans the camera; object drag moves the object; wheel/trackpad pan, with zoom, overview and recenter controls. The identity card remains present. Mobile exploration omits its repeated career list; Home retains the full list.
- **Reading:** letter and roadmap appear over the desk. Back to desk keeps the camera position. Closing exploration restores focus to its launcher.
- **Motion:** short easing on coarse wheel input; direct fine trackpad input and immediate dragging. Reduced motion disables easing and transitions. Object drops still protect the card.
- **Content:** no final case studies or original notes were authored in this iteration. Inherited claims remain provisional. See [v7 proposal](v7-proposal.md) for scope and the October 23 browser evidence; a real-phone review remains with the owner.
- **Status on 2026-10-25:** v7 is running locally for Jouler's review. Design approval, final copy and production Astro integration are still pending.

## Consolidation · 2026-10-25

- Claude's existing design documents and Codex's v5/v6/v7 prototype bundle now live in the main repository checkout. v7 is the single current review proposal; v5 and v6 are retained comparisons, not parallel current designs.
- [History guide](README.md) records attribution, local preview instructions and preservation checks. HTML is the source for subsequent review iterations; old artifact links remain historical provenance. HTML for rounds 1–4 has not been supplied.
- Imported only the portfolio design files, assets, proposal records and history checker. GoodRx output, unrelated dependency changes and agent configuration were excluded. No commit, push or deployment performed.

## Round 8 · 2026-10-25 · direct desktop exploration and compact mobile

- **Owner direction:** remove the extra desktop fullscreen step. Test wheel/trackpad and pointer panning directly in Home, with Work always available to release page scrolling and reach projects. The owner prefers testing this option despite the risk that some visitors expect scrolling to reveal the next section.
- **Mobile direction:** More about me transitions to a compact name/role card; allow camera dragging from that card, remove the internal header strip and use the area above/below it for nearby personal objects.
- **Implementation:** [local v8](v8/index.html) uses one shared world inline on desktop and inside a mobile-only dialog. v7 sources remain unchanged. Letter/roadmap stay in reading panels; dedicated case URLs remain available.
- **Review status:** Jouler tested the prototype, accepted these interaction changes and requested a commit on 2026-10-25. Final copy and production integration remain pending. [Scope and verification](v8-proposal.md). The nine project-content drafts remain separate and pending owner review.

## Round 9 · 2026-10-26 · project case template

- **Owner direction:** with the copy approved, design the project screens; Claude builds, Codex reviews. Follow the guidelines and references and run exhaustive UX reviews.
- **Proposed:** [local v9](v9/work/mercado-libre-lists/index.html). Work list with the five approved cases (prize roulette removed, Personal Nexus deferred). The Mercado Libre case is built in full as the template: header with title, headline and focus line; approved facts; inline contents; Before/After captures; test coverage and an illustrative Gherkin scenario; an interactive simulation comparing page and stack navigation; an architecture diagram. Other cases get light pages until v10.
- **Independent UX reviews:** before building (cut the chapter rail, the device-mockup hero and two segmented controls; Before/After side by side; demo as a labeled simulation with Play) and after building (three blockers and seven important issues fixed: focus on Play, legible screenshots with enlargement, no internal note on stub pages, demo robustness, dock covering focus, touch targets). See [v9 proposal](v9-proposal.md).
- **Learned:** a visual that points at text must render that text legibly; a demo about losing your place must not lose the reader's place (the back link returns to the same row); on a reading page, interactive pieces need a scripted path so skimmers see the point without trying it.
- **Status:** awaiting Jouler's review and Codex's code review (`.orca-handoff/2026-10-26-v9-case-review/`).
