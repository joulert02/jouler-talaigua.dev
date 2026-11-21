import preview from "../../../../../.storybook/preview";
import DeskLamp from "./DeskLamp.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/DeskLamp",
  component: DeskLamp,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "480px" },
      description: {
        component:
          "A desk lamp whose cord switches the whole site between light and dark, with the same cookie as the Dock's theme toggle. Only the cord is a button (`aria-pressed` while the lights are off), so the lamp can be dragged by its body. The cone of light and the note (`title`, `text`) show in the dark theme. Each pull also dispatches `desk:lights` on the window with `detail.on`, which NarutoSticker listens to.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Pull the cord to switch between light and dark",
    title: "Lights out.",
    text: "The whole site has a dark theme. Pull again to switch back.",
  },
  parameters: {
    docs: {
      description: {
        story: "Pull the cord: the page goes dark and the lamp lights up. The toolbar theme resets it.",
      },
    },
  },
});
