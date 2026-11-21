import preview from "../../../../../.storybook/preview";
import CoffeeGrinder from "./CoffeeGrinder.astro";

const notes = {
  empty: { title: "The grinder is empty.", text: "Drop the bag of beans on it first." },
  beans: { title: "Beans in.", text: "Press and hold the grinder." },
  ground: { title: "Ground and ready.", text: "Now pour it over the dripper." },
};

const meta = preview.meta({
  title: "Components/Board/Objects/CoffeeGrinder",
  component: CoffeeGrinder,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens a note beyond its own box, which the inline
    // docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "440px" },
      description: {
        component:
          'A hand grinder, the second step of the coffee objects. It takes beans when CoffeeBeans dispatches `desk:coffee` with `detail.step: "beans"`, or starts with them (`loaded`). With beans in the hopper, pressing and holding it (pointer, Space or Enter) turns the crank and fills the ring on its body; letting go keeps what is already ground. When the ring closes it dispatches `detail.step: "ground"`, which PourOver shows as a bed of coffee, and the hopper is empty again. `notes` are what it says when pressed while empty, once it has beans, and when the coffee is ground. Reduced motion fills the ring without the crank or the rattle.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { label: "Coffee grinder: press and hold to grind", loaded: true, notes },
  parameters: {
    docs: {
      description: {
        story:
          "Press and hold the grinder until the ring closes. Press it again, now empty, to see its hint.",
      },
    },
  },
});
