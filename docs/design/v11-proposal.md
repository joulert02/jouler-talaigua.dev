# v11 · Home board adjustments

Working copy of the sealed v10 (`v11/`, hashes in `history/v11.json`). **Sealed 2026-10-28** by the owner; further changes go into a new version.

## Changes · 2026-10-28

- **One dot grid.** The board and the desk viewport each drew a grid, so dots looked doubled (one fixed, one moving). The board's own grid is gone on desktop; only the viewport's grid, which moves with the camera, remains.
- **No zoom.** Zoom, Recenter and See all are removed (buttons, ctrl/pinch wheel, `+`/`-` keys, `fit()`). The visitor walks the board a little at a time instead of zooming out to see everything. Keyboard access stays: Tab moves between objects and brings each into view; `0`/Home recenters.
- **Hint pill.** "Drag to explore" (scrolling still works; the copy leads with the drag and leaves two-finger scrolling as a discovery) is a pill with a move icon, centred above the dock, with a short bounce (reduced motion: static).
- **Hand-off to Work (drag only).** Reaching the bottom edge by any means arms the pill ("Keep dragging for Work ↓"). Only a held drag fills it (2.6 s, then Work opens); releasing the pointer cancels. Wheel and trackpad scrolling never open Work, so a visitor can rest on the edges freely (this also fixes the accidental drop into Work). Browsers expose no "fingers lifted" event for the wheel, which is why only a pointer that can be released drives the fill. Work stays reachable from the dock.
- **No notes on the home.** The "Written along the way" section is removed from the Home; Notes stay reachable from the dock and the footer.
- **One back control.** Notes index and note pages use the same `.back-pill` as the case pages (chevron disc, label, small caption: "Home · Portfolio" on the index, "All notes · Written along the way" on a note). The rules moved from `case.css` to `styles.css` so both share one definition; the old `.pill-back` and "← Home" link on Notes are gone. Roadmap and Letter still use the text "← Home" link.

## Verification

Chromium 1440×900: no camera controls, board background `none`, single grid, pill above the dock; 3 s of wheel at the bottom arms the pill but never opens Work; a held drag fills it (0.42 at 0.8 s), release resets it, and holding 3 s reaches `#work`. Not checked: mobile dialog, 901–1199 px, Safari/Firefox, a real touch screen.
