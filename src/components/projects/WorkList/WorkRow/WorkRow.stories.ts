import preview from "../../../../../.storybook/preview";
import WorkRow from "./WorkRow.astro";
import Example from "../../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Projects/WorkList/WorkRow",
  component: Example,
  ...exampleMeta(WorkRow),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "One project in WorkList: company, title, summary and focus. A row with a case is a link; its title takes `case-title-<slug>` (set by WorkList only while navigating to or from that case) to morph into the case header, and its `row-<slug>` id lets the case's back pill return to it. Private to WorkList; documented here to tune it on its own.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "projects/WorkList/WorkRow/examples/WorkRowExample.astro" },
  parameters: {
    docs: {
      description: { story: "A built case: hover or focus it to bring in the arrow." },
    },
  },
});

export const Coming = meta.story({
  args: { example: "projects/WorkList/WorkRow/examples/WorkRowComingExample.astro" },
  parameters: {
    docs: {
      description: {
        story:
          "Rows without `href` are plain text with a status tag. The second and third have no cover, so nothing shows under them on touch screens.",
      },
    },
  },
});
