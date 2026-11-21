import preview from "../../../../../.storybook/preview";
import CoffeeBeans from "./CoffeeBeans.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/CoffeeBeans",
  component: CoffeeBeans,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the bag tips beyond its own box, which the inline docs story
    // would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "360px" },
      description: {
        component:
          'A kraft bag of coffee beans, the first step of the coffee objects. Dropping it on a CoffeeGrinder on the desk, or pressing it, tips the bag, a few beans fall and it dispatches `desk:coffee` on the window with `detail.step: "beans"`; any CoffeeGrinder on the page takes them. After a drop the bag goes back to where it was picked up. Alone in this story it only tips: there is no grinder to load. The bag keeps its own colors in both themes.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { label: "Bag of coffee beans: pour them into the grinder" },
  parameters: {
    docs: { description: { story: "Press the bag: it tips and a few beans fall." } },
  },
});
