import preview from "../../../../../.storybook/preview";
import Passport from "./Passport.astro";

const codes = ["01", "03", "04", "05", "7A", "7B", "08", "09", "10", "11", "12", "13", "19"];

const meta = preview.meta({
  title: "Components/Board/Objects/Passport",
  component: Passport,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "420px" },
      description: {
        component:
          "A passport that keeps what the visitor found on the desk. It is a toggle (`aria-pressed`): pressing it swings the cover open on a page with one slot per entry in `stamps`; the ones marked `found` are stamped in ink, the rest stay as dashed circles. The cover shows the tally. Cover and paper keep their own colors in both themes. It only shows the stamps it is given: collecting them is the board's job.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Open the passport",
    cover: "PASSPORT",
    route: "MDE · MAD · VLC",
    stamps: codes.map((code, index) => ({ code, found: index < 5 })),
  },
  parameters: {
    docs: { description: { story: "Press the passport to open it: five of thirteen slots are stamped." } },
  },
});

export const Complete = meta.story({
  args: {
    label: "Open the passport",
    cover: "PASSPORT",
    route: "MDE · MAD · VLC",
    stamps: codes.map((code) => ({ code, found: true })),
    count: "All found",
  },
  parameters: {
    docs: {
      description: { story: "Every slot stamped, with its own `count` line instead of the tally." },
    },
  },
});
