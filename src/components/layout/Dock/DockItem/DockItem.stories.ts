import preview from "../../../../../.storybook/preview";
import DockItem from "./DockItem.astro";
import { ui } from "../../../../i18n/ui";

const meta = preview.meta({
  title: "Components/Layout/Dock/DockItem",
  component: DockItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "One link of the Dock: icon, label and a tooltip on wide screens. Private to the Dock; documented here to tune it on its own.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { item: { id: "home", label: ui.en["dock.home"], href: "#", icon: "home" }, current: true },
  parameters: {
    docs: { description: { story: "Toggle `current` to compare the current and resting states." } },
  },
});
