import preview from "../../../../.storybook/preview";
import CareerRowStory from "./stories/CareerRowStory.astro";
import { careerItems } from "../../../config/profile";

const meta = preview.meta({
  title: "Components/Profile/CareerRow",
  component: CareerRowStory,
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
  args: { item: careerItems[0] },
  parameters: { docs: { description: { story: "Edit `item` to try long names or roles." } } },
});
