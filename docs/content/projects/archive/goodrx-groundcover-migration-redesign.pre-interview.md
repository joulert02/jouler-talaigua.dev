# GoodRx — Datadog to groundcover

**Content status:** tentative, for owner review · 2026-10-25. **Page format:** engineering case, led by migration work. **Proposed route:** /work/goodrx-observability/ (not implemented here).

## Evidence and boundaries

- Jouler identifies GoodRx as the project and explicitly wants the Datadog-to-groundcover migration to lead the story. He clarified that the redesign covered a few cards: mention it briefly with one reference image. [S01](../sources.md#s01)
- LinkedIn's EPAM entry reports independent work during the initial migration phase, in a transversal architecture/enablement team. It also reports shared design-system work and performance/observability/maintainability initiatives. It does not document the migration's completion, dashboards, alert coverage, instrumentation strategy or measured savings. [S02](../sources.md#s02)
- The GoodRx client association comes from Jouler. On 2026-10-25 he confirmed he is allowed to say publicly that he worked on GoodRx, and he will add it to LinkedIn. Do not describe groundcover as a platform Jouler built or claim ownership of the entire migration. [S01](../sources.md#s01), [S13](../sources.md#s13)

## Tentative copy

### Work listing

**Title:** Datadog to groundcover  
**Company:** GoodRx · via EPAM  
**Summary:** Initial migration work connecting observability with frontend architecture and team enablement.  
**Status:** TODO(verify) Migration phase completed or continuing; omit a public status badge until confirmed.

### Opening screen

**Headline:** Moving observability from Datadog to groundcover.

At GoodRx, through EPAM, I worked on the initial phase of a migration from Datadog to groundcover as part of a transversal architecture and enablement team.

The work sat alongside frontend architecture and shared UI initiatives, connecting how a product is built with how teams understand its behavior in production.

**Role:** Senior Software Engineer · EPAM  
**Period:** Within October 2025–May 2026; TODO(verify) exact project dates.  
**Focus:** Observability migration · Frontend enablement

### Product context

GoodRx helps people compare prescription prices and find pharmacy coupons in the United States. This case focuses on engineering work behind that product rather than a redesign of the customer experience. [S12](../sources.md#s12)

### My contribution

I worked independently during the initial migration phase, within a team that supported multiple product squads. My broader responsibilities included frontend guidance, reusable UI patterns and improvement initiatives around performance, observability and maintainability.

TODO(verify) Replace this overview with the specific deliverables I owned in the migration. Distinguish investigation, configuration, instrumentation, dashboards, documentation and team support rather than assuming I did all of them.

### The migration story

**What needed to move**  
TODO(verify) Describe the actual scope: browser monitoring, backend telemetry, infrastructure, dashboards, alerts or a subset. State why the migration was needed using a reason Jouler can share.

**One decision that mattered**  
TODO(verify) Add a real example: the signal or behavior that needed preserving, the options considered, the choice made and what was checked. Do not invent a dual-running strategy, cutover plan or cost rationale.

**What I handed over**  
TODO(verify) Name the completed artifact or milestone and who used it. This is more useful than a broad “improved observability” claim.

### A small frontend contribution

Alongside the migration, I also contributed to redesigning a few interface cards.

**Image caption:** A reference from the cards redesign.  
TODO(verify) Add one representative image and specify which card/component changes were mine. Keep this as a short supporting section, not a second full case study or a before/after claim without both states.

### Outcome and learning

TODO(verify) State what was delivered during my phase, what remained for the team and one lesson from the work. No migration-complete badge, savings figure or performance percentage is currently supported.

## Screen content plan

1. **Opening:** migration title, short role/context and a compact overview. A screenshot of the public home would not explain this work.
2. **Main story:** scope → one decision → what was validated/handed over. Use a factual, simplified migration diagram only after the scope is confirmed.
3. **Supporting visual:** one cards-redesign image with a short attribution caption. Keep it below the migration story.
4. **Close:** outcome boundaries, learning and next-project navigation.

**Visual material:** no GoodRx imagery in the supplied folder. Do not reuse the unrelated output capture from the earlier task as evidence of these cards. A missing image must not hold up reviewing the migration text.

## Owner review

- TODO(verify) Which part of the system did the migration cover, and why did the team migrate?
- TODO(verify) What did you personally deliver in the initial phase? What was the most consequential decision?
- TODO(verify) What could you demonstrate as working, and what happened after your handover?
- TODO(verify) Supply one shareable cards image and a one-sentence description of your changes.

## Sources

[Owner's scope clarification](../sources.md#s01) · [EPAM experience](../sources.md#s02) · [GoodRx context](../sources.md#s12) · [groundcover context](../sources.md#s13).
