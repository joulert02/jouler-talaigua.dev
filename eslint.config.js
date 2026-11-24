import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  // Historical standalone prototypes are preserved as imported review assets.
  { ignores: ["docs/design/**"] },
  { ignores: ["dist/", ".astro/", "node_modules/", ".vercel/"] },
  // Agent skills, including third-party ones installed per machine (Impeccable), are not project sources.
  { ignores: [".claude/", ".agents/"] },
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...astro.configs.recommended,
  { files: ["scripts/**", "*.config.{js,mjs}"], languageOptions: { globals: globals.node } },
  // Storybook docs blocks run in the browser.
  {
    files: [".storybook/blocks/**/*.{js,jsx}"],
    languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } },
  },
];
