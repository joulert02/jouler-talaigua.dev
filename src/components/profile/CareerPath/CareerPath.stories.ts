import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import CareerPath from "./CareerPath.astro";
import { careerItems } from "../../../config/profile";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Profile/CareerPath",
  component: CareerPath,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Ordered list of career entries, from `careerItems` in `src/config/profile.ts`, most recent first.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { items: careerItems },
  parameters: {
    docs: {
      description: {
        story:
          "Edit `items` to add, remove or reorder entries; switch `locale` to read the roles in Spanish.",
      },
    },
  },
});
