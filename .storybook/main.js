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
  stories: ["../.storybook/docs/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-mcp"],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  viteFinal(config, { configType }) {
    skipAstroMdxForStorybookDocs(config.plugins);
    // `preview.js` imports these, but Vite only discovers them after the
    // first load and then re-optimizes mid-session: open docs pages keep requesting the old chunk hashes and lazy
    // blocks such as "Show code" fail with "504 Outdated Optimize Dep". Pre-bundling them up front avoids it.
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        "storybook/theming",
        "storybook/preview-api",
        "@storybook-astro/renderer/entry-preview-docs",
      ],
    };
    if (configType === "PRODUCTION") config.base = "./";
    return config;
  },
});
