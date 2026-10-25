# Design references

- **Status:** Final for v1 of the site · **Date:** 2026-10-22
- **Source:** the owner reviewed 64 portfolios across 13 styles in the [Portfolio Atlas](https://claude.ai/artifact/PQFMRwSmuLNtXdpxyfKZY6). Verdicts and notes are stored in the atlas; this file keeps what we take from them and why.

## Primary references

### Moritz Petersen: structure and transitions

<https://moritzpetersen.com>

- **Hierarchy by size and tone, not color.** The name is dark and large, the role is the same size in grey, and "More" is quieter still. Social links and the theme toggle never compete.
- **Two columns on desktop, one on mobile.** The selected project is shown as a large preview.
- **Grayscale palette** with no visual overload, so it is pleasant to read.
- **Motion:** list hovers with a well-tuned ease and delay that never feel slow. Clean View Transitions between pages, e.g. clicking the desk preview.
- **"More" disclosure** with a short intro and a photo.
- Owner's verdict: "si tuviera un sitio, quisiera uno así."

### Andre Souza: a personal layer for the curious

<https://www.andregs.com>

- **Recruiter-first hierarchy.** The first read is name, role, description, social links and past roles, inside a spacious white card at the centre of a board. Education is a secondary card and the menu comes third.
- **Personal objects around the card:** photos, records, books, a drawing canvas. They stay in the background for most visitors and reward the curious without crowding.
- **Speed as craft.** Pages are prefetched, so the animated menu never feels slow.
- **Sound** on navigation, with a mute option.
- **Palette:** white, a light blue and off-black, which reads clean, like Vercel or ChatGPT components.
- The owner's favorite overall.

### Clara Fois: one accent, focus details

<https://clarafois.com>

- **A single vivid accent (red) on a calm base.** Hovered or selected text turns red on a soft pink background.
- **Project grid with focus:** the hovered item stays sharp while the others fade to grey.
- **Mixed grids by purpose:** large statement type, a symmetric image grid, an asymmetric bento for projects.
- Gentle smooth scroll that adds rather than slows; a loading state drawn in her own style; a minimal, well-structured footer.

## Secondary references (one idea each)

| Site                          | What we take                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------- |
| Lee Robinson                  | Hover on a company name swaps to its logo. Short and long versions of the bio.  |
| Brian Lovin                   | Pages that open the person up: stack, listening, ask me anything, TIL.          |
| Paco Coursey                  | Projects, craft and writing are identifiable on arrival.                        |
| Rauno Freiberg                | A lively but professional accent (orange); bleeding-edge cleanliness in motion. |
| Josh W. Comeau                | Small games and interactive settings; hover sounds.                             |
| Tania Rascia                  | Theme and accent pickers as personality; a balanced About page.                 |
| Chris Pokrzywa                | Curiosity rewarded: a small game that unlocks something personal.               |
| Aristide Benoist              | Animations that never break when you navigate back and forth quickly.           |
| Brittany Chiang, Tim Gesemann | A time machine of past versions; a career timeline.                             |

## Anti-references (what the owner rejected and why)

- **Pure black backgrounds:** "muy invasivo" (Brian Lovin).
- **Purple with gradients, neon or colored shadows:** reads cheap and generic (Sindre Sorhus).
- **Low-contrast grey on grey:** "muy triste" (Jakub Krehel, Maggie Appleton).
- **Heavy bold and mono-heavy type; hover that flips to solid color with white text:** hard on the eyes (Jhey Tompkins).
- **Slow smooth scroll on lists, bouncy scroll, one page per section that loads slowly** (Olivier Larose, Thibault Guignand, Lynn Fisher).
- **Sites a recruiter would not understand** (Lochie Axon), and **template looks** (Matt Farley, Tamal Sen, Sam Selikoff).
- **Heavy 3D/WebGL, OS and terminal metaphors:** well built, but not his style.
