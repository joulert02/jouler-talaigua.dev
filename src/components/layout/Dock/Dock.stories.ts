import preview from "../../../../.storybook/preview";
import StoryDock from "./stories/StoryDock.astro";
import { navigation } from "../../../config/navigation";
import { ui } from "../../../i18n/ui";

// The Dock takes links ready to show; here, the site's navigation with English labels and links that stay put.
const items = navigation.map(({ id, labelKey, icon }) => ({ id, label: ui.en[labelKey], href: "#", icon }));

const meta = preview.meta({
  title: "Components/Layout/Dock",
  component: StoryDock,
  tags: ["autodocs"],
  args: { items, label: ui.en["dock.main"], current: "home", variant: "labels", phone: false },
  parameters: {
    docs: {
      description: {
        component:
          "Floating bottom navigation shown on every page. It takes `items` ready to show (`DockLink`: `id`, `label`, `href`, `icon`) and a `label` for the landmark, with no i18n of its own; on the site Base.astro builds them from `src/config/navigation.ts`. `current` marks the page with `aria-current`. Actions (CopyEmail, ThemeToggle) are composed through the `actions` slot. `variant` sets how items are drawn: `labels` (every label beside its icon), `stacked` (every label under its icon), `active-label` (icons plus the current page's label) or `icons` (icons only, labels as tooltips); the compact variants add a pill that slides to the current page.",
      },
    },
  },
  argTypes: {
    current: { control: "select", options: navigation.map((item) => item.id) },
    variant: { control: "inline-radio", options: ["labels", "stacked", "active-label", "icons"] },
    items: { control: "object" },
    phone: { table: { disable: true } },
  },
});
export default meta;

export const Playground = meta.story({
  parameters: {
    docs: {
      description: {
        story: "Click an item to move the current page (here only; on the site each item navigates).",
      },
    },
  },
});

export const Phone = meta.story({
  args: { phone: true, variant: "active-label" },
  parameters: {
    docs: { description: { story: "The dock inside an iPhone, to judge each variant at phone size." } },
  },
});
