import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import Desk from "./Desk.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/UI/Desk",
  component: Example,
  ...exampleMeta(Desk, withLocale),
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A world larger than the screen that knows nothing of what it holds. The `center` slot takes the element the resting view centers on (the Home's identity card); the default slot takes DeskObjects placed in world coordinates. `world` sets the world's size and `origin` where the center element's top-left corner sits in it (both default to v11: 1960 × 1460 and 710, 350). From 901px a camera moves the world: drag the background, use the wheel or trackpad, or focus the desk and use the arrow keys, Page Up/Down, and `0`/Home to recenter. Below 901px the world is hidden and the center element flows as a normal page. The stories render example files; Show code shows each file.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "ui/Desk/examples/DeskExample.astro" },
  parameters: {
    docs: {
      description: {
        story:
          "A card in the center slot and one DeskObject. In a window at least 901px wide, drag the dotted background to walk the desk and drag the object to move it. Narrow the window to see the card flow alone.",
      },
    },
  },
});
