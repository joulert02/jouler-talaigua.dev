# Working agreement

## Roles

- **Owner (Jouler Talaigua):** decides what we build and why, approves specs and designs, gives design feedback as art director, validates content, and merges.
- **Project lead (Claude):** classifies work, proposes, documents, plans, executes or delegates to agents, verifies, and brings decisions ready to choose.

## Flow

Work follows one of three paths, and the lead says which before starting:

- **Spike:** a feasibility question. The answer is a recommendation; any code is throwaway.
- **Bounded:** a small change to something that exists. A short design in chat, then the change after approval.
- **Architectural:** something new or structural. Brainstorm, then a written spec in `docs/superpowers/specs/`, then a plan in `docs/superpowers/plans/`, then implementation and review. The owner approves each stage.

## Where definitions live

| Document                            | Answers                                            |
| ----------------------------------- | -------------------------------------------------- |
| `docs/discovery-brief.md`           | Why the site exists and for whom                   |
| `docs/design/references.md`         | Which sites inspire us and what we take from each  |
| `docs/design/principles.md`         | The rules every screen follows, plus design tokens |
| `docs/design/rounds.md`             | Every design round, the feedback and the lessons   |
| `docs/design/README.md`             | The prototype versions and how to review them      |
| `docs/content/projects/`            | The copy and screen plan for each project page     |
| `docs/adr/`                         | Technical decisions and the alternatives rejected  |
| `docs/superpowers/specs/`, `plans/` | What we build in each initiative, and how          |
| `docs/decisions-log.md`             | What was decided and when, one line each           |

Tasks and status live in the GitHub Project of this repository ([joulert02/projects/2](https://github.com/users/joulert02/projects/2)); the plan is in [the backlog](backlog.md). Definitions live in this repository. The earlier Notion Sprint Board is kept as history and is not a second backlog.

## Design continuity · 2026-10-25

- Review design iterations as local HTML in this repository, starting with [the version history](design/README.md). Claude artifact links remain historical references; new iterations no longer depend on artifacts.
- The current proposal is identified in the version history. Retain older version directories for comparison; do not overwrite them when producing a new iteration.
- Record authorship in Git commits and `Co-authored-by` trailers; keep attribution markers out of documentation and visitor-facing content.
- This consolidation includes Codex's portfolio work and Claude's existing design documentation. Unrelated local changes, including GoodRx and dependency experiments, are outside its scope.

## Git

- Trunk-based development: `main` is the trunk. Work happens on short-lived branches named by type, `feature/<slug>` for new work and `fix/<slug>` for corrections, kept small and integrated into `main` often. Branches are never named after an agent.
- Commits are semantic (Conventional Commits). Each commit made by an agent ends with a `Co-Authored-By` trailer naming that agent.
- The owner reviews and integrates into `main`; feature branches are integrated with a squash commit and left alive.
- No commit, push, deploy, purchase or publication without the owner's authorization (see `AGENTS.md`).
