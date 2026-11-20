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
          "The Work page's list of selected projects: company, title, summary and focus per row, with a sticky preview beside it from 901px wide on devices that hover. The preview follows the row last pointed at or focused and stays on it. On touch screens and up to 900px the preview goes and each row shows a thumbnail. A case that is not built yet is plain text with its status tag, never a broken link. On the site the items come from the `projects` collection (`src/views/WorkHub.astro`).",
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
          "One row per state: a built case (a link), a coming case and a status page without a cover. Point at or Tab through the rows to move the preview; narrow the canvas to see the thumbnails.",
      },
    },
  },
});
