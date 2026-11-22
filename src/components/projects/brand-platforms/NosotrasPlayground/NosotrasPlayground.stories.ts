import preview from "../../../../../.storybook/preview";
import NosotrasPlayground from "./NosotrasPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BrandPlatforms/NosotrasPlayground",
  component: NosotrasPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 03 of Brand platforms: a recreation of the Nosotras “Estoy creciendo” page from the designer's exported layers. Choosing a character rotates the cast and recolours its world; on the phone the arrow walks the worlds. The site stays in Spanish; the frame follows the page. Copy and stage data in `nosotras.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
