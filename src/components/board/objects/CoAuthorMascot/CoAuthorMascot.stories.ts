import preview from "../../../../../.storybook/preview";
import CoAuthorMascot from "./CoAuthorMascot.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/CoAuthorMascot",
  component: CoAuthorMascot,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "440px" },
      description: {
        component:
          "The pixel mascot of the coding agent that co-authors the site, with its `role` on a chip underneath. It idles in two-frame steps and blinks; each press makes it hop and show the next of its `lines`, in a loop. The mascot keeps its own colors in both themes; reduced motion keeps it still. The mascot is Anthropic's: check their brand guidelines before it is published.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "The co-author of this site",
    role: "Co-author",
    lines: [
      { title: "Co-author.", text: "Jouler directs and decides; I draft, build and check." },
      { title: "It is on the record.", text: "Every commit I work on carries a Co-Authored-By line." },
      {
        title: "This desk too.",
        text: "The objects around you started as proposals we went through together.",
      },
    ],
  },
  parameters: {
    docs: { description: { story: "Press the mascot: it hops and says the next line." } },
  },
});
