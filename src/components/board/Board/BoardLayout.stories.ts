import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import Board from "./Board.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Board/BoardLayout",
  component: Example,
  ...exampleMeta(Board, withLocale),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A tool, not part of the site: it arranges the objects of the Home's desk. Where each one rests lives in `layout.ts`, next to the Board; `npm run board:layout` opens this story on its own.",
      },
    },
  },
});
export default meta;

export const LayoutEditor = meta.story({
  args: { example: "board/Board/examples/BoardLayoutEditor.astro" },
  parameters: {
    docs: {
      description: {
        story:
          "The whole desk on a sheet. Drag an object to move it, or select it and use the arrow keys (Shift for 10px) or the X, Y and Tilt fields. Drag the sheet or use the wheel to pan; Ctrl or Cmd with the wheel, a pinch or the buttons zoom. The dashed outlines are what three screen sizes show before the visitor moves. Positions are kept in this browser and, in development, shown on the Board too. Copy layout gives the layout formatted like `layout.ts`, to paste over the value of `layout`; Paste layout applies one, in that format or as JSON, and Reset goes back to the file.",
      },
    },
  },
});
