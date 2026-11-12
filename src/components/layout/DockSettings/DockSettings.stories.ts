import { expect, userEvent } from "storybook/test";
import preview from "../../../../.storybook/preview";
import { storyLinks } from "../../../../.storybook/links";
import { withLocale } from "../../../../.storybook/locale";
import DockSettings from "./DockSettings.astro";
import { languageItems } from "../../../config/profile";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Layout/DockSettings",
  component: DockSettings,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Gear in the Dock that opens a panel with the theme and the language. The site shows it up to 560px wide, in place of the ThemeToggle and the top language pill. The panel is a native popover: Escape or a click outside closes it and focus returns to the gear.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { languages: storyLinks(languageItems) },
  parameters: { docs: { description: { story: "Open the gear, then switch the theme from the panel." } } },
  play: async ({ canvas, canvasElement }) => {
    const gear = canvas.getByRole("button", { name: /settings|ajustes/i });
    await userEvent.click(gear);
    const panel = canvasElement.querySelector<HTMLElement>("[popover]");
    await expect(panel?.matches(":popover-open")).toBe(true);
    await userEvent.keyboard("{Escape}");
    await expect(panel?.matches(":popover-open")).toBe(false);
  },
});
