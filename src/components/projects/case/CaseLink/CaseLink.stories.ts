import preview from "../../../../../.storybook/preview";
import CaseLink from "./CaseLink.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/Case/CaseLink",
  component: CaseLink,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A link in case copy: WorkCase renders every Markdown link in a case's MDX with it. A full URL leaves the site, so it opens in a new tab with a small arrow and a spoken “(opens in a new tab)”; a site path stays in the tab.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { href: "https://www.tena.com.co/", slots: { default: "TENA" } },
});
