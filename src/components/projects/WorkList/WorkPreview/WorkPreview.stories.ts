import preview from "../../../../../.storybook/preview";
import WorkPreview from "./WorkPreview.astro";
import { workItems } from "../examples/items";

const meta = preview.meta({
  title: "Components/Projects/WorkList/WorkPreview",
  component: WorkPreview,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "WorkList's preview: every project's cover stacked in one 5:4 frame, with only the active one shown (the first, until WorkList moves it), and a caption. A project without a cover shows a status tile. Decorative (`aria-hidden`): the rows carry the content. Private to WorkList.",
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
        story: "Reorder the items in the controls: the first one is the cover that shows.",
      },
    },
  },
});
