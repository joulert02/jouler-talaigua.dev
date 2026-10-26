# Portfolio v8 — direct board exploration

> **Location update · 2026-10-26:** the prototypes moved from `public/design/` to `docs/design/` so they never ship with the production site. Paths and commands below use the new location.

**Date:** 2026-10-25. **Status:** interaction changes tested and accepted by Jouler; final copy and production integration pending. **Branch:** claude/design-direction.

## Scope

v8 derives from v7 and preserves the earlier prototype sources. This version tests board navigation and mobile exploration. The nine project-content drafts remain under review and were not inserted into the prototype. Existing case/note copy remains provisional.

## Desktop experiment

Jouler chose to test direct exploration from Home with scroll captured inside the board. His rationale is easier laptop/trackpad exploration with Work remaining a visible route to projects. This is a hypothesis to evaluate, not a verified claim about recruiter behavior.

- Home contains the complete ten-object world; there is no desktop fullscreen entry or modal.
- Wheel/trackpad input pans the world. Background and non-interactive card surfaces can also initiate pointer panning. Object dragging moves the selected object.
- The dock remains available. Work releases the board's page-scroll lock and moves to the project section. Direct /design/v8/#work links also enter this normal scrolling context.
- Projects, notes, reading pages and case routes retain page scrolling. Returning through Home recenters and locks the board again; scrolling back to the page's top also re-enters board exploration.
- Recenter and See all offer recovery and overview. At overview scale, an object can be selected to zoom to it before activating it.
- The trade-off remains deliberate: ordinary scrolling from the initial Home explores the board instead of revealing projects. Jouler tested the prototype and accepted these interaction changes on 2026-10-25; this does not establish broader recruiter usability.

## Mobile exploration

- Home retains its full identity card.
- More about me opens the existing modal world, with an animated transition to a card containing JOTA, name and role. Description, CTAs, links and career are omitted inside exploration.
- Dragging from that compact card pans the world. It does not reposition the identity card independently.
- The internal header strip is removed. Close floats outside the moving world and stays accessible.
- Nearby photos appear above the compact card; the ticket and letter are placed below it. The initial frame and object positions are recomposed, rather than only shortening the old card.
- The camera toolbar is compact on mobile: Recenter and See all. Keyboard zoom and desktop zoom remain available.
- Letter and roadmap remain reading panels over the scene, with Back to desk preserving the camera. Close returns focus to More about me.
- Entrance motion respects reduced-motion preference and can be interrupted by starting an interaction.

## Implementation

Static HTML/CSS/JavaScript under docs/design/v8; no package installation or production Astro-route changes.

- experience.js owns one shared world/camera, responsive mounting, object interaction, reading panels and the desktop page-scroll boundary.
- canvas.js retains camera and page-wheel behavior. Input gating prevents the camera and the scrolling page from consuming the same wheel action.
- app.js retains inherited data/content and routes navigation into the appropriate board/page context.
- Version-specific storage separates v8 settings and object positions from v7.
- Browser DOM references checked on 2026-10-25: [wheel events](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event), [pointer capture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture), and [Element.animate](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate).

## Review

An existing v7 server on 4326 was left running. v8 is served from the main repository checkout on 4327:

- Current experiment: [http://127.0.0.1:4327/design/v8/](http://127.0.0.1:4327/design/v8/).
- Comparison: [v7 on the same server](http://127.0.0.1:4327/design/v7/).
- History: [all versions](http://127.0.0.1:4327/design/).

To serve this checkout again, run the Python static-server command in the history guide with port 4327. On a phone, substitute the Mac's current LAN address for 127.0.0.1.

## Verification

- JavaScript syntax checks pass for app.js, canvas.js and experience.js.
- Desktop pointer panning and horizontal/vertical wheel input move the camera while page scroll remains at zero.
- Work unlocks page scrolling and navigates to projects. Normal scrolling continues to Notes. Home restores the initial frame and board mode.
- A dedicated Favorites case opens and browser Back returns to the project context with page scrolling unlocked.
- Desktop roadmap opens without a modal; wheel input scrolls its reading panel, and Escape returns to the desk.
- Mobile layouts reviewed at 390 × 844 and 320 × 568 with no horizontal page overflow. Exploration shows only the identity card's signature/name/role; Close remains a 44-pixel-high target.
- Mobile card dragging pans the camera without scrolling the underlying page. Object dragging does not activate the object and settles outside the protected card.
- Letter and roadmap panel returns preserve the camera. Overview allows reaching objects by taps. Close restores the original card and focuses More about me.
- A resize-related entrance-centering issue and a desktop browser-restoration offset were corrected during verification.
- 13 local v8/history routes and directly referenced resources return HTTP 200. The server also responds through the Mac's current LAN address.
- The integrity checker confirms all 36 recorded source/image hashes across the original, v6, v7 and v8 snapshots. Earlier prototype sources and production sources match the pre-v8 baseline. Concurrent edits to the separate project-content drafts were retained.

The checks above used browser pointer/layout input. Jouler subsequently reported testing the prototype, approved the interaction changes and requested a commit on 2026-10-25; no formal usability study is claimed. Native reduced-motion branches were reviewed in source; operating-system preferences were not changed for testing. The owner authorized a local commit after review. No push, public deployment or production-content update is included.
