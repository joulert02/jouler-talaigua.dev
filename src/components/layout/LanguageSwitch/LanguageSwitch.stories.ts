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
          "Switches the page between languages. Every option is a link to this page in that language, labelled in that language (\"Leer en español\") with `lang` and `hreflang`, so screen readers pronounce it correctly. The `pill` variant (v11) shows every language and marks the current one with `aria-current` (footer); `compact` is a single link to the other language, sized like the Dock's buttons, with the language's own name as tooltip.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { items: storyLinks(languageItems), variant: "pill" },
  argTypes: { variant: { control: "inline-radio", options: ["pill", "compact"] } },
  parameters: {
    docs: { description: { story: "Switch `locale` to move the current language." } },
  },
});

export const Compact = meta.story({
  args: { items: storyLinks(languageItems), variant: "compact" },
  parameters: {
    docs: {
      description: {
        story:
          "The Dock's switch: only the other language, with its name as tooltip. Switch `locale` to flip it.",
      },
    },
  },
});
