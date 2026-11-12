import preview from "../../../../.storybook/preview";
import { storyLinks } from "../../../../.storybook/links";
import JotaMark from "./JotaMark.astro";
import { brand } from "../../../config/profile";

const meta = preview.meta({
  title: "Components/UI/JotaMark",
  component: JotaMark,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'The JOTA brand mark. It links to the home page of the current language, and its accessible name is the full name ("Jouler Talaigua, Home"), not the letters "JOTA".',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { data: storyLinks(brand) },
  parameters: { docs: { description: { story: "Edit `data` to try another mark or label." } } },
});
