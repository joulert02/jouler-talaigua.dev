import preview from "../../../../.storybook/preview";
import BrowserFrame from "./BrowserFrame.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/UI/BrowserFrame",
  component: Example,
  ...exampleMeta(BrowserFrame),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A desktop browser window shared by the case studies (v11 `.pt-desk`): three dots and the address in the bar, the page in the slot. The bar is decorative; the content inside carries the description.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "ui/BrowserFrame/examples/BrowserFrameExample.astro" },
  parameters: { docs: { description: { story: "A capture of a live site inside the frame." } } },
});
