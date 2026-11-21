import preview from "../../../../../.storybook/preview";
import WorkTag from "./WorkTag.astro";

const meta = preview.meta({
  title: "Components/Projects/WorkList/WorkTag",
  component: WorkTag,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A label beside a project\'s title in WorkList, also shown on the preview\'s status tile. Two tones: `muted` (grey) for a case\'s state ("Coming soon", "Under construction") and `accent` (violet) for a kind of project worth noticing ("Personal"). Private to WorkList.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { tag: { label: "Coming soon", tone: "muted" } },
  parameters: {
    docs: {
      description: { story: "A case's state, in grey. Switch `tone` to compare it with the violet one." },
    },
  },
});

export const Personal = meta.story({
  args: { tag: { label: "Personal", tone: "accent" } },
  parameters: {
    docs: {
      description: {
        story: "Jouler's own products: violet, so they stand out from client work in the list.",
      },
    },
  },
});
