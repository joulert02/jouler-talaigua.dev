import preview from "../../../../../.storybook/preview";
import CaseFacts from "./CaseFacts.astro";
import Example from "../../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Projects/Case/CaseFacts",
  component: Example,
  ...exampleMeta(CaseFacts),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The facts strip under a case header (v11 `.facts`): a definition list of Fact entries (label and value), in one row from 720px and stacked on phones. Write it first in the case's MDX; labels are content, so each language writes its own (Role/Rol, Stack/Tecnología).",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "projects/case/CaseFacts/examples/CaseFactsExample.astro" },
  parameters: {
    docs: { description: { story: "Three facts; narrow the canvas below 720px to see them stack." } },
  },
});
