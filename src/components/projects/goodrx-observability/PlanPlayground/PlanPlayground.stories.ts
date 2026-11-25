import preview from "../../../../../.storybook/preview";
import PlanPlayground from "./PlanPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/GoodRxObservability/PlanPlayground",
  component: PlanPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 01 of the GoodRx case: the four questions of the migration plan as a checklist. Ticking all four shows and announces “Plan ready”; the primary button ticks them in turn, then starts over. Copy in `plan.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
