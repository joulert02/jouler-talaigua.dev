import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import Dock from "./Dock.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Layout/Dock",
  component: Example,
  ...exampleMeta(Dock, withLocale),
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Floating bottom navigation shown on every page. It takes `items` ready to show (`DockLink`: `id`, `label`, `href`, `icon`) and a `label` for the landmark, with no i18n of its own; on the site Base.astro builds them from `src/config/navigation.ts`. `current` marks the page with `aria-current`. Actions (CopyEmail, ThemeToggle) are composed through the `actions` slot. `variant` sets how items are drawn: `labels` (every label beside its icon), `stacked` (every label under its icon), `active-label` (icons plus the current page's label) or `icons` (icons only, labels as tooltips); the compact variants add a pill that slides to the current page.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "layout/Dock/examples/DockExample.astro" },
  parameters: {
    docs: {
      description: {
        story:
          "The Dock as every page renders it, with the `labels` variant; switch `locale` to review it in Spanish.",
      },
    },
  },
});

export const Phone = meta.story({
  args: { example: "layout/Dock/examples/DockPhoneExample.astro" },
  parameters: {
    docs: { description: { story: "The `active-label` variant inside an iPhone, as phones show it." } },
  },
});
