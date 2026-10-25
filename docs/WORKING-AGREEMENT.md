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
| `docs/adr/`                         | Technical decisions and the alternatives rejected  |
| `docs/superpowers/specs/`, `plans/` | What we build in each initiative, and how          |
| `docs/decisions-log.md`             | What was decided and when, one line each           |

Tasks and status live in Notion. Definitions live in this repository.

## Git

- The lead works on `claude/*` branches. The owner reviews and merges into `master`.
- No commit, push, deploy, purchase or publication without the owner's authorization (see `AGENTS.md`).
