import preview from "../../../../.storybook/preview";
import WorkList from "./WorkList.astro";
import { workItems } from "./examples/items";

const meta = preview.meta({
  title: "Components/Projects/WorkList",
  component: WorkList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'The Work page\'s list of selected projects: company, title, summary and focus per row, with a preview beside it from 901px wide on devices that hover. The preview follows the row last pointed at or focused, level with it, and stays on it. On touch screens and up to 900px the preview goes: each summary is cut to two lines with "See more", and the cover sits under the row. That is the `detail` variant; the default `minimal` one (v11) leaves the summary out. On the site the items come from the `projects` collection (`src/views/WorkHub.astro`).',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { items: workItems },
  parameters: {
    docs: {
      description: {
        story:
          "The default, minimal variant (v11): company, title and focus per row. One row per state: a built case (a link), a coming case, a status page without a cover and a personal project. Point at or Tab through the rows to move the preview.",
      },
    },
  },
});

export const Detail = meta.story({
  args: { items: workItems, variant: "detail" },
  parameters: {
    docs: {
      description: {
        story:
          'The detail variant, `?work=detail` on the site: each row adds its summary. Narrow the canvas to see the two-line cut with "See more" and the covers under the rows.',
      },
    },
  },
});
