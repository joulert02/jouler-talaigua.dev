import preview from "../../../../../.storybook/preview";
import RocketCard from "./RocketCard.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/RocketCard",
  component: RocketCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The roadmap object: a rocket with a title and a line of text. Its own hover, or keyboard focus on whatever wraps it (see DeskObject’s “With a link” story), lifts the rocket and lights its flame; reduced motion keeps it still.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { title: "Roadmap", text: "Senior → Staff Engineer\nstep by step" },
  parameters: {
    docs: { description: { story: "Edit the title and the line under it." } },
  },
});
