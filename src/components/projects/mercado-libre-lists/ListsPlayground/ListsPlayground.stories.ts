import preview from "../../../../../.storybook/preview";
import ListsPlayground from "./ListsPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/MercadoLibreLists/ListsPlayground",
  component: ListsPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 01 of Mercado Libre case: interactive recreation comparing Before (legacy flat heart favorites) and After (curated gift and personal lists with add-to-list flow). Copy in `lists.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
