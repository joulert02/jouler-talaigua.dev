import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import AboutMe from "./AboutMe.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Profile/AboutMe",
  component: Example,
  ...exampleMeta(AboutMe, withLocale),
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
  args: { example: "profile/AboutMe/examples/AboutMeExample.astro" },
  parameters: {
    docs: { description: { story: "Switch `locale` to review the copy in both languages." } },
  },
});
