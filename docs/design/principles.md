# Design principles

- **Status:** Draft v0.3. Becomes final when the Home prototype is approved. · **Date:** 2026-10-22
- **Inputs:** [references.md](references.md), [rounds.md](rounds.md), [discovery brief](../discovery-brief.md)

## Concept: calm surface, curious depth

The surface gives a recruiter what they need in seconds, with no noise. Beneath it, a quiet personal layer rewards curious visitors. Precise details (one accent, focus and transitions) hold both together. This is the visual form of the brief's two doors, Work and Life.

## Home layout: the sober board (option B, approved 2026-10-22)

- A central card holds name, role, one concrete sentence, "Get in touch" and "Download CV", links (LinkedIn, GitHub, More about me) and the career path. The card is a locked zone: objects dropped on it are pushed into free space.
- Professional-leaning objects sit around the card on desktop: a teaching photo stacked over a motorbike photo, the COL→MAD ticket, a portrait, the roadmap rocket and a pole sport card. On mobile they become a swipeable strip below the card.
- "Explore the desk" opens a dialog with everything, including the letter, music (Nanpa Básico, _Unicornio_), anime (Naruto) and League of Legends.
- Work sits below the board as a list with focus-dim hover and View Transitions into each case. Notes follow as a compact list of 3, shown only once 3 real notes exist.
- Navigation: the JOTA mark at the top and a floating dock at the bottom (Home, Work, Notes, Roadmap, copy email, theme) that hides when the footer is visible. The footer is the sitemap: Site, Social and Contact columns, a large name wordmark, and "Hecho en Madrid, con raíces colombianas".
- The idea is Andre's (information at the centre, curiosity around it), but the objects, accent and JOTA mark are the owner's own. It must never read as a copy.

## Principles

1. **Legibility first.** Body text is never below 17px, and reading text gets a 1.7 line height. Text is never white on the accent for selection. If a choice trades legibility for style, legibility wins.
2. **Hierarchy by size and tone.** Color is not used for hierarchy; the accent marks interaction only.
3. **One accent, used sparingly.** Links, focus, selection, the primary button and small details. Each accent has a vivid fill tone and a darker text tone that passes WCAG AA (4.5:1).
4. **Grayscale with a cool bias, never pure black.** Dark mode uses deep greys, not #000.
5. **Motion that is fast and measured.** Ease-out curves of about 180–350 ms. No bounce, no scroll-jacking, and no smooth scroll on lists. Interrupting or reversing an animation must never break it. `prefers-reduced-motion` turns it all off.
6. **Speed is part of the design.** Prefetch links, use View Transitions between pages, and keep client JS for chrome at zero (per ADR 001). Personal objects load lazily.
7. **Personality is opt-in.** Personal content never pushes professional information below the fold. Sound is off by default and has a visible mute.
8. **Real content only.** No stock images or invented facts; `TODO(verify)` until confirmed.

## Tokens decided so far (specimen v2)

| Token         | Value                                                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accent        | Vivid violet. Fill `#6E44F0`, text `#5A31D9`, dark mode `#A58BFF`, text on fill `#FFFFFF`                                                             |
| Typeface      | Onest (400/500/600); labels in Geist Mono                                                                                                             |
| Neutral       | Cool: bg `#F6F7F9`, surface `#FFFFFF`, ink `#141517`, muted `#5F656E`, line `#E1E4E8`. Dark: bg `#131417`, surface `#1C1E22`, ink `#EEF0F3`           |
| Type scale    | Compact by default (display 36, title 26, lead 20, body 17, small 14.5, label 11.5). Wide (52/32/24/19/15.5/12) stays available as a visitor setting. |
| Selection     | Accent text on a soft accent background (Clara style)                                                                                                 |
| Hero sentence | "I build products people use every day, from Mercado Libre's first game to a bank's micro frontends." (draft)                                         |

## Open questions

- Comments on notes: cross-post each note to LinkedIn and link "Discuss on LinkedIn" (recommended, pending the owner's decision).
- Content from the owner: the letter, the Staff-level goals, real notes, and the Instagram and TikTok URLs.
- More objects later: football, aerial silks.
- A visitor-facing settings button (theme, scale, maybe sound).
- The JOTA mark: where it appears (favicon, loader, OG images).
- The icon-only "Explore the desk" button is under test; UX recommends a visible label.
