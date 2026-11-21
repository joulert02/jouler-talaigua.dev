import preview from "../../../../../.storybook/preview";
import PunchingBag from "./PunchingBag.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/PunchingBag",
  component: PunchingBag,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the bag swings and opens a note beyond its own box, which
    // the inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "560px" },
      description: {
        component:
          "A hanging punching bag with a ten-second round. The first hit starts the clock; every hit scores a point and swings the bag away from the side that was hit, and three quick hits in a row start a combo worth double. The scoreboard under the bag follows the round (`board.start`, `board.score`, `board.combo`) with a bar for the time left. When time runs out, the note shows `board.result` (with `{score}` and `{best}`) over `text`, and the next hit starts a new round. The best score lives in the page only: nothing is saved. Reduced motion keeps the bag still and counts the same.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Punching bag: hit it",
    board: {
      start: "Hit the bag to start",
      score: "{score} pts",
      combo: "{score} pts · combo ×{streak}",
      result: "{score} points · best {best}",
    },
    text: "I built Stream Fighters, a web boxing game played live at an event in November 2026.",
  },
  parameters: {
    docs: {
      description: {
        story: "Hit the bag as fast as you can for ten seconds: quick hits in a row count double.",
      },
    },
  },
});
