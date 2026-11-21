import preview from "../../../../../.storybook/preview";
import Envelope from "./Envelope.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/Envelope",
  component: Envelope,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the flap and the letter open above the envelope, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "420px" },
      description: {
        component:
          "The letter object: a sealed envelope with a handwritten line (`to`, in Caveat). It is a toggle button (`aria-pressed`, named by `label`): Tab reaches it, and a click, Enter or Space turns the flap back and lets a letter peek out; pressing again closes it. Hovering gives the same peek without pressing. With reduced motion nothing animates: hovering leaves it sealed and pressing opens it at once.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { to: "for you", label: "Open the letter" },
  parameters: {
    docs: {
      description: {
        story: "Press the envelope, or focus it with Tab and press Enter, to open and close it.",
      },
    },
  },
});
