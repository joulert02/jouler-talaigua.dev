import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import BoardHint from "./BoardHint.astro";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Board/BoardHint",
  component: BoardHint,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'The board\'s hint pill, centered above the Dock from 901px wide (hidden below): "Drag to explore", with a short bounce that reduced motion removes. It listens to the desk\'s `desk-edge` events: at the bottom edge it reads "Keep going down for Work ↓"; a drag held there (2.6s, 1.3s with reduced motion) or about four more mouse notches down fill it, and a full pill goes to `href`; letting go or pausing empties it. Alone it only shows its resting state: try the whole hand-off in the Board story.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { href: "/work/" },
  parameters: {
    docs: { description: { story: "The resting pill. Widen the window past 900px if it does not show." } },
  },
});
