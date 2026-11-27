import preview from "../../../../../.storybook/preview";
import TalksStack from "./TalksStack.astro";
import talk1 from "../../../../assets/talks/talk-01.jpg";
import talk2 from "../../../../assets/talks/talk-02.jpg";
import talk3 from "../../../../assets/talks/talk-03.jpg";
import talk4 from "../../../../assets/talks/talk-04.jpg";
import talk5 from "../../../../assets/talks/talk-05.jpg";

const meta = preview.meta({
  title: "Components/Board/Objects/TalksStack",
  component: TalksStack,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "460px" },
      description: {
        component:
          'A stack of photo prints from talks: each entry of `photos` is an `image` and a `caption`, the first one on top. Pressing the stack sends the top print to the bottom and shows the next, in a loop. The photos are decorative inside the button (`alt=""`); the caption is the text. Prints keep their white border in both themes.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Talks: flip through the photos",
    // Sample captions: the place and year of each talk are not confirmed yet.
    photos: [talk1, talk2, talk3, talk4, talk5].map((image, index) => ({
      image,
      caption: `Talk ${index + 1} of 5`,
    })),
  },
  parameters: {
    docs: { description: { story: "Press the stack to flip through the five prints." } },
  },
});
