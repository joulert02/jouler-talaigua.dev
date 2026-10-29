# jouler-talaigua.dev · repository instructions

Shared technical base, extendable by the owner. Read `README.md`, `docs/discovery-brief.md` and `docs/adr/001-stack.md` before working.

- The accepted stack is Astro with strict TypeScript, MDX and content collections. Check `package.json` for current versions and commands. Do not replace it with an old roadmap proposal.
- English at the root and Spanish under `/es/`. Respect both versions and the separation between views, routes, content and translations.
- Site chrome in vanilla; React only when the interaction justifies it, per the ADR. Check the configuration and the more specific instructions of the directory you are about to change.
- The current product is a foundation/spike with pending content. Do not present a planned sitemap, a draft or the historical spike results as current publication or validation.
- Do not invent facts, metrics, permissions or personal data. Keep `TODO(verify)` until the content is confirmed. The strict placeholder script check blocks publications that contain those markers; also review placeholders without a marker.
- Use the `package.json` scripts that fit the change. Do not run `format` over the whole repo during a memory review, and do not install dependencies or alter the product for a pending task that was not requested.
- Review and keep local changes. Run code, test and Git commands from this repo. Trunk-based workflow: `main` is the trunk and work happens on short-lived `feature/*` and `fix/*` branches (never named after an agent), with semantic commits and a `Co-Authored-By` trailer for the agent that executes. Tasks for this project live in the GitHub Project. Do not merge, commit, push, deploy, purchase or publish without authorization.
- Keep personal context out of shared documentation. Additional technical rules are completed progressively.
