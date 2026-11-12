import preview from "../../../../../.storybook/preview";
import ThemeTogglePure from "./ThemeTogglePure.astro";

// SP-03 probe, to review and then delete. In the site, a container builds `labels` with
// `labelsFor(getLang(Astro), themeToggleKeys)` (see labels.ts) and passes them down; the story passes them as args.
const meta = preview.meta({
  title: "SP-03 probes/3 · Helper labelsFor",
  component: ThemeTogglePure,
  parameters: {
    docs: {
      description: {
        component:
          "Option 3. The story renders the pure component itself, so `labels` is a normal Controls arg: edit `label` and `tooltip` and the button changes. No `locale` control.",
      },
    },
  },
});
export default meta;

export const Helper = meta.story({
  args: { labels: { label: "Toggle theme", tooltip: "Theme" } },
});
