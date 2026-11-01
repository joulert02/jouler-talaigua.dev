import "../src/styles/global.css";
import "../src/styles/fonts.css";
import { definePreview } from "@storybook-astro/framework";
import { getPreferredColorScheme, themes } from "storybook/theming";
import { THEMES, effectiveTheme } from "../src/lib/theme.js";
import { defaultLang } from "../src/i18n/ui";
import StoryRoot from "./StoryRoot.astro";
import { createElement as h, Fragment, lazy } from "react";

// Component overview: what it is, the Playground with its props table, then only the variants (the Playground is not
// listed twice). The blocks load lazily, like the renderer below, because they touch `document` during the prerender.
const OverviewPage = lazy(async () => {
  const { Controls, Description, Primary, Stories, Title } = await import("@storybook/addon-docs/blocks");
  return {
    default: () =>
      h(
        Fragment,
        null,
        h(Title),
        h(Description),
        h(Primary),
        h(Controls),
        h(Stories, { includePrimary: false }),
      ),
  };
});

const addonDocs = () => ({
  parameters: {
    docs: {
      // The docs page follows the OS theme, like the tokens; ThemePair shows both themes explicitly.
      theme: getPreferredColorScheme() === "dark" ? themes.dark : themes.light,
      page: OverviewPage,
      renderer: async () => {
        const { DocsRenderer } = await import("@storybook/addon-docs");
        return new DocsRenderer();
      },
    },
  },
});

export default definePreview({
  addons: [addonDocs()],
  globalTypes: {
    theme: {
      description: "Story theme",
      toolbar: { title: "Theme", icon: "paintbrush", items: Object.values(THEMES), dynamicTitle: true },
    },
  },
  initialGlobals: { theme: THEMES.light },
  // Every story renders through StoryRoot: the page language (the `locale` arg from withLocale, else the default) and
  // links that stay in the story.
  render: ({ locale = defaultLang, ...props }, context) => ({
    component: StoryRoot,
    props: { lang: locale, component: context.component, props },
  }),
  decorators: [
    (Story, context) => {
      if (context.viewMode === "story" && globalThis.document) {
        // The toolbar choice wins over the OS preference; an unknown value falls back to light.
        globalThis.document.documentElement.setAttribute(
          "data-theme",
          effectiveTheme(context.globals.theme, false),
        );
      }
      return Story();
    },
  ],
  parameters: {
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Color", "Typography", "Space & layout", "Radii & shadows", "Motion"],
          "Content",
          "Accessibility",
          "Components",
          ["UI", "Layout", "Profile", "*"],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
});
