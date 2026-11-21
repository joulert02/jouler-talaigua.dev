import preview from "../../../../../.storybook/preview";
import JotaPet from "./JotaPet.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/JotaPet",
  component: JotaPet,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "420px" },
      description: {
        component:
          "JOTA Pet as a desk object: a blob in the accent color whose eyes follow the pointer. Each press shows the next of its `lines` in a speech bubble, in a loop. Left alone for nine seconds it closes its eyes and naps (the bubble closes too); the pointer coming near wakes it.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Talk to JOTA Pet",
    lines: [
      "Hi. I'm JOTA Pet.",
      "On Jouler's Mac I float over the screen and keep today's plan in order.",
      "He built me in November 2026 to stay on plan. It mostly works.",
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Move the pointer around it, press it for each line, then leave it alone to see it nap.",
      },
    },
  },
});
