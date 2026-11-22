import preview from "../../../../../.storybook/preview";
import CaseQuote from "./CaseQuote.astro";
import Example from "../../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Projects/Case/CaseQuote",
  component: Example,
  ...exampleMeta(CaseQuote),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A pull quote in a case (v11 `.pull`): the owner's own words, larger, with a rule on the left. Its paragraphs are Markdown in the MDX. Inside CaseIntro it takes the intro's smaller size through `--case-quote-*` custom properties.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "projects/case/CaseQuote/examples/CaseQuoteExample.astro" },
  parameters: { docs: { description: { story: "A quote at its default size, outside the intro." } } },
});
