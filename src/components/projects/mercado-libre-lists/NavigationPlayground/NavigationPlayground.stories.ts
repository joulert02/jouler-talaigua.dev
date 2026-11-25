import preview from "../../../../../.storybook/preview";
import NavigationPlayground from "./NavigationPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/MercadoLibreLists/NavigationPlayground",
  component: NavigationPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 03 of Mercado Libre case: navigation simulation comparing page-based navigation (reloads from top on back) with stack-based navigation (preserves scroll position and loaded products). Copy in `navigation.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
