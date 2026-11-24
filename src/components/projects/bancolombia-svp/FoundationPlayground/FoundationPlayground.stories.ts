import preview from "../../../../../.storybook/preview";
import FoundationPlayground from "./FoundationPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BancolombiaSvp/FoundationPlayground",
  component: FoundationPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 01 of the Bancolombia case: the five steps that laid the micro-frontend foundation. Press a step or Back/Next; the board on the right fills in step by step and the current step is announced. On phones it is a slide: one challenge at a time with its piece (the login on the last), Back/Next or a swipe, and no board behind it. Copy in `foundation.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
