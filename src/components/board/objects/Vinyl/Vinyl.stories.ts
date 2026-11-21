import preview from "../../../../../.storybook/preview";
import Vinyl from "./Vinyl.astro";
import unicornio from "../../../../assets/covers/unicornio.jpg";
import moto from "../../../../assets/photos/desk-moto.jpg";

const meta = preview.meta({
  title: "Components/Board/Objects/Vinyl",
  component: Vinyl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A record in its sleeve (original abstract art with the song `title` and `artist`). It is a play toggle (`aria-pressed`, named \"Play {title} by {artist}\" unless `label` is given): pressing it slides the record out, spins it and shows a small equalizer; pressing again puts it back. Hover nudges the record out. `cover` swaps the abstract art for the record's real cover; the `sleeve` slot takes any other sleeve art (decorative, not interactive: it sits inside the button) and wins over both. With `spotify` (a Spotify URI) the press also opens Spotify's player at the bottom left (from 901px, centered between the screen's edge and the Dock), loaded only then; the record follows the player's play and pause. Sleeve and record keep their own colors in both themes; reduced motion shows the playing state without movement.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { title: "Unicornio", artist: "Nanpa Básico" },
  parameters: {
    docs: { description: { story: "Click or press Enter to play the record; again to stop it." } },
  },
});

export const Unicornio = meta.story({
  args: {
    title: "Unicornio",
    artist: "Nanpa Básico",
    cover: unicornio,
    // The whole album Unicornio.
    spotify: "spotify:album:4Ff07AMyi4ZUOORYUZpN9c",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The real cover and the album Unicornio on Spotify: press the record to open the player at the bottom left.",
      },
    },
  },
});

export const CustomSleeve = meta.story({
  name: "Custom sleeve",
  args: {
    title: "Unicornio",
    artist: "Nanpa Básico",
    slots: { sleeve: `<img src="${moto.src}" alt="" />` },
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `sleeve` slot replaces the cover with the record's own art, here a photo. It fills the sleeve and is cropped to the square.",
      },
    },
  },
});
