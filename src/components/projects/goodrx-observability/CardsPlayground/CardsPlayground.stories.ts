import preview from "../../../../../.storybook/preview";
import CardsPlayground from "./CardsPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/GoodRxObservability/CardsPlayground",
  component: CardsPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 05 of the GoodRx case: a recreation of the home page's health cards in GoodRx's palette, with placeholder content. Turn on “Show the component” to outline every card and name its variant: three layouts, one component. Copy and cards in `cards.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
