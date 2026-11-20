import preview from "../../../../.storybook/preview";
import DeskObject from "./DeskObject.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/UI/DeskObject",
  component: Example,
  ...exampleMeta(DeskObject),
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The Desk's sub-component for what lies on it: it places one child at `x`, `y` (world pixels) with a resting `tilt`, and from 901px lets the visitor drag it. The child is the object and keeps its own behaviour: a FlipCard, a link, a Vinyl, or anything static. A press that does not travel 5px is a normal click on the child; a real drag moves the object, brings it to the front and swallows that click. Objects stay inside the world, positions reset on reload, and reduced motion lays them straight. Outside a Desk it renders in place. The stories render example files; Show code shows each file.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "ui/DeskObject/examples/DeskObjectExample.astro" },
  parameters: {
    docs: {
      description: {
        story:
          "Drag the photo around the small desk (window at least 901px wide); click it without moving to flip it.",
      },
    },
  },
});

export const WithLink = meta.story({
  name: "With a link",
  args: { example: "ui/DeskObject/examples/DeskObjectLinkExample.astro" },
  parameters: {
    docs: {
      description: {
        story:
          "The child is a plain link: a click follows it, a drag only moves it. Hover or focus to see the rocket fire.",
      },
    },
  },
});
