---
name: case-builder
description: >
  Builds a case study page of the portfolio (Work → /work/<slug>/) in English and Spanish: the MDX, its
  playgrounds and their stories, in the owner's voice and the layout of the first case (Brand platforms).
  Asks the owner, with a recommended answer, before using anything it does not have. Use for "build the
  <project> case", "turn on the case", "case page", "caso de estudio", /case-builder.
---

# Case builder

Build one case page the way Brand platforms (HU-04) was built. The case's HU in the GitHub Project is
the task; the project's draft in `docs/content/projects/` is the content source.

Read before starting, and follow them over this file if they disagree:

- `AGENTS.md`, `src/components/AGENTS.md`
- `.storybook/docs/Cases.mdx`: how a case turns on, the blocks in order, the v11 design rules
- `docs/content/projects/README.md` and the case's draft, `sources.md`, `assets.md`
- The reference case: `src/content/projects/{en,es}/brand-platforms.mdx` and
  `src/components/projects/brand-platforms/`

## 1. Ask before building

Never guess a fact, a permission or a resource. Collect the open points first and ask them with
AskUserQuestion: at most 4 per call, each one standing on its own, the recommended option first and
marked "(Recommended)", and a one-line trade-off per option. Ask in Spanish; the repo stays in English.

Always settle these before writing code (skip what the draft or the HU already answers):

1. **Resources:** which captures, video, logos or URLs exist, and where. Options: "I'll send them",
   "Use placeholders (Recommended when there are none)", "Skip that piece".
2. **What can be shown of the client:** real captures, a recreation, or placeholder content.
   Recommended: a recreation with placeholder content, and the note says which parts are placeholders.
3. **One interactive piece per chapter:** propose two or three concrete ideas (what the reader presses
   and what they see change) and recommend the one that tells the chapter's point fastest.
4. **Facts marked `TODO(verify)`** in the draft: confirm, rewrite or keep the marker. A marker left in
   blocks publication (`npm run placeholders`), so say so.

Ask again whenever something new comes up mid-build. Do not pile up guesses to ask at the end.

## 2. Voice

The copy is the owner's, not marketing. Match `brand-platforms.mdx`:

- First person, plain and specific: what I did, with whom, what changed. Short sentences.
- No inflated claims, no invented metrics, no adjectives doing the work ("robust", "seamless").
- Credit the team and the people who guided the work.
- Approved paragraphs from the draft go into `<FullStory>` unchanged.
- Spanish is written, not translated word for word: natural Colombian Spanish, same facts, same length.
  Labels, captions and alt text are written per language too.
- UI microcopy is short: mono labels name what a piece is ("Screenshots of the live site"), buttons
  are verbs ("Publish a change"), hints say what to try.

When unsure of a phrase, offer two versions in the question instead of picking one silently.

## 3. Layout

The MDX: `CaseFacts` → `CaseIntro` (text, `CaseQuote`, media) → one `Chapter` per part, each with its
playground first, then `FullStory`. The page itself (top bar, index, header, previous/next) comes from
`WorkCase`; do not rebuild it.

Playgrounds:

- Live in `src/components/projects/<case-slug>/<Name>Playground/`, with copy per language in
  `<name>.config.ts`, a story titled `Components/Projects/<Case>/<Name>Playground`, and an example
  registered in `.storybook/Example.astro`. Shared case parts stay in `src/components/projects/case/`.
- Use `ExampleFrame` with `label` and a `shortLabel` that fits one line on phones; hints and notes go
  in the foot (`ExampleHint`, `ExampleNote`), never between the controls and the piece.
- Phones (below 720px): the phone version only, controls full width, no diagrams or rails beside the
  piece. If a step-by-step explanation matters, tell it inside the piece (Petys: three checks inside
  the phone, then the site changes).
- Wide screens: cap a wide playground at 1200px, centred.
- Every playground has a scripted path (the primary button, rightmost) and announces its result in the
  frame's live region. Reduced motion still shows each step.
- Third-party screens keep their own palette in both themes. Live sites are linked ("See it live ↗"),
  never embedded.
- Assets in `src/assets/projects/<client>/`. A replaced image gets a new file name, so no cache serves
  the old one.

## 4. Validate

- Screenshots in the browser at 390, 1024, 1440 and 1920, light and dark, EN and ES. Run every scripted
  path and capture its middle and its end. Check the phone first: it is where layouts broke.
- `npm run lint`, `npm run check`, `npm test`, `npm run placeholders`, and Prettier on the changed files.
- A build breaks a running dev server's CSS cache: restart it after `npm run build`.

## 5. Deliver

- Branch `feature/hu-<n>-case-<slug>` from `main`. Semantic commits by responsibility (copy, a
  playground, shared parts), with the executing agent's `Co-Authored-By` trailer.
- Push, then open the PR right away: "Closes #<n>", what the page shows, what was verified, and the
  open owner items. No generated footer.
- Never merge, deploy or publish. Show the owner the screenshots and ask for the next round.
