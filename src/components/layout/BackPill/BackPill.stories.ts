import preview from "../../../../.storybook/preview";
import BackPill from "./BackPill.astro";

const meta = preview.meta({
  title: "Components/Layout/BackPill",
  component: BackPill,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The back pill (v11): one definition for cases, the Notes index and note pages. A chevron disc, the label and a mono caption, hidden below 561px. It keeps `view-transition-name: case-back` between pages that share it. Case pages point it at the row the reader came from; when the reader just came from there, it goes Back, keeping their scroll.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { href: "/work/#row-caps-plus", label: "All work", caption: "Selected projects" },
});
