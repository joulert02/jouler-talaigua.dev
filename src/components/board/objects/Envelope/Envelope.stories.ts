import preview from "../../../../../.storybook/preview";
import Envelope from "./Envelope.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/Envelope",
  component: Envelope,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The letter object: a sealed envelope with a handwritten line (Caveat). On its own hover, or keyboard focus on whatever wraps it (a link), the flap opens and a letter peeks out; reduced motion keeps it closed.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { to: "for you" },
  parameters: {
    docs: { description: { story: "Edit the handwritten line." } },
  },
});
