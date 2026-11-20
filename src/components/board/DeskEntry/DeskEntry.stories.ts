import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import DeskEntry from "./DeskEntry.astro";
import talk from "../../../assets/photos/desk-talk.jpg";
import unicornio from "../../../assets/covers/unicornio.jpg";
import moto from "../../../assets/photos/desk-moto.jpg";
import frame from "../../../assets/photos/portrait-frame.jpg";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Board/DeskEntry",
  component: DeskEntry,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The way into the desk on phones, under the identity card (the card comes first; the desk is secondary): prints from the desk peek out from beneath the card over a button that opens the desk full screen (`data-desk-open` with the Desk's id). The prints slide out once on load and a little further when pressed. Hidden from 901px, where the desk is already on screen: narrow the window to see it, and try it for real in the Board story.",
      },
    },
  },
  argTypes: { photos: { control: false } },
});
export default meta;

export const Playground = meta.story({
  args: {
    desk: "desk",
    title: "Explore my desk",
    meta: "Photos, a ticket, a record… tap to flip them",
    photos: [talk, unicornio, moto, frame],
  },
  parameters: {
    docs: { description: { story: "Alone it opens nothing: there is no desk with that id in this story." } },
  },
});
