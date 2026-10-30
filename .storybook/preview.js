import "../src/styles/global.css";
import "../src/styles/fonts.css";
import { definePreview } from "@storybook-astro/framework";

const addonDocs = () => ({
  parameters: {
    docs: {
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
