import preview from "../../../../../.storybook/preview";
import TeamMap from "./TeamMap.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BancolombiaSvp/TeamMap",
  component: TeamMap,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 03 of the Bancolombia case: how the team grew, as rows on the layout's quarters (the moment in mono, then the count, what the team was and one line). The rows rise in as they come into view and the second count runs from 1 to 20; with reduced motion they are simply there. Copy in `teamMap.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
