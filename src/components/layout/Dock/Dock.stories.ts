import preview from "../../../../.storybook/preview";
import { storyLinks } from "../../../../.storybook/links";
import StoryDock from "./stories/StoryDock.astro";
import { navigation } from "../../../config/navigation";

const meta = preview.meta({
  title: "Components/Layout/Dock",
  component: StoryDock,
  tags: ["autodocs"],
  args: { items: storyLinks([...navigation]), current: "home", variant: "labels", phone: false },
  parameters: {
    docs: {
      description: {
        component:
          "Floating bottom navigation shown on every page. Items come from `src/config/navigation.ts`; `current` marks the page with `aria-current`. Actions (CopyEmail, ThemeToggle) are composed through the `actions` slot. `variant` sets how items are drawn: `labels` (every label), `active-label` (icons plus the current page's label) or `icons` (icons only, labels as tooltips); the compact variants add a pill that slides to the current page.",
      },
    },
  },
  argTypes: {
    current: { control: "select", options: navigation.map((item) => item.id) },
    variant: { control: "inline-radio", options: ["labels", "active-label", "icons"] },
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
