import preview from "../../../../../.storybook/preview";
import TeamPhoto from "./TeamPhoto.astro";

const meta = preview.meta({
  title: "Components/Projects/MercadoLibreLists/TeamPhoto",
  component: TeamPhoto,
  tags: ["autodocs"],
  args: { alt: "The Mercado Libre team at a company event, in front of the event backdrop." },
  parameters: {
    layout: "padded",
    docs: { description: { component: "The intro's team photo: a square crop inside a white frame." } },
  },
});
export default meta;

export const Playground = meta.story({});
