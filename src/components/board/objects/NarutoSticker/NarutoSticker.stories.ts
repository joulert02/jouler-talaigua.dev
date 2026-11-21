import preview from "../../../../../.storybook/preview";
import NarutoSticker from "./NarutoSticker.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/NarutoSticker",
  component: NarutoSticker,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "560px" },
      description: {
        component:
          "An animated die-cut sticker of Naruto, from a community fan sprite sheet; `credit` names the character's owners and the sprite's artist under the note. He starts eating ramen and each press changes what he does (wave, jump, run, code, read, eat) and opens the note. He sleeps only while the lights are off: he listens to `desk:lights` on the window, which DeskLamp dispatches, and a page that loads in the dark finds him asleep. Presses do nothing while he sleeps. Reduced motion shows a still frame.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Naruto, my favorite anime: press to change what he is doing",
    title: "Favorite anime: Naruto.",
    text: "Shippuden is my favorite era. Go watch it.",
    credit:
      "Naruto © Masashi Kishimoto / Shueisha. Fan sprite by IhakaUtu, from the codex-pets.net community gallery.",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Press him to cycle through his actions. To put him to sleep, run `window.dispatchEvent(new CustomEvent("desk:lights", { detail: { on: false } }))` in the console, or pull the DeskLamp cord on the board.',
      },
    },
  },
});
