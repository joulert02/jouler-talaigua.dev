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
