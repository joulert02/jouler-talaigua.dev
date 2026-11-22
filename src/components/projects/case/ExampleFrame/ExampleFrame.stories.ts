import preview from "../../../../../.storybook/preview";
import ExampleFrame from "./ExampleFrame.astro";
import Example from "../../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Projects/Case/ExampleFrame",
  component: Example,
  ...exampleMeta(ExampleFrame),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The one frame for every example and playground in a case (v11 `.lab`). The mono label top left says what it is and whose code it is not; controls go top right (`controls`), an optional line under them (`head`), then the piece, then ExampleHint and ExampleNote on the left (`foot`) and the actions on the right (`actions`). Foot rule: the primary action runs the demo and is always rightmost; links that leave are ghost, to its left. On phones the actions stack, primary last. Scripts announce results through the frame's live region (`announce` in `frame.ts`).",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "projects/case/ExampleFrame/examples/ExampleFrameExample.astro" },
  parameters: {
    docs: { description: { story: "Every slot filled; narrow the canvas to see the actions stack." } },
  },
});
