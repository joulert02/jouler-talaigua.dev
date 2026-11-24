---
name: jota-design
description: >
  The design flow of the portfolio site: load it for any visual or experience change (a page, a case block, a
  component, spacing, layout, copy in the interface), also when nobody named a design command. Classifies the
  request, clarifies what is missing with short question rounds, shows two or three real options for the owner to
  choose, has an independent critic review them first, then implements the choice in code and Storybook. Calls
  Impeccable and design-principles as tools when they are installed. Use for "propose", "options", "variants", "this doesn't look good",
  "redesign", "diseño", "propuestas", /jota-design.
---

# JOTA design

The owner directs and decides; you propose, build and explain. Every visual or experience change goes through this
flow, however small: an adjustment takes the short path, a new decision the full one. Other design skills are tools
this flow calls; this file decides when and which wins.

## 0. Read first

- `docs/design/principles.md`, the **"Minimal and typographic"** section first: the owner's rule for every page.
- The Storybook docs that apply: `.storybook/docs/Cases.mdx` for case pages, `.storybook/docs/foundations/` for
  tokens, `Content.mdx` for copy, `Accessibility.mdx`. Storybook is the living reference; it can change with what
  the owner approves.
- The component you will touch, its story and its config.

## 1. Classify

Pick the shortest safe path and say it in one line ("Path: proposal, because…"). Escalate if a deeper one appears.

| The request | Path |
| --- | --- |
| Keeps the direction: a spacing, a text, a missing state, a visual bug, an accepted finding | **Adjustment**: steps 6–8 |
| A new visual decision: a new block or component, a different layout, or the owner dislikes how something looks | **Proposal**: steps 2–8 |
| Changes tokens, type, palette or the visual language | **Round**: a new version in `docs/design/` per `docs/design/workflow.md`, then a proposal |
| Only review, no change | **Critique**: step 4 on what exists, report findings |

## 2. Clarify (proposals)

Ask only what changes the result. Use AskUserQuestion: two or three related questions per round, the recommended
option first, a one-line trade-off each, in Spanish. One round by default; a second only if the answers open a real
gap. Assert the obvious reading instead of asking it. Never ask for CSS values.

Good questions: what the reader must take away from this block; what must stay untouched; what real content it
carries (and its longest case); what would make it feel wrong even if polished.

## 3. Propose

Two or three options that differ in **structure or hierarchy**, not in colour or radius. For each: what it favours,
what it gives up, and what the reader sees first. Recommended first.

- Build them with real content on the real page, never lorem ipsum: a temporary variant switch (an env var read by a
  small `<Case>Variant` component) and one build per option served on the LAN (`python3 -m http.server <port>
  --bind 0.0.0.0` from a copy of `dist/` in the scratchpad), or a story "Variants (proposal)" for a component.
- Hold every option to the owner's rule: no decoration, no card inside a card, every block on the layout's columns,
  nothing said twice.
- Tools: Impeccable's `distill`, `layout`, `typeset` and `quieter` references for the approach; read its
  `reference/craft-floor.md` before editing UI. See "Tools" below.

## 4. Critique before showing

A reviewer that did not build the options (a subagent) looks at their screenshots at 390 and 1440 px and reports
material problems only:

1. The owner's "Minimal and typographic" rules, one by one.
2. design-principles, in its diagnostic order (grid, typography, space, hierarchy, colour, balance), then its
   AI-design-tells pass.
3. Optionally Impeccable `critique` as a second opinion.

Fix what applies, then show. A finding that contradicts the owner's rules or decisions goes to the owner as a
question; it is never applied silently.

## 5. The owner chooses

Show the URLs or screenshots, the recommended option and the critique in a few lines. The owner picks one, mixes
them, or asks for another round. Do not implement before the choice.

## 6. Implement

- Apply the choice in the real component; remove the variant switch, the discarded options and their copy.
- Storybook: update the component's story (one story per look or state) and the docs page whose rule changed
  (`Cases.mdx`, a foundations page). A new general rule from the owner also goes into `principles.md`.
- Follow `AGENTS.md` and `src/components/AGENTS.md` (BEM prefixes, config files per language, no boolean flags).

## 7. Validate

- Screenshots at 390, 1024, 1440 and 1920 px, light and dark, EN and ES; check horizontal overflow; run any
  scripted path. Look at them: that is the check, not the build passing.
- `npm run lint`, `npm run check`, `npm test`, `npm run placeholders`, Prettier on the changed files.

## 8. Report

What changed, what was verified and what was not, and what the owner still has to decide. No commit, push or PR
without the owner's instruction.

## Precedence

1. The owner's decisions: this conversation, then `principles.md` ("Minimal and typographic" first) and
   `docs/decisions-log.md`.
2. The Storybook docs and `docs/design/handoff.md`.
3. This skill.
4. Third-party advice (Impeccable, design-principles, any other design skill).

## Tools

Optional: load each one only at the step that uses it, and only if it is installed on this machine. They are not part
of this repository; without them, the owner's rules and the Storybook docs are enough for every step.

| Skill | Origin | Used at |
| --- | --- | --- |
| `impeccable` 4.8.1 | [pbakaus/impeccable](https://github.com/pbakaus/impeccable), Apache-2.0 | 3 (approach, craft floor), 4 (`critique`, optional) |
| `design-principles` | [djsbaker/design-principles-skill](https://github.com/djsbaker/design-principles-skill) at `282ec4b`, MIT | 4 (diagnostic order, AI-design tells) |

**Impeccable rules.** Install it **without hooks**: never add its hook to `.claude/settings*.json` or `.codex/`, and
never run `/impeccable hooks on`. Never run `init`, `teach`, `document` or `extract`: they write their own
PRODUCT.md and DESIGN.md, and this repo's `docs/design/` and Storybook are the only source. When it looks for those
files, give it `principles.md` and the Storybook docs instead. Its engine binary is cached per machine in
`~/.impeccable/` and verified against `scripts/engine-checksums.txt`; never commit it.

**Adding a design skill:** read it whole, check its license and what it runs (hooks, scripts, network), get the
owner's approval, then add it to this table. One copied into this repository brings its licence file with it.
