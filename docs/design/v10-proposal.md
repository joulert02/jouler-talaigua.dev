# Portfolio v10 — case page from the owner's review

**Date:** 2026-10-26. **Status:** built by Claude for Jouler's review; code review by Codex pending. **Branch:** claude/design-direction.

## Owner feedback on v9

1. **Back control is hard to find.** "← All work" sat top right in low-contrast small text, while the reader enters from a row in the middle-left of the Work list. References (andregs.com, Moritz Petersen's site) keep back close to the entry point and in line with navigation.
2. **Too much text.** Readers should understand faster with less effort and more interaction. Unneeded elements: the JOTA mark, the mono focus line under the headline and the inline contents list.
3. **Screenshots look cheap.** Recreate the components and the experience instead, and add a "See it live" button below the examples that opens Mercado Libre.
4. **A Spanish version**, so Jouler can judge how the case reads in his native language.

## Scope

v10 derives from v9 and leaves every earlier version unchanged. Only the Mercado Libre case is redesigned; Home, the Work list and the other cases are v9 with paths moved to `/design/v10/` and the new back control.

- **Back control:** a sticky pill at top left (circle chevron, "All work", "Selected projects"), full ink contrast, 48 px tall, in the column where the reader's eye lands after the title transition. Hairline appears under it once the page scrolls. It still returns to the same row in the Work list, focused. The JOTA mark is removed from case pages (Home stays one tap away in the dock). An EN · ES switch sits top right.
- **Header:** title and a "See it live" button, then role, period and stack as one horizontal strip directly under the title. The headline ("Lists people come back to…"), the focus line and the contents list are gone (owner, second pass: the headline read as filler). The two intro paragraphs become one summary.
- **Every chapter:** number, title, one lead sentence, the interactive piece, and **"The full story"** (a disclosure holding the approved paragraphs unchanged). Skimmers get the point from the lead and the interaction; nothing approved was deleted.
- **01 Lists:** a faithful, working recreation of the shipped screens, rebuilt from the owner's captures (second pass: the first, generic recreation "looked nice but was not what I built"). Yellow search bar (no logo, no account name or address), breadcrumb, Favorites title and Create list, tabs My favorites / Lists (N), product rows (photo, title, struck price, % OFF, installments, Free shipping FULL, Add to list · Delete), list cards (cover, name, "List of products", count, ⋮ menu with Edit name / Delete list), list detail (Back to Lists, count, Edit name, rows with Delete, a paused listing) and the Add to list dialog (Create new list, My favorites as default, every list with its thumbnail, Confirm, Go to my lists). Everything works on local state: add/remove from lists, create, rename inline, delete, remove items. Before shows the legacy page: one flat list with checkboxes, Delete selected favorites and Delete per row. Desktop / Mobile shows the dialog or the bottom sheet (phones always get the bottom sheet). "Show me" adds the camera to Tecnología and opens that list. Below: "See it live on Mercado Libre" and, on demand, the original screenshots.
- **02 Tests:** a coverage card that fills from ~60% to 80%+ when it scrolls into view, the Playwright vs WebDriverIO proof of concept as a two-option pick, and the illustrative Gherkin scenario with **Run scenario** (each step ticks, then "1 scenario passed").
- **03 Navigation:** the v9 simulation, with shorter hints.
- **04 What I learned:** quote and architecture flow; the two paragraphs move into the disclosure.
- **Spanish:** `/design/v10/es/work/mercado-libre-lists/`, full translation including the simulations (`case.js` picks strings by `<html lang>`). Home and the other cases remain English, so back and the dock land on the English Work list.

## Copy that needs Jouler's approval

New wording derived only from approved facts; no new claims. Approve, edit or reject:

- **Summary:** "One of two senior engineers in the squad that built lists on the Home & Search team. I replaced the old favorites with lists people organize, and fixed two problems the team had lived with: tests nobody trusted and navigation that lost people inside the app."
- **Leads:** 01 "Favorites used to be one heart and one flat list. Now people save products to lists they name: for themselves, or as a gift for someone else." · 02 "Unit coverage went from about 60% to over 80%, and stopped there on purpose. Then came end-to-end tests for the flows that matter most." · 03 "Inside the app, going back sent people to the top of the list, and infinite scroll stopped loading. I rebuilt navigation as a stack, the way native apps work."
- **Facts strip:** "Period: Oct 2023 – May 2025"; stack shortened to "React · Node.js (BFF, SSR) · WebDriverIO + BDD · Datadog, New Relic"; "Home & Search" moved out of Role into the summary.
- **Recreation data:** list names (Moto, Tenis, cafe, Tecnología, Ropa, Cocina) and five products (camera, grey dry bag, two inflators, black dry bag) with their titles and prices come from the owner's 2026-10-26 captures. The other five product titles and all their prices are sample data; counts follow what is rendered (Moto shows 4, not 8). The English page translates the interface and keeps product titles in Spanish.
- **No gift-list UI:** no capture shows how a gift list is created, so the recreation does not invent one. A capture of that flow would let us add it.
- **Spanish:** the whole translation is a draft, including the title "Listas de favoritos y regalos".

## Implementation

Static HTML/CSS/JavaScript under `docs/design/v10/`; no packages, no production Astro changes.

- Copied from v9 with paths and storage keys moved to v10 (`jota-v10*`): `index.html`, `app.js`, `canvas.js`, `experience.js`, `styles.css`, assets, stub cases (back control replaced).
- `case.css`, `case.js`: rewritten. `case.js` holds an EN/ES string table, the lists recreation (sheet with focus trap, Escape, inert background, focus return to the heart), the coverage animation, the scenario runner and the v9 navigation simulation.
- `work/mercado-libre-lists/index.html` and `es/work/mercado-libre-lists/index.html`: the case. The recreation is rendered by `case.js` from one state object (works in both languages); without JavaScript a note points to the screenshots.
- `assets/meli-ui/`: 11 JPEG crops of product photos only, taken from the owner's captures (no header, name or address). They are third-party seller photos: fine for this local prototype, but **replace or clear them before publishing**.
- The Mercado Libre logo is deliberately left out of the recreated header.
- **See it live** points to `https://myaccount.mercadolibre.com.co/bookmarks/list` (HTTP 200 on 2026-10-26; `/favoritos` and `/listas` on the main site returned 404). It requires sign-in, as the note says. Confirm the URL and the country site you want.

## Review pass · 2026-10-27

Applied in v10 by the owner's request after an independent UX/UI/copy review (`.orca-handoff/2026-10-27-v10-ux-review/result.md`, git-ignored). The accessibility of the recreated third-party product screens is deliberately not audited: they are not our product.

- **Case header (owner revision, same day):** labeled Role/Period/Stack strip (with Datadog and New Relic), no summary paragraph, a tighter gap into chapter 01, and the longer original chapter lead. The ghost "See it live" button is back in the header with a visible "Sign-in required" note; it is the only live link (the footer duplicate is gone, as in Bancolombia). English and Spanish share this layout.
- **Example layout (owner revision, same day):** the three examples share one pattern: mono uppercase label top left ("… · not Mercado Libre code"), controls top right (Before/After, Desktop/Mobile, Reset), hint bottom left and the purple primary action bottom right (01 **Play**, 02 **Run scenario**, 03 **Play**). 01 gets Play again: the scripted path (add the camera to a list, open that list), now as an explicit action. "Original screenshots" and the lightbox are removed. "Sign-in required" sits above the header button; in 02 the check column and the Run button share the same right edge. "What I learned" is now the unnumbered intro under the facts strip.
- **Coverage (02):** three tones, light = remaining, mid = planned 60–80%, dark = covered. It fills when the scenario passes, as a symbol (the owner's decision: Gherkin applies to any test level, not only end-to-end).
- **Example 03 and mobile mode of 01 (native iPhone look):** both are drawn inside an iPhone frame (Dynamic Island, status bar, home indicator, 402×874 pt scaled with `zoom`) from the owner's `mobile-listas` captures: yellow header with back arrow, My favorites / Lists tabs, product rows, list rows with the 2×2 thumbnail collage and +N, kebab menu, floating "Create list" button that collapses to "+" on scroll, list detail with pencil menu and the empty state, bottom sheets (Add to list, Create product list, Edit list with 0/25 counter and Confirm disabled until the name changes), green toast and bottom tab bar. In 03, going back in Before shows the loading spinner and the list restarts from the top. The row number and the "12 of 48" chip are annotations, not app UI. Not reproduced: pull-to-refresh, the add-to-list loading state, the iOS keyboard, and the legacy mobile screen (no capture).
- **Home:** Work list without 01–05 numbers, "01 / Work" and the prototype note; "02 / Notes" is now "Notes".
- **Board hand-off:** no new element. When the wheel is pushed past the bottom, the existing hint becomes "Keep scrolling for Work ↓" with a fill, then releases into Work after about three mouse notches. Only a gesture that starts at the bottom counts, so trackpad inertia cannot trigger it. Desktop only; reduced motion drops the fill transition.
- **Fixes:** disclosure icon mojibake (raw non-ASCII in `case.css` `content:` replaced by CSS escapes, `@charset "UTF-8"` added); language switch raised to 44 px; chapter leads use `text-wrap: balance`.
- **Not applied:** scroll-driven loading of the yellow header (rejected: reads as a broken page); language switch into the dock (deferred until Home is translated); tooltip for the sign-in note (visible text instead).
- **Verified:** Playwright at 1440 and 390 px on the local server: no console errors, no horizontal overflow, Run scenario fills the bar and the number to 80%+, the board hand-off shows the hint and releases into `#work`, Spanish page parity. **Not verified:** Safari, Firefox, real trackpad momentum (simulated wheel events only), screen readers, dark theme, keyboard access to the hand-off (Work stays reachable from the dock).

- **Closing touches:** the header actions are vertically centered with the title block, and the Run bar sits at the bottom of the scenario card (flex column, the steps list grows). **Owner closed the Mercado Libre design on 2026-10-27**; visual fidelity of each example is refined when the production components are built. The other four cases still follow the v9 pattern.

- **Intro proposal B (DISCARDED by the owner, 2026-10-27; files kept for history):** a second intro at `/design/v10/work/mercado-libre-lists/intro-b/` (English only, for comparison): the owner's two-paragraph description next to the team photo (`equipo2.jpeg`, resized to `assets/meli-team.jpg`) in a violet frame; `?frame=yellow` previews the yellow frame. "What I learned" moves to the end as chapter 04. The photo shows colleagues and event branding: **publication permission is still pending** (see `docs/content/projects/assets.md`). Spanish version pending approval of the English copy.

- **Intro proposal C (design-agent refinement of B):** `/design/v10/work/mercado-libre-lists/intro-c/` with `?v=1` (neutral mat, recommended) and `?v=2` (yellow plate behind the photo), styled by `intro-c.css`; no existing file changed. The violet frame was dropped: a thick saturated border reads as a control and competes with the photo's own colors. Same owner text; both paragraphs at the same ink, square crop that keeps all five people.

- **Intro C, mixed (owner request):** the "What I learned" title, the role copy lightly refactored (one sentence reordered), the "What I learned" quote moved into the intro, and a closing invitation ("Here is a closer look at some of what we built…" with a "See what we built" link to chapter 01). Text and photo are vertically centered. The old closing chapter keeps the flow cards and "The full story" under a visually hidden heading. The invitation sentence is new copy and needs approval.

- **Intro C, alternative version (owner approved as the alternative intro, to be chosen in testing; Mercado Libre design closed 2026-10-27):** `intro-c/` stays as the alternative to the main case page. It keeps only the second paragraph and the quote, drops the floating dock on this page, and replaces the invitation sentence with a floating "See what we built" button: fixed at the bottom center, bounces gently (not with reduced motion), fades out smoothly and becomes unfocusable once the reader scrolls down, returns at the top, and scrolls smoothly to chapter 01. The main page `mercado-libre-lists/` is unchanged.

## Verification · 2026-10-26

In the Claude browser pane (Chromium) on the local static server:

- Second pass, Playwright (Chromium) at 1440 and 390 px: Add to list opens with focus on Create new list and My favorites checked; a list created inside the dialog arrives checked; Go to my lists shows it first with 1 product. ⋮ → Edit name renames inline and returns focus to the card; the list detail shows 4 products including the paused listing. Before: selecting two rows enables Delete selected favorites, which removes them. "Show me" ends with Tecnología at 2 products. At 390 px the dialog is a bottom sheet and the page has no horizontal overflow. No console errors other than the missing `/favicon.svg` on the static server.
- First pass, 1440 px: the earlier generic recreation, Run scenario and the navigation simulation. Run scenario ends on "1 scenario passed · 4 steps". The navigation Play ends on item 1 (Before) and item 14 (After).
- 390 px: no horizontal overflow; the recreation switches to the bottom sheet; header, back pill and facts strip stack.
- Spanish page: same flows, every dynamic string in Spanish; back pill returns to `/design/v10/#work-mercado-libre-lists`.
- No console errors.
- Not verified: Safari, Firefox, real phones, screen readers, the dark theme in the recreation, and a new independent UX review.

## Open for Jouler

- Approve or edit the new wording above and the Spanish draft.
- Product photos in `assets/meli-ui/` come from sellers' listings: keep only for review, or supply neutral product images.
- A capture of the gift-list creation flow, if you want it in the recreation.
- Confirm the live URL (and whether to link the Colombian site).
- If v10 is approved, apply the same pattern (lead, interaction, full story on demand) to the other four cases and translate Home.

## Pragma pass · 2026-10-27

- Removed the three-box career path under the summary: the Role fact and the summary already tell it, and boxes with arrows duplicated the Petys pipeline. The pipeline is now a dot-and-line rail (vertical on phones), so it no longer looks like the other diagram.
- Chapter heads are wider (heading 920 px, lead 74ch). This also applies to Mercado Libre; revert in `.chapter-head` if unwanted.
- Petys is a Desktop/Mobile playground like Mercado Libre: screenshots of the live site in a browser or phone frame, a "Publish a change" rail below, and the live link in the footer (right). TENA's live link moved to its footer too; the separate CTA rows are gone.
- TENA registration hero re-cropped to the photo only (it showed the original form behind the recreation).
- PRAGMA reel in "What I learned": click-to-load facade, nothing is requested from Instagram until play; embed URL verified to render. Wording of the label is tentative (the reel's content was not described by the owner).
- Independent UX review: `.orca-handoff/2026-10-27-pragma-ux-review/result.md`. Not applied yet: Nosotras lab footer (hint left, credit link right) and dropping its placeholder note.

## Pragma pass 2 · 2026-10-28 (closed with v10)

- Superseded from the pass above: the career path is back (three steps, Mercado Libre `.flow` style) under the quote; the Instagram facade is gone.
- Header follows Mercado Libre: label, title, facts, then "What I learned" first, unnumbered. All earlier intro options for Pragma (A, B, the blurred-stage cover, the portrait card) were rejected and deleted.
- Video: `intro-b/` (EN and ES) is a test variant that copies Mercado Libre's `intro-c` structure with the PRAGMA reel in place of the photo (3:4 plate, blurred poster at the sides, native fullscreen stays portrait, floating "See what we built" invitation). The main page has no video. The video files stay in `assets/` (`pragma-reel.mp4` HEVC 63 MB, `pragma-reel-540.mp4` H.264 17 MB, poster). Open: keep or drop; captions, transcript, compression (target 8 MB or less) and PRAGMA's OK to self-host only if it stays.
- Petys playground: device switch, full capture, six-step rail with visible explanations, then the foot. System rule (approved): the violet primary button is only the action that runs the demo and is always rightmost; links that leave the site are ghost, to its left. Applied to Petys, TENA and Nosotras.
- Nosotras: rebuilt from the exported design files (`nosotras.css/js`, `assets/nosotras/`), iPhone frame shared with Mercado Libre, characters rotate and the world colours change. Gaps: Montserrat instead of Gotham, approximate recolouring, phone worlds inferred.
- The floating dock is removed from every case page (the footer keeps contact and copy-email; Home keeps the theme switch).
- Removed the old Nosotras screenshot remnants. Reviews: `.orca-handoff/2026-10-28-pragma-intro-petys/` (a Codex review of screenshots found: oversized cover blur, missing captions, step text not exposed; first two addressed or deferred).
- Translations are provisional; the owner reviews them before production.

### Decision · 2026-10-28 (owner)

- **Primary intro** for Mercado Libre and Pragma: "What I learned" with the media on the right (photo for Mercado Libre, the PRAGMA video for Pragma), text and quote left, floating "See what we built" invitation. Promoted to the main pages (EN and ES); the old `intro-c/` (ML) and `intro-b/` (Pragma) folders were folded into them.
- **Secondary, kept tentative**: the plain "What I learned" chapter (quote and flow, no media) lives at `learned/` beside each case. The owner picks between them while building the real pages.
- ML Spanish intro paragraph is a provisional translation.
- **Video, pending for development (not for this design)**: optimize (H.264, target 8 MB or less, faststart); the video is spoken in Spanish, so provide subtitles per page language (ES and EN, `<track>` VTT) and a transcript; if visual subtitles must be burned into the English version, decide when building the intro. PRAGMA's OK to self-host is the owner's call.
