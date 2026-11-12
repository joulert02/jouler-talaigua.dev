// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// TODO(decision): final domain — see docs/discovery brief.
export default defineConfig({
  site: "https://jouler.dev",
  integrations: [react(), mdx(), sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } } })],
  // Self-hosted at build time; <Font /> in Base.astro emits the @font-face rules, metric-adjusted fallbacks and preload.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Onest",
      cssVariable: "--font-sans",
      weights: [300, 400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      formats: ["woff2"],
      fallbacks: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
      weights: [400, 500],
      styles: ["normal"],
      subsets: ["latin"],
      formats: ["woff2"],
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Caveat",
      cssVariable: "--font-hand",
      weights: [500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      formats: ["woff2"],
      fallbacks: ["Segoe Print", "Bradley Hand", "cursive"],
    },
  ],
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
