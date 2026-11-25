import preview from "../../../../../.storybook/preview";
import ArchitecturePlayground from "./ArchitecturePlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/MercadoLibreLists/ArchitecturePlayground",
  component: ArchitecturePlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 04 of the Mercado Libre case: how a BFF builds a card. It calls several APIs, takes what the card needs, returns one response and the screen shows it. Three columns on desktop, one step at a time on phones; Play walks the steps. The data is illustrative. Copy and cards in `architecture.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  parameters: {
    docs: { description: { story: "Choose a card, or press Play; a choice during a run stops it." } },
  },
});
