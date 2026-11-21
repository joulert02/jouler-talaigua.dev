import preview from "../../../../../.storybook/preview";
import PourOver from "./PourOver.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/PourOver",
  component: PourOver,
  tags: ["autodocs"],
  argTypes: { pour: { control: "inline-radio", options: ["press", "hold"] } },
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "460px" },
      description: {
        component:
          "A V60 dripper over a glass cup. Pouring brings the kettle in, pours and fills the cup; when the cup is full, steam rises and the note (`title`, `text`) opens under it, and one more press empties it. `pour` sets how it fills: `press` pours the whole cup on one press, and `hold` pours only while the button is held (pointer, Space or Enter), so the visitor brews it; letting go takes the kettle away and the coffee stays where it was. It also listens to `desk:coffee` on the window: when CoffeeGrinder announces ground coffee, a bed of coffee shows in the dripper. Coffee and water keep their own colors in both themes; reduced motion fills the cup at once on a press.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Brew a V60 coffee",
    pour: "press",
    title: "V60, every morning.",
    text: "I grew up in coffee country and brew specialty coffee at home. If we ever meet, the coffee is on me.",
  },
  parameters: {
    docs: {
      description: { story: "Press the dripper and wait for the cup to fill; press again to empty it." },
    },
  },
});

export const HoldToPour = meta.story({
  name: "Hold to pour",
  args: {
    label: "Brew a V60 coffee: press and hold to pour",
    pour: "hold",
    title: "V60, every morning.",
    text: "I grew up in coffee country and brew specialty coffee at home. If we ever meet, the coffee is on me.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Press and hold the dripper: the cup fills only while you hold. Let go and hold again to finish it.",
      },
    },
  },
});

export const NeedsGroundCoffee = meta.story({
  name: "Needs ground coffee",
  args: {
    label: "Brew a V60 coffee: press and hold to pour",
    pour: "hold",
    title: "Well done!",
    text: "Now you know how to brew a V60.",
    recipe: {
      title: "A V60 in three steps.",
      text: "1. Pour the beans into the grinder. 2. Hold the grinder to grind them. 3. Hold the dripper to pour the water.",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "With a `recipe` the dripper only brews ground coffee. Alone, as here, a press opens the recipe and nothing pours; next to a CoffeeBeans bag and a CoffeeGrinder, grinding hands the coffee over and the hold pours.",
      },
    },
  },
});
