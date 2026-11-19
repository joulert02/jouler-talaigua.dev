import preview from "../../../../../.storybook/preview";
import ObjectCard from "./ObjectCard.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/ObjectCard",
  component: ObjectCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A small card about an interest: a drawing from `illustrations/` (one SVG per file, currentColor plus one accent detail), a title and one line of text. Used as the face of a FlipCard.",
      },
    },
  },
  argTypes: { illustration: { control: "inline-radio", options: ["anime", "game", "pole"] } },
});
export default meta;

export const Playground = meta.story({
  args: { illustration: "anime", title: "Favorite anime", text: "Naruto. Shippuden is my favorite era." },
  parameters: {
    docs: {
      description: {
        story: "Switch `illustration` and edit the copy; long text wraps inside the 184px card.",
      },
    },
  },
});
