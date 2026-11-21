import preview from "../../../../../.storybook/preview";
import TechSticker from "./TechSticker.astro";
import { logos } from "./logos";

const meta = preview.meta({
  title: "Components/Board/Objects/TechSticker",
  component: TechSticker,
  tags: ["autodocs"],
  argTypes: { logo: { control: "select", options: Object.keys(logos) } },
  parameters: {
    docs: {
      description: {
        component:
          "A die-cut sticker of a favourite tool: the `logo` itself (Astro's two-color mark, React, TypeScript or the Claude desktop app icon) with a white edge, no card and no shadow. Pure decoration with an accessible name (`label`): on the desk it can be dragged and does nothing else, not even the lift other objects get on hover. Shapes come from Simple Icons; the marks belong to their owners and only name the tools.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { logo: "astro", label: "Astro sticker" },
  parameters: {
    docs: { description: { story: "Switch `logo` to see the four stickers." } },
  },
});
