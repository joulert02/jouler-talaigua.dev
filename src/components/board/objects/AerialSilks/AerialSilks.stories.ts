import preview from "../../../../../.storybook/preview";
import AerialSilks from "./AerialSilks.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/AerialSilks",
  component: AerialSilks,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "600px" },
      description: {
        component:
          "Aerial silks in the brand violet, hanging from a ring. It is a toggle (`aria-pressed`): pressing it brings a figure in, who gathers the fabric, opens it and climbs into a pose that sways on the rig; then the note (`title`, `text`) opens. Pressing again plays the sequence backwards and the fabric hangs alone. Presses during the sequence are ignored. The figure is a jointed rig blended between four key poses (`rig.js`). Reduced motion jumps between the hanging fabric and the pose, with no sway.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Play the aerial silks sequence",
    title: "Aerial silks.",
    text: "Where I stop thinking in numbers. Strength, patience and trusting the knot.",
  },
  parameters: {
    docs: {
      description: { story: "Press the silks and watch the three moves; press again to come down." },
    },
  },
});
