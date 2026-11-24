import preview from "../../../../../.storybook/preview";
import CaseFigure from "./CaseFigure.astro";
import Example from "../../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Projects/Case/CaseFigure",
  component: Example,
  ...exampleMeta(CaseFigure),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A capture or photo in a case (v11 `.figure`): full width with a hairline and an optional caption from the slot. In MDX it takes an image imported from `src/assets/` and the caption as text.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "projects/case/CaseFigure/examples/CaseFigureExample.astro" },
  parameters: {
    docs: { description: { story: "A capture with its caption, as in the Bancolombia intro." } },
  },
});
