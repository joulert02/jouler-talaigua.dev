import preview from "../../../../../.storybook/preview";
import Vinyl from "./Vinyl.astro";
import unicornio from "../../../../assets/covers/unicornio.png";

const meta = preview.meta({
  title: "Components/Board/Objects/Vinyl",
  component: Vinyl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A record in its sleeve (original abstract art with the song `title` and `artist`). It is a play toggle (`aria-pressed`, named \"Play {title} by {artist}\" unless `label` is given): pressing it slides the record out, spins it and shows a small equalizer; pressing again puts it back. Hover nudges the record out. `cover` swaps the abstract art for the record's real cover. With `spotify` (a Spotify URI) the press also opens Spotify's player in the bottom-right corner, loaded only then; the record follows the player's play and pause. Sleeve and record keep their own colors in both themes; reduced motion shows the playing state without movement.",
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
    // "Buena Energía", from the album Unicornio.
    spotify: "spotify:track:4v0QUhYPnfCgQXCGGQv7bW",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The real cover and the song Buena Energía on Spotify: press the record to open the player in the bottom-right corner.",
      },
    },
  },
});
