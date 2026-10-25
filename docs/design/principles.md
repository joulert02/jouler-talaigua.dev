# Design principles

---------- [Codex] ---------

- **Status:** Draft v0.4, consolidated on 2026-10-25. v7 is under owner review; approval of the sober-board concept does not mean approval of the final design or copy.
- **Inputs:** [references.md](references.md), [rounds.md](rounds.md), [discovery brief](../discovery-brief.md), and the owner's October 23 feedback.
- This revision reconciles Claude's v0.3 principles with the owner's direction incorporated in Codex v6/v7. Earlier decisions and feedback remain in [rounds](rounds.md) and the [decisions log](../decisions-log.md).

## Concept: calm surface, curious depth

The surface gives a recruiter what they need in seconds, with no noise. Beneath it, a quiet personal layer rewards curious visitors. Precise details (one accent, focus and transitions) hold both together. This is the visual form of the brief's two doors, Work and Life.

The projects and the quality of the site demonstrate user-focused engineering and professional fit. Do not turn the introduction into a stack, availability or time-zone checklist. Location can remain in the COL→MAD ticket and CV. Keep the professional thread coherent: care for users, QA-informed judgment, product and frontend architecture, leadership and teaching. Hobbies do not need professional justification.

## Home layout: immersive sober board

The sober-board concept (option B) was approved on 2026-10-22. The following refinements reflect the owner's October 23 direction; v7 is its current implementation proposal.

- **Hierarchy:** identity card first, personal objects second, dock third. On desktop, the board fills the first screen. Work begins below it and is reachable in one click, without competing on arrival.
- **Card:** name, role, one concrete sentence, Get in touch, Download CV, LinkedIn, GitHub, More about me and career path. JOTA is integrated into this card; there is no separate brand header or prototype toolbar. Keep objects outside its protected area when dropped.
- **Desktop curiosity:** teaching/motorbike photos, COL→MAD ticket, portrait, roadmap and pole sport surround the card. Explore my desk has a visible label and opens the navigable desk while retaining the card and all ten objects.
- **Mobile curiosity:** start with the identity card, without the earlier swipeable personal strip. More about me opens the immersive desk. Its identity card stays present; the repeated career list can be omitted there because the full list remains on Home.
- **Exploration:** background dragging pans the board; dragging an object moves it; wheel/trackpad input pans the camera. Offer zoom, overview and recenter. Moving around and overlapping objects are intentional discovery, with keyboard access and distinguishable flip/drag actions.
- **Reading inside the desk:** letter and roadmap open as readable panels over the same board. Back to desk preserves the camera position. Closing exploration restores focus to its launcher.
- **Work:** a clear editorial heading, company labels, larger project names, quieter metadata and a substantial preview. Cases have separate URLs with View Transitions where supported. Work and Projects are both valid dock labels; v7 keeps Work.
- **Notes:** a separate, quieter entrance. The published Home list appears only once three real notes exist; example notes in prototypes are layout references.
- **Navigation:** floating dock with Home, Work, Notes, contact and theme; no Roadmap entry. The roadmap object serves interested visitors. The footer remains the sitemap with Site, Social and Contact columns and a large wordmark.
- Andre informs the hierarchy; Clara informs editorial scale and separation. Objects, accent and JOTA identity remain Jouler's own.

## Principles

1. **Legibility first.** Body text is never below 17px, and reading text gets a 1.7 line height. Text is never white on the accent for selection. If a choice trades legibility for style, legibility wins.
2. **Hierarchy by size and tone.** Color is not used for hierarchy; the accent marks interaction only. Different sections need clear differences in scale, spacing and emphasis.
3. **One accent, used sparingly.** Links, focus, selection, the primary button and small details. Each accent has a vivid fill tone and a darker text tone that passes WCAG AA (4.5:1).
4. **Grayscale with a cool bias, never pure black.** Dark mode uses deep greys, not #000.
5. **Motion that is fast and measured.** Keep transitions short and interruptible. Brief easing on coarse wheel input is allowed by the owner's updated direction; fine trackpad input and dragging stay direct. No bounce or long, imposed scrolling. Scope gesture capture to the desk. Respect reduced motion for easing and View Transitions.
6. **Speed is part of the design.** Use ordinary, shareable page links and View Transitions where supported. Follow ADR 001: vanilla site chrome, React only for interactions that justify it. The ADR requires avoiding unnecessary runtime, not zero JavaScript for every control. Production image loading and performance still need validation when integrating Astro views.
7. **Personality is opt-in.** Curious visitors can explore; professional content remains easy to reach. Preserve a calm first screen rather than exposing every section. Sound remains a possible later detail, off by default with a visible mute if implemented.
8. **Real content only.** No stock images or invented facts; retain `TODO(verify)` until confirmed. Inherited project claims, notes, letter and roadmap examples in the design prototypes are not verified publication content.

## Tokens decided so far

| Token | Value |
| --- | --- |
| Accent | Vivid violet. Fill `#6E44F0`, text `#5A31D9`, dark mode `#A58BFF`, text on fill `#FFFFFF` |
| Typeface | Onest (400/500/600); labels in Geist Mono |
| Neutral | Cool: bg `#F6F7F9`, surface `#FFFFFF`, ink `#141517`, muted `#5F656E`, line `#E1E4E8`. Dark: bg `#131417`, surface `#1C1E22`, ink `#EEF0F3` |
| Original scale baseline | Compact (display 36, title 26, lead 20, body 17, small 14.5, label 11.5). v7 tests a larger editorial Work heading; section-specific hierarchy and physical-device legibility remain under review. The prototype scale toolbar is removed; a visitor scale setting is not part of v7. |
| Selection | Accent text on a soft accent background (Clara style) |
| Proposed hero | “I build products with care for the people using them—and the teams behind them.” Draft for owner review; replaces the earlier unverified project claim in this proposal only. |

## Still pending

- Jouler's physical-phone review of v7, including card readability, desk movement, reading panels and return navigation.
- Final hero, letter, Staff-level goals, original notes and verified case content. Staff remains a growth direction, not an achieved title.
- Comments on notes: cross-post and Discuss on LinkedIn remain proposed, pending the owner's decision.
- Production bilingual Astro implementation, performance and accessibility checks after design approval. Static prototype behavior is not proof of those production requirements.
- Final placement of the JOTA mark in favicon, loader and OG images; any future sound or scale setting.

-------------
