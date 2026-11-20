import preview from "../../../../../.storybook/preview";
import PhotoPrint from "./PhotoPrint.astro";
import moto from "../../../../assets/photos/desk-moto.jpg";

const meta = preview.meta({
  title: "Components/Board/Objects/PhotoPrint",
  component: PhotoPrint,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A printed photo on the desk: white border, the photo cropped to 150 × 190 (served at 1x and 2x by `astro:assets`) and a one-line caption. Used as the face of a FlipCard.",
      },
    },
  },
  argTypes: { image: { control: false } },
});
export default meta;

export const Playground = meta.story({
  args: {
    image: moto,
    alt: "Jouler in riding gear next to his motorbike on a wet mountain road",
    caption: "Road trip · Colombia",
  },
  parameters: {
    docs: { description: { story: "Edit the caption to check how a long one is cut." } },
  },
});
