// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// TODO(decision): final domain — see docs/discovery brief.
export default defineConfig({
  site: "https://jouler.dev",
  integrations: [react(), mdx(), sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } } })],
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
});
