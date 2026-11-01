import { defaultLang, languages } from "../src/i18n/ui";

// Opt-in language control for stories whose copy is worth reviewing in both languages. Spread it into the meta:
// `preview.meta({ ...withLocale, ... })`. The project render (preview.js) takes `locale` out of the args and hands it to
// StoryRoot, which sets it as the page language, so the component reads it with getLang(Astro) like on the site.
export const withLocale = {
  args: { locale: defaultLang },
  argTypes: {
    locale: {
      description: "Page language; on the site the route sets it (`/` or `/es/`).",
      control: "inline-radio",
      options: Object.keys(languages),
      table: { category: "Story" },
    },
  },
};
