import preview from "../../../../.storybook/preview";
import { storyLinks } from "../../../../.storybook/links";
import { withLocale } from "../../../../.storybook/locale";
import FooterStory from "./stories/FooterStory.astro";
import { footer } from "../../../config/profile";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Layout/Footer",
  component: FooterStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Site footer: link columns, wordmark and origin line, all from `footer` in `src/config/profile.ts`. The email row has a `copy-email` slot; here and on the site it holds CopyEmail.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { data: storyLinks(footer) },
  parameters: {
    docs: {
      description: {
        story: "Edit `data` to try other columns or copy, and `locale` to review it in Spanish.",
      },
    },
  },
});
