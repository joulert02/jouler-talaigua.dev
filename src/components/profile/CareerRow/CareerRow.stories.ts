import preview from "../../../../.storybook/preview";
import CareerRow from "./CareerRow.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Profile/CareerRow",
  component: Example,
  ...exampleMeta(CareerRow),
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "One career entry: company, role in the current language and years. Private to CareerPath; documented here to tune it on its own.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "profile/CareerRow/examples/CareerRowExample.astro" },
  parameters: {
    docs: {
      description: { story: "The first entry of `careerItems` in `src/config/profile.ts`, inside its list." },
    },
  },
});
