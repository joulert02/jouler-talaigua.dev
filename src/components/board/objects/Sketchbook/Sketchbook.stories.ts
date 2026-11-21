import preview from "../../../../../.storybook/preview";
import Sketchbook from "./Sketchbook.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/Sketchbook",
  component: Sketchbook,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A spiral sketch pad the visitor can draw on with the pointer, with a handwritten `caption` and a `clear` button that wipes the page. The drawing lives only in the page: nothing is saved or sent. On the desk, dragging on the paper draws and the pad moves when dragged by its edge. Paper and ink keep their own colors in both themes. Drawing needs a pointer: the canvas is named by `label` and has no keyboard alternative.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Sketch pad: draw with the pointer",
    caption: "Learning to draw. Your turn.",
    clear: "Clear",
  },
  parameters: {
    docs: { description: { story: "Draw on the paper, then press Clear." } },
  },
});
