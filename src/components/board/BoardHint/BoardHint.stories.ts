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
          'The board\'s hint pill, centered above the Dock from 901px wide (hidden below): "Drag to explore", with a short bounce that reduced motion removes. It listens to the desk\'s `desk-edge` events: at the bottom edge it reads "Keep dragging for Work ↓", a drag held there fills it (2.6s, 1.3s with reduced motion) and a full pill goes to `href`; letting go empties it. Alone it only shows its resting state: try the whole hand-off in the Board story.',
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
