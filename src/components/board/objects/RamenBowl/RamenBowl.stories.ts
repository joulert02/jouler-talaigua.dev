import preview from "../../../../../.storybook/preview";
import RamenBowl from "./RamenBowl.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/RamenBowl",
  component: RamenBowl,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "460px" },
      description: {
        component:
          "A steaming bowl of ramen. Each press lifts noodles with the chopsticks and lowers the soup; the note counts the slurps left (`eating.one` and `eating.other`, with `{left}` replaced) and after three shows `empty`. One more press serves another bowl. The bowl keeps its own colors in both themes.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Bowl of ramen: slurp it",
    eating: {
      one: { title: "Itadakimasu.", text: "{left} more slurp to go." },
      other: { title: "Itadakimasu.", text: "{left} more slurps to go." },
    },
    empty: { title: "Empty.", text: "Ichiraku would be proud. Press for another bowl." },
  },
  parameters: {
    docs: { description: { story: "Press three times to finish the bowl, and once more to refill it." } },
  },
});
