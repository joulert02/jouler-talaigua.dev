import preview from "../../../../../.storybook/preview";
import DeskNote from "./DeskNote.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/DeskNote",
  component: DeskNote,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The note on the back of a FlipCard: a handwritten `title` and one or two short sentences on a paper-toned card. On its own it is 184px wide like the other objects; inside a FlipCard it fills the back, taking the size of the face.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { title: "Two wheels, long roads.", text: "Riding is how I reset. Rain included." },
});
