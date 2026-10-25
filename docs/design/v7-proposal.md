# Portfolio v7 · immersive exploration

---------- [Codex] ---------

Integration note · 2026-10-25: this proposal and its HTML, styles, scripts and assets are now included in the main repository checkout alongside Claude’s design documents. The isolation statements below describe the original October 23 implementation session. v7 is the current proposal under owner review; v5 and v6 remain historical comparisons. This import does not approve the design, verify sample content, or integrate it into the production Astro pages.

-------------

Date: 2026-10-23. Status: local design proposal for owner review.

## Isolation and history

- The original checkout remains on `claude/design-direction`; no files there were changed.
- Work remains in the separate managed checkout on `codex/portfolio-v6-proposal`.
- v7 is additive under `public/design/v7/`. v6 is preserved unchanged under `public/design/v6/`; v5 retains the original supplied export.
- Review history at `/design/`, v7 at `/design/v7/`, and v6 at `/design/v6/` on local port 4326.
- `docs/design/history/v6.json` records SHA-256 hashes of the eight v6 source files, original export, and shared source images. Run `node scripts/verify-design-history.mjs` from this checkout to detect changes.
- Reverting the design for review requires opening the earlier URL; it does not require resetting Git or overwriting files. No commit, push, deployment or publication is authorized or performed.

## Owner direction incorporated

- Keep the initial focus on the identity card, then personal objects, then the dock. Do not show the start of Work in the first desktop screen.
- Keep Work as the menu label; Work and Projects are both understood.
- Mobile starts with the main card, without the personal strip. More about me opens the full personal desk instead of the letter page.
- Desktop keeps the immersive board and a separate Explore my desk action.
- The expanded desk retains its identity card and all ten objects. On mobile only, its repeated career list is omitted inside the desk to give personal exploration more room; the complete career list remains in Home.
- Letter and roadmap are readable panels over the desk, with Back to desk preserving the camera position.
- Background dragging pans the camera; dragging an object moves that object. Scroll/trackpad pan the desk, with buttons for zoom, recenter and overview. In overview, tapping a photo first zooms it to a readable size before a second tap flips it.
- Coarse mouse-wheel steps receive short easing; fine trackpad steps retain native page scrolling. Dragging has no lag, and reduced-motion preferences disable easing and view transitions.
- Work uses a large section heading, company labels, larger project titles, shorter row descriptions and a larger image preview. Notes uses a separate, quieter editorial entry.
- No new biography, results or article claims were written. Inherited copy remains provisional. Existing public Bancolombia device artwork is reused as version-local preview material.

## Implementation

Static HTML/CSS/JavaScript prototype inside Astro's `public/` directory. No new package or framework, no changes to production Astro routes or content. `canvas.js` owns camera and wheel behavior; `app.js` retains the inherited prototype content, objects, routing and personal panels.

Camera translation and object movement are independent. Object drag deltas account for zoom; drops retain the protected identity-card zone. Version-specific storage isolates v7 preferences and positions from v6.

Local server:

```sh
python3 -m http.server 4326 --bind 127.0.0.1 --directory public
```

## Verification

See the completion evidence added after the browser review. Physical mobile touch hardware is not available in this session; mobile layouts and pointer paths are verified in browser viewport emulation.

DOM interaction references checked on 2026-10-23: [MDN wheel event](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event) and [MDN Pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events). The implementation scopes gesture capture to the canvas; normal document navigation and keyboard access remain available.


## Completion evidence · 2026-10-23

- Node syntax checks pass for both v7 JavaScript modules; all local HTML asset references resolve.
- Local history, original versions, v7 resources and all five case routes return HTTP 200.
- `node scripts/verify-design-history.mjs` confirms all 15 frozen v6/original file hashes match.
- Desktop introduction fills its initial viewport; Work is reached from the dock. Its heading measures 68 px at the reviewed desktop width and is distinct from project names and Notes.
- Mobile Home checked at 320 and 390 px; no horizontal page overflow. Initial personal objects are hidden, and More about me routes to `#explore`.
- Expanded mobile desk retains the identity card and all ten objects. No duplicate element IDs were found.
- Background pointer drag and wheel scroll move the camera without moving the underlying page. Zoom, overview and recenter controls work.
- Letter and roadmap open as reading panels over the same desk; Back to desk preserves the camera position. The camera is inert while reading.
- Pointer object movement checked at 76% zoom: drop settles outside the identity card and does not flip the object. Keyboard M / arrows / Enter also exercised.
- Closing the mobile desk returns focus to More about me; browser Back closes exploration.
- Favorites/Bancolombia case navigation and separate URLs retained. Case dock links use regular URLs back to this version.
- Mobile and desktop object positions use separate v7 storage keys. v6 preferences and positions are untouched.
- Original checkout branch and untracked-file status remain unchanged. No commit, push, deployment or publication performed.
