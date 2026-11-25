import preview from "../../../../../.storybook/preview";
import CaseIndex from "./CaseIndex.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/Case/CaseIndex",
  component: CaseIndex,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The case index (owner review, 2026-11-23): the chapters as a line of text links under the facts strip, number and short name in mono, on the layout's quarters; hidden on phones (owner review, 2026-11-25). Static and plain anchors. The MDX lists each chapter's `id` and short name in order.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    items: [
      { id: "petys", label: "Petys" },
      { id: "tena", label: "TENA" },
      { id: "nosotras", label: "Nosotras" },
    ],
  },
});
