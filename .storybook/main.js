import { defineMain } from "@storybook-astro/framework/node";

const STORYBOOK_DOCS_PATH = "/.storybook/docs/";
const ASTRO_MDX_PLUGINS = new Set(["@mdx-js/rolldown", "@astrojs/mdx-postprocess"]);

function skipAstroMdxForStorybookDocs(plugins = []) {
  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      skipAstroMdxForStorybookDocs(plugin);
      continue;
    }

    if (!plugin || typeof plugin !== "object" || !ASTRO_MDX_PLUGINS.has(plugin.name)) continue;

    const transform = plugin.transform;
    if (!transform || typeof transform !== "object" || typeof transform.handler !== "function") continue;

    const astroTransform = transform.handler;
    plugin.transform = {
      ...transform,
      handler(code, id, ...args) {
        if (id.replaceAll("\\", "/").includes(STORYBOOK_DOCS_PATH)) return null;
        return astroTransform.call(this, code, id, ...args);
      },
    };
  }
}

export default defineMain({
  stories: [
    "../.storybook/docs/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  viteFinal(config) {
    skipAstroMdxForStorybookDocs(config.plugins);
    return config;
  },
});
