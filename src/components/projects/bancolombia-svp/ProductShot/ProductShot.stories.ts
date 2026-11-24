import preview from "../../../../../.storybook/preview";
import ProductShot from "./ProductShot.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BancolombiaSvp/ProductShot",
  component: ProductShot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 04 of the Bancolombia case: the live product as a screenshot in a browser window, with a ghost link to see it live. Copy in `productShot.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
