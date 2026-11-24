import preview from "../../../../../.storybook/preview";
import LaunchPost from "./LaunchPost.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BancolombiaSvp/LaunchPost",
  component: LaunchPost,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 04 of the Bancolombia case, in the product's full story: the owner's LinkedIn post about the launch, as LinkedIn's official embed with a link that opens it there. The iframe is lazy: inside the closed story nothing loads from LinkedIn until the reader opens it. Copy in `launchPost.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
