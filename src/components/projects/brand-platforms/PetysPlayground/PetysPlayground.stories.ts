import preview from "../../../../../.storybook/preview";
import PetysPlayground from "./PetysPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BrandPlatforms/PetysPlayground",
  component: PetysPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 01 of Brand platforms: the live site's screenshots on desktop or phone, and a content change travelling from the CMS to the CDN. “Publish a change” lights each step of the rail, then a chip lands on the capture. Copy in `petys.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
