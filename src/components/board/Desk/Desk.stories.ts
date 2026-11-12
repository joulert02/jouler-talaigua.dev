import preview from "../../../../.storybook/preview";
import { storyLinks } from "../../../../.storybook/links";
import { withLocale } from "../../../../.storybook/locale";
import StoryDesk from "./stories/StoryDesk.astro";
import { identity } from "../../../config/profile";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Board/Desk",
  component: StoryDesk,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The Home desk: a world larger than the screen with the identity card at its center (the `anchor` slot) and, later, the personal objects (default slot). From 901px a camera moves the world: drag the background or the card, use the wheel or trackpad, or focus the desk and use the arrow keys, Page Up/Down, and `0`/Home to recenter. Below 901px the desk steps aside and its content flows as a normal page. Reduced motion turns the eased steps into jumps.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { data: storyLinks(identity) },
  parameters: {
    docs: {
      description: {
        story:
          "Drag the dotted background in a window at least 901px wide; narrow it to see the card flow alone.",
      },
    },
  },
});
