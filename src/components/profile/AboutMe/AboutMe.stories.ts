import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import StoryAboutMe from "./stories/StoryAboutMe.astro";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Profile/AboutMe",
  component: StoryAboutMe,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'The "More about me" view inside the IdentityCard: a Back control, a heading and the Markdown from `src/content/pages/{en,es}/more-about-me.md` in its slot. The card of its own page (`/more-about-me/`, `/es/more-about-me/`): the Home\'s IdentityCard morphs into it with a cross-document view transition. Back links to the Home and the page starts with the Dock away.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  parameters: { docs: { description: { story: "Switch `locale` to review the copy in both languages." } } },
});
