import preview from "../../../../../.storybook/preview";
import TenaPlayground from "./TenaPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BrandPlatforms/TenaPlayground",
  component: TenaPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 02 of Brand platforms: a recreation of TENA's shipped registration (user types, details, A− / A+) and Academy (one view per format), in TENA's light palette in both themes. The titles, dates, speaker and images inside it are placeholder test content, not TENA's. Nothing is sent or stored. Copy in `tena.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
