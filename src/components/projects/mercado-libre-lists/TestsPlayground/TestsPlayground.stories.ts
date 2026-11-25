import preview from "../../../../../.storybook/preview";
import TestsPlayground from "./TestsPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/MercadoLibreLists/TestsPlayground",
  component: TestsPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 02 of the Mercado Libre case: two stories, unit and end-to-end, each with an example written with Given / When / Then (those words stay in English). Only the unit run moves the coverage bar. Both show from 720px; phones show one at a time with a switch, with the run row above the example. Copy in `tests.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
