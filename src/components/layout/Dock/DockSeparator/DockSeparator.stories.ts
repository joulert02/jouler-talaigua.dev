import preview from "../../../../../.storybook/preview";
import DockSeparator from "./DockSeparator.astro";

const meta = preview.meta({
  title: "Components/Layout/Dock/DockSeparator",
  component: DockSeparator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The thin vertical line between the Dock's links and its actions (copy email, theme, settings). Decorative (`aria-hidden`); it gains side margin from 561px. Private to the Dock: see it in place in the Dock stories.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
