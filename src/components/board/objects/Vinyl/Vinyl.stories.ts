import preview from "../../../../../.storybook/preview";
import Vinyl from "./Vinyl.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/Vinyl",
  component: Vinyl,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'A record in its sleeve (original abstract art with the song `title` and `artist`). It is a play toggle (`aria-pressed`, named "Play {title} by {artist}" unless `label` is given): pressing it slides the record out, spins it and shows a small equalizer; pressing again puts it back. Hover nudges the record out. No audio. Sleeve and record keep their own colors in both themes; reduced motion shows the playing state without movement.',
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
