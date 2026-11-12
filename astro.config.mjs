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
  vite: {
    // The OG image route renders with @resvg/resvg-js, a native (.node) module: it runs only on the server, and
    // the dev dependency optimizer cannot bundle it ("UNLOADABLE_DEPENDENCY").
    optimizeDeps: { exclude: ["@resvg/resvg-js"] },
  },
});
