import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import Board from "./Board.astro";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Board/Board",
  component: Board,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The Home's board section as the portfolio renders it: a Desk with the IdentityCard in its center and the personal objects around it. The prints and cards that share one look rest beside the card; a record, the lamp and the bug jar wait one step away, and the rest is found by walking. The story renders the component itself, so it always matches the page; the objects are in `BoardObjects.astro`, their places in `layout.ts` (arranged with the BoardLayout story) and their copy in `src/config/desk.ts`. In a window at least 901px wide, drag the dotted background to walk the desk and drag any object to move it; narrow it to see the card flow alone.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
