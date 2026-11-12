# ADR 002 — Language switch: route navigation with view transitions

- **Status:** Accepted (2026-11-01)
- **Date:** 2026-11-01
- **Deciders:** Jouler Talaigua (owner), Claude (project lead)

## Context

The site is bilingual: English at `/`, Spanish under `/es/` (ADR 001). Today, changing language is a plain
navigation to the same page in the other route, with no client JavaScript. The owner asked whether the switch
could feel real-time, without a reload, and what that would cost.

## Options

1. **Translate in the browser** — ship both dictionaries and re-render the text on the client. Nearly every text
   component becomes a React island: more JavaScript, a flash before hydration, weaker SEO, and it breaks the ADR 001
   rule of React only where the interaction justifies it.
2. **Both languages in the HTML, toggled with CSS** — almost no JavaScript, but every page doubles its weight, search
   engines see duplicated hidden text, and `lang` has to be managed per block.
3. **Navigate to the other route with a view transition** — keep one page per language and animate the switch.

## Decision

Option 3. The language switch stays a link to the other route (`LanguageSwitch`), and the navigation is animated with
view transitions:

- **Default, zero JavaScript:** cross-document view transitions (`@view-transition { navigation: auto; }`). Browsers
  without support do a normal navigation, so it is progressive enhancement.
- **If persistent elements are needed** (the Dock, or a music player that keeps playing across pages): Astro's
  `<ClientRouter />`, which adds a small router script and `transition:persist`. Decide when that feature exists.

## Consequences

- ➕ Zero JavaScript by default; SEO, `hreflang` and one URL per language stay as they are.
- ➕ The switch feels instant and animated where supported.
- ➖ Not animated in browsers without cross-document view transitions; they get a normal navigation.
- ➖ `<ClientRouter />`, if adopted later, adds a script and changes how page scripts run on navigation.

## Verification

- `ClientRouter.astro` ships with the installed Astro (7.3.5, `node_modules/astro/components`), checked 2026-11-12.
- Cross-document view transitions: Chrome 126, Edge 126, Safari 18.2; Firefox listed as not supported
  ([Chrome docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document), checked
  2026-11-01; the page is undated). Confirm current Firefox status on MDN before implementing.
- The default is live since HU-01 (2026-11-12): `@view-transition { navigation: auto; }` in `src/styles/global.css`,
  under `prefers-reduced-motion: no-preference`. The language switch already crossfades between routes, and the
  identity card morphs into "More about me" (`view-transition-name: profile-card`).
- Pending: a transition designed for the language switch itself, and the decision on `<ClientRouter />` if the Dock
  must persist. It is taken after the board (HU-02) is complete.
