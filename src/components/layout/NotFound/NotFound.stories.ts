import preview from "../../../../.storybook/preview";
import NotFound from "./NotFound.astro";
import { withLocale } from "../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Layout/NotFound",
  component: NotFound,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "404 Not Found error view in English and Spanish, minimal and typographic, with a clear escape path back to Home.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
