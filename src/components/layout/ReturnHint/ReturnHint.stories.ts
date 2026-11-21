import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import ReturnHint from "./ReturnHint.astro";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Layout/ReturnHint",
  component: ReturnHint,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'The way back to the Home, mirroring the board\'s hint pill: on a page opened from the Home, scrolling up past the top slides it in from the top edge ("Keep going up for Home ↑") and fills it over about four mouse notches; a pause empties it. Full, it keeps the arrow rising while the Home loads, then the page goes back. Base.astro drives it; on the site it stays hidden until a pull starts. `preview` shows it part full here.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { preview: 0.5 },
});
