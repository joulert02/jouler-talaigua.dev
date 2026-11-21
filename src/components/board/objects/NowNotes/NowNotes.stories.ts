import preview from "../../../../../.storybook/preview";
import NowNotes from "./NowNotes.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/NowNotes",
  component: NowNotes,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "420px" },
      description: {
        component:
          "A pad of sticky notes with what is being learned now: each entry of `notes` is a handwritten `text` and a small `tag`, the first one on top. Pressing the pad peels the top note away and shows the next; the peeled note goes to the bottom, so the pad loops. The paper keeps its own colors in both themes.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Peel the top note to see what I am learning now",
    notes: [
      { text: "Backend depth: Java & Spring Boot", tag: "NOW · 1/4" },
      { text: "Algorithms: NeetCode 150", tag: "NOW · 2/4" },
      { text: "English, on the way to B2", tag: "NOW · 3/4" },
      { text: "Learning to draw", tag: "NOW · 4/4" },
    ],
  },
  parameters: {
    docs: {
      description: { story: "Press the pad to peel one note after another; after the last it starts over." },
    },
  },
});
