# Design review and history

---------- [Codex] ---------

Consolidated on 2026-10-25 from Claude's design-direction documents and Codex's isolated v6/v7 prototypes. **v7 is the current proposal under Jouler's review**, not a final approved design. The production Astro pages remain the foundation/spike.

## Sources

- [Principles](principles.md): current direction and the earlier baseline.
- [Rounds](rounds.md): proposals, owner feedback and lessons, including v5–v7.
- [Decisions](../decisions-log.md): agreed direction, distinguished from proposed copy and pending validation.
- [References](references.md): the design references and what we take from them.
- [v6 proposal](v6-proposal.md) and [v7 proposal](v7-proposal.md): implementation scope and historical verification evidence.

The repository's HTML is now the review source. Existing Claude artifact links remain as provenance for earlier rounds; do not use an artifact as a competing current version. Exports for rounds 1–4 have not been supplied, so those rounds retain their recorded links rather than reconstructed HTML.

## Local versions

| Version | Repository source | Role | Attribution |
| --- | --- | --- | --- |
| v5 | [Original HTML](../../public/design/v5/index.html) | Owner-supplied baseline; exact export, filename said v4 but page labels itself v5 | Claude / owner |
| v6 | [HTML](../../public/design/v6/index.html) | First proposal: integrated JOTA signature, retained identity card in exploration, dedicated case URLs | Codex, derived from v5 and owner feedback |
| v7 | [HTML](../../public/design/v7/index.html) | Current: immersive Home, card-first mobile, pannable desk and stronger Work hierarchy | Codex, derived from v6 and owner feedback |

The complete HTML, CSS, JavaScript and required local assets are included. No attribution labels were added to the visitor-facing design or the frozen HTML. This document marks the imported bundle as a whole. Shared source photographs live in `public/design/assets/`; v7 also owns its Bancolombia preview asset.

## Review locally

From the repository root:

```sh
python3 -m http.server 4326 --bind 0.0.0.0 --directory public
```

Use another port if 4326 is already occupied by the existing review server.

- History: [http://127.0.0.1:4326/design/](http://127.0.0.1:4326/design/)
- Current proposal: [http://127.0.0.1:4326/design/v7/](http://127.0.0.1:4326/design/v7/)
- On a phone on the same Wi-Fi, replace `127.0.0.1` with the Mac's current LAN address. On this Mac, `ipconfig getifaddr en0` reports the Wi-Fi address. Keep the terminal open and the Mac awake; Ctrl+C stops the server.

These prototypes can also be served from Astro's `public/` directory, but do not implement the final bilingual Astro views. Sample cases, notes, dates and roadmap milestones remain provisional; preserve `TODO(verify)` and obtain owner-authored content before publication.

## Preservation and scope

Run `node scripts/verify-design-history.mjs` to check the original/v6 hashes and the imported v7 snapshot. Compare versions by opening their separate URLs; keep earlier versions intact when making a new design iteration.

Only the design prototypes, their assets, proposal records, history checker and necessary documentation were imported. GoodRx output, unrelated dependency/lockfile changes and agent configuration were excluded. No commit, push or deployment is part of this integration.

Formatting and linting exclude `public/design/` so repository-wide maintenance does not rewrite frozen prototypes or treat imported browser scripts as production source. The history checker remains outside that exclusion.

## Integration verification · 2026-10-25

- 25 recorded hashes match: original v5, v6, shared source images and the imported v7 snapshot.
- Every imported prototype file is byte-identical to the isolated source checkout.
- JavaScript syntax checks pass for v6 `app.js`, v7 `app.js` / `canvas.js`, the history checker and the ESLint configuration. `git diff --check` passes.
- 19 HTML routes and directly referenced local resources resolve and return HTTP 200 from a temporary server rooted in this checkout; the server was closed afterwards.
- GoodRx output and dependency files retain their pre-integration state. The already-deleted `package-lock.json` was not restored or included in this work. The isolated source checkout was not changed.
- `npm run lint` could not execute because the local ESLint executable is absent. No packages were installed; full lint/build/CI validation is not claimed.

The October 23 browser checks in the proposal records are historical evidence. The integration checks above do not replace Jouler's physical-phone review.

-------------
