import preview from "../../../../.storybook/preview";
import { storyLinks } from "../../../../.storybook/links";
import { withLocale } from "../../../../.storybook/locale";
import IdentityCard from "./IdentityCard.astro";
import { identity } from "../../../config/profile";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Profile/IdentityCard",
  component: IdentityCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The introduction on the Home: brand mark, name, role, one sentence, the two main actions, profile links and the career path. All content comes from `identity` in `src/config/profile.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { data: storyLinks(identity) },
  parameters: {
    docs: { description: { story: "Edit `data`, or switch `locale`, to review the copy." } },
  },
});
