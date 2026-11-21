import preview from "../../../../../.storybook/preview";
import BinaryBonsai from "./BinaryBonsai.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/BinaryBonsai",
  component: BinaryBonsai,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "500px" },
      description: {
        component:
          "A bonsai that is a binary tree. It starts as a single node; each press grows one more level (3, 7, then 15 nodes) and the note counts them (`count`, with `{count}` replaced, over `text`). The press after the last level prunes it back to one node and closes the note. The tree keeps its own colors in both themes.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Grow the binary tree",
    count: "{count} nodes.",
    text: "Algorithms practice: I grow it one problem at a time. Press again to keep growing.",
  },
  parameters: {
    docs: {
      description: { story: "Press three times to grow the tree to 15 nodes, and once more to prune it." },
    },
  },
});
