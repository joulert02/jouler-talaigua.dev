import "../src/styles/global.css";
import "../src/styles/fonts.css";
import { definePreview } from "@storybook-astro/framework";
import { getPreferredColorScheme, themes } from "storybook/theming";

const addonDocs = () => ({
  parameters: {
    docs: {
      // The docs page follows the OS theme, like the tokens; ThemePair shows both themes explicitly.
      theme: getPreferredColorScheme() === "dark" ? themes.dark : themes.light,
      renderer: async () => {
        const { DocsRenderer } = await import("@storybook/addon-docs");
        return new DocsRenderer();
      },
    },
  },
});

export default definePreview({
  addons: [addonDocs()],
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
