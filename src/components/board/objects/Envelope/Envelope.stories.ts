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
          "The letter object: a sealed envelope with a handwritten line (`to`, in Caveat). It is a link to `href`, named by `label`: a click or Enter turns the flap back, lets a letter peek out and then opens the page. Where the pointer hovers, hovering gives the same peek; on a touch screen only a tap opens it. With reduced motion nothing animates: hovering leaves it sealed and pressing opens the page at once.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { to: "for you", label: "Open the letter: more about me", href: "#letter" },
  parameters: {
    docs: {
      description: {
        story: "Press the envelope, or focus it with Tab and press Enter, to open it.",
      },
    },
  },
});
