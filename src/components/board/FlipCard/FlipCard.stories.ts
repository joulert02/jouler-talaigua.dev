import preview from "../../../../.storybook/preview";
import FlipCard from "./FlipCard.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Board/FlipCard",
  component: Example,
  ...exampleMeta(FlipCard),
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A two-sided card: the default slot is the face (a PhotoPrint, Ticket, ObjectCard…) and the `back` slot what a click or Enter reveals, usually a DeskNote. It is a toggle button (`aria-pressed`) named by `label` and described by its back. A photo placed straight in the back (an `<Image>`) is cropped to fill it. The stories render example files; Show code shows each file.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "board/FlipCard/examples/FlipCardExample.astro" },
  parameters: {
    docs: { description: { story: "Click or press Enter to flip the card; again to turn it back." } },
  },
});

export const PhotoBack = meta.story({
  name: "Photo back",
  args: { example: "board/FlipCard/examples/FlipCardPhotoBackExample.astro" },
  parameters: {
    docs: { description: { story: "The back is a photo instead of a note: flip the card to see it." } },
  },
});
