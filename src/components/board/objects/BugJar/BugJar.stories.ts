import preview from "../../../../../.storybook/preview";
import BugJar from "./BugJar.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/BugJar",
  component: BugJar,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "460px" },
      description: {
        component:
          "A glass jar (handwritten `name` on its label) with a bug walking beside it. The bug is a button (`catchLabel`) that can be caught two ways. Pressing it: the lid twists off, the bug jumps into the jar and the lid closes. Picking it up: it follows the pointer, the lid opens by itself when the bug comes near the jar, and dropping it there lets it fall in; dropped anywhere else, it hops back beside the jar. Once it is inside, the note (`title`, `text`) opens and the jar is the button (`releaseLabel`): pressing it opens the lid and the bug jumps back out. Only one of the two is enabled at a time, and focus follows. The bug walks about 100px to the right of the jar: leave that room free. Reduced motion moves the bug without the walk, the jump or the lid's unscrewing.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    name: "bugs",
    catchLabel: "Catch the bug",
    releaseLabel: "Bug jar: open it to let the bug go",
    title: "Caught.",
    text: "I started in QA in 2019, breaking other people's code. Press the jar to let it go.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drag the bug towards the jar: the lid opens as it gets near, and you can drop it in. Or just press the bug. Press the jar to let it go.",
      },
    },
  },
});
