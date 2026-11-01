import preview from "../../../../.storybook/preview";
import { storyLinks } from "../../../../.storybook/links";
import { withLocale } from "../../../../.storybook/locale";
import LanguageSwitch from "./LanguageSwitch.astro";
import { languageItems } from "../../../config/profile";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Layout/LanguageSwitch",
  component: LanguageSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'Switches the page between languages, with the v11 segmented pill. The current language is plain text marked `aria-current`; each other one is a link to this page in that language, labelled in that language ("Leer en español") with `lang` and `hreflang`, so screen readers pronounce it correctly.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { items: storyLinks(languageItems) },
  parameters: {
    docs: { description: { story: "Switch `locale` to move the current language." } },
  },
});
