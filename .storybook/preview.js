import "../src/styles/global.css";
import "../src/styles/fonts.css";
import { definePreview } from "@storybook-astro/framework";
import { getPreferredColorScheme, themes } from "storybook/theming";
import { THEMES, effectiveTheme } from "../src/lib/theme.js";
import { defaultLang } from "../src/i18n/ui";
import StoryRoot from "./StoryRoot.astro";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { createElement as h, Fragment, Suspense, lazy, useEffect, useState } from "react";

// Component overview: what it is, the Playground with its props table, then only the variants (the Playground is not
// listed twice). The blocks load lazily, like the renderer below, because they touch `document` during the prerender.
const OverviewBlocks = lazy(async () => {
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

// One theme for docs pages and stories: the toolbar choice, which starts from the OS preference. The docs page re-themes
// itself (its chrome and the tokens on the root) whenever the toolbar changes.
const osTheme = getPreferredColorScheme() === "dark" ? THEMES.dark : THEMES.light;
const ThemedDocs = lazy(async () => {
  const { DocsContainer } = await import("@storybook/addon-docs/blocks");
  return {
    default: function ThemedDocs({ context, children }) {
      // `store` is not in the public typings, but the docs context carries it; without it the OS theme is the start.
      const [theme, setTheme] = useState(() =>
        effectiveTheme(context.store?.userGlobals?.get().theme, osTheme === THEMES.dark),
      );
      useEffect(() => {
        const onGlobals = ({ globals }) => setTheme(effectiveTheme(globals.theme, osTheme === THEMES.dark));
        context.channel.on(GLOBALS_UPDATED, onGlobals);
        return () => context.channel.off(GLOBALS_UPDATED, onGlobals);
      }, [context]);
      useEffect(() => globalThis.document.documentElement.setAttribute("data-theme", theme), [theme]);
      return h(
        DocsContainer,
        { context, theme: theme === THEMES.dark ? themes.dark : themes.light },
        children,
      );
    },
  };
});

const addonDocs = () => ({
  parameters: {
    docs: {
      container: (props) => h(Suspense, { fallback: null }, h(ThemedDocs, props)),
      // A plain function, never the lazy object itself: parameters travel to the manager, and a React lazy object
      // carries deep dev-only debug data that breaks that serialization (the Controls panel then gets no args).
      page: () => h(Suspense, { fallback: null }, h(OverviewBlocks)),
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
      description: "Theme of docs pages and stories",
      toolbar: { title: "Theme", icon: "paintbrush", items: Object.values(THEMES), dynamicTitle: true },
    },
  },
  initialGlobals: { theme: osTheme },
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
