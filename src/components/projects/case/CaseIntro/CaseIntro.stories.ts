import preview from "../../../../../.storybook/preview";
import CaseIntro from "./CaseIntro.astro";
import Example from "../../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Projects/Case/CaseIntro",
  component: Example,
  ...exampleMeta(CaseIntro),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The case intro (v11 intro-c, the primary intro): the heading, the owner's text and quote on the left and the media on the right (a CaseVideo or a photo in the `media` slot); one column on phones, text first. It brings the floating “See what we built” invitation, which smooth-scrolls to the chapter named in `next` and leaves once the reader scrolls.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "projects/case/CaseIntro/examples/CaseIntroExample.astro" },
  parameters: {
    docs: {
      description: {
        story: "Scroll the canvas: the floating invitation fades out and leaves the Tab order.",
      },
    },
  },
});
