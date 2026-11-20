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
          "The Home's board section as the portfolio renders it: a Desk with the IdentityCard in its center and the ten v11 objects around it (photos, ticket, cards and the record flip or play; the rocket and the envelope only rest until the roadmap and the letter exist). The story renders the component itself, so it always matches the page; the copy lives in src/config/desk.ts. In a window at least 901px wide, drag the dotted background to walk the desk and drag any object to move it; narrow it to see the card flow alone.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
