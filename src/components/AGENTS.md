# Components · agent instructions

Applies to everything under `src/components/`. Load the shared skills in `.agents/skills/` before writing or reviewing a component: `astro-best-practices`, `vercel-composition-patterns`, `web-design-guidelines` (and `vercel-react-best-practices` for React islands).

## Owner preferences

- Composition over inheritance and over configuration flags. No boolean props that switch features on or off (`showX`); compose the parts or pass data.
- Data-driven: lists (menu items, links, career rows) come from a typed array in a config module, never hard-coded one by one in the template. Adding or removing an entry must not touch the component.
- Copy lives in constants, not scattered string props: shared strings in `src/i18n/ui.ts`, component data in a typed config next to the component or in `src/config/`. Components never take a language or one prop per string.
- The language comes from the page, never from props: read it with `getLang(Astro)` (`src/i18n/ui.ts`), which returns the route's locale (`/` or `/es/`). Every component on a page gets the same language, so a page can never mix two. In Storybook, stories whose copy matters spread `withLocale` (`.storybook/locale.js`) into the meta to get a `locale` control; the rest render in the default language. Links in story args go through `storyLinks` (`.storybook/links.js`), so every `href` is `#`; only an in-page target a story needs (SkipLink's `#main`) stays.
- Small, typed props with descriptive names (`items`, `current`, `lang`). No one-letter aliases such as `const p = Astro.props`.
- Production components contain no story-only behaviour (no `interactive` flags for Storybook).

## Structure

Grouped by what a component knows, following the design system ecosystem model (core → recipes → product; Brad Frost, 2023). Code stays flat inside each group, like GitHub Primer.

```text
src/components/
  ui/        # core: pure, knows no site content, would work in another project (Button, JotaMark, Desk, DeskObject)
  layout/    # site chrome on every page (SkipLink, Dock, Footer, LanguageSwitch)
  profile/   # recipes per content domain: who Jouler is (IdentityCard, CareerPath)
  projects/  # (next) shows the `projects` collection: ProjectCard, ProjectHeader…
  articles/  # (next) shows the `articles` collection: ArticleCard, ArticleBody…
  board/     # (HU-02) the Home's board section (Board) and its own parts (FlipCard, objects/)
src/pages/   # product: pages only compose; they own no components
```

Where a new component goes:

1. Shown on every page → `layout/`.
2. Shows data of a content domain → that domain's folder, however many pages use it (`projects/ProjectCard` even when the Home shows it). Domain folders are named after their content collection (`articles/`, even though the dock label says "Notes").
3. Shows no site content (button, icon, brand mark) → `ui/`.
4. Never a folder per page: pages exist once per language (`/` and `/es/`) and are told apart in `src/pages/`.
5. Split `ui/` into functional categories (forms, navigation…) only when it has enough pieces to need it. Mark status (experimental, deprecated) with Storybook tags, not folders.

Every component has its own folder, private parts included. A part used only by one component nests inside that component's folder; a part used by several moves up to its group.

```text
src/components/<group>/<Component>/
  <Component>.astro        # the component
  <Component>.stories.ts   # overview, playground and meaningful variants
  <component>.config.ts    # typed data and constants, when it has any
  types.ts                 # shared types, when needed
  examples/                # composition examples its stories render and show as code
  <Part>/                  # a private part, with the same layout (Dock/DockItem/)
```

Example files live only in `examples/`, never beside the production files, and are written as a page would write them (real components, imported by relative path: storybook-astro loads a component's CSS only through relative `.astro` imports). Each one is registered in `.storybook/Example.astro`.

Story titles mirror the path, as Storybook recommends: `Components/<Group>/<Component>`, and a private part goes under its parent (`Components/Layout/Dock/DockItem`).

Sources: Storybook, [Naming components and hierarchy](https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy); Brad Frost, [The design system ecosystem](https://bradfrost.com/blog/post/the-design-system-ecosystem/); [GitHub Primer React](https://github.com/primer/react/tree/main/packages/react/src).

## Styles

storybook-astro (1.14) injects each component's `<style>` into the Storybook document without Astro's scoping, so every rule applies to every story and to the docs page. Write styles that are safe without scoping:

- Class selectors only, never bare elements (`a`, `li`, `h2`, `button`). Give each element you style a class.
- Prefix every class with the component name, BEM style: `.footer`, `.footer__link`, `.footer__item--email`. No generic names (`.item`, `.label`, `.example`).
- Example files follow the same rule (`.desk-example`).

## Stories

Each component's stories file gives three things, following Storybook's recommended structure, and nothing that repeats them:

1. **Overview**: the `autodocs` page. Its `parameters.docs.description.component` says what the component is for, where its data comes from, and a usage or accessibility note only when one is needed. Document each prop with JSDoc in `Props`, so the props table explains the API. No separate MDX guide per component.
2. **Playground**: one story named `Playground` with every prop as a control, so every state can be explored from one example.
3. **Variants**: another story only for a variant with interface meaning (a different composition, extra decoration, a different context of use), e.g. `Button/Ghost`, `Dock/Phone · Icons`.

- Never a story just for light vs dark, a language, a viewport or a hover/focus state: theme is a toolbar global, language the opt-in `locale` control, and states are reached by interacting.
- Every story has a one-sentence docs description that says what to look at or try. If it cannot say something the Playground does not, it should not exist.
- A component with no props and no behaviour worth exploring (DockSeparator) gets no stories.

**Flow for pure components and sections:**

1. A transversal, pure component goes in `ui/`, and a code example is mandatory: its stories render an example file that shows how to compose it (Desk with a simple card in its `center` slot and one DeskObject).
2. A section of the site (`board/Board`) is a real component the page uses as is. Its story renders that component itself, with no example file, so changing the section changes the story; its Show code shows only `<Board />`, not its subcomponents.
3. The section's own parts (FlipCard, the board objects) live in the section's folder with their own stories.

**Show code** is always generated, never written by hand (`.storybook/source.js`, guarded by `scripts/stories-source.test.mjs`):

- A story that renders its component with args gets its snippet from storybook-astro's generator, which follows the Controls. The meta `component` is the component itself.
- A composition story (other components inside its slots, or a context such as a list or a desk) renders an example file from `examples/`, written as a page would write it, and shows that same file. Its meta sets `component: Example` (`.storybook/Example.astro`) and `...exampleMeta(TheComponent)`, which documents the real component's props without live controls; each story names its file in `args: { example: "<group>/<Component>/examples/<File>.astro" }`. The static build prerenders only the meta component with its args, which is why the file is an arg.

Source: Storybook, [Structuring your Storybook](https://storybook.js.org/blog/structuring-your-storybook/).

## Storybook MCP

With `npm run storybook` running, the `jota-storybook` MCP server (`@storybook/addon-mcp`, `http://localhost:6006/mcp`) is available to Claude Code (`.mcp.json`) and Codex (`.codex/config.toml`).

- Before creating or editing a component or its stories, call `get-storybook-story-instructions`; the owner preferences above win where they differ.
- After any visual change, call `stories-preview` for the affected stories and include the preview URLs in your result.
- `stories-find-by-component` matches the story's `component`, which is always the component itself.
- The docs toolset (`docs-list`, `docs-show`) is not available: storybook-astro generates no components manifest.
