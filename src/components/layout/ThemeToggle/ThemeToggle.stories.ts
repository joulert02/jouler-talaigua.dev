import preview from "../../../../.storybook/preview";
import ThemeToggle from "./ThemeToggle.astro";

const meta = preview.meta({
  title: "Components/Layout/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Switches between light and dark, saves the choice and exposes the state with `aria-pressed`. Without a saved choice the site follows the OS preference.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {},
  parameters: { docs: { description: { story: "Click it: the canvas changes theme, as the site does." } } },
});
