import preview from "../../../../../.storybook/preview";
import { withLocale } from "../../../../../.storybook/locale.js";
import ThemeToggleWrapper from "./ThemeToggleWrapper.astro";

// SP-03 probe, to review and then delete.
const meta = preview.meta({
  ...withLocale,
  title: "SP-03 probes/2 · Wrapper .astro",
  component: ThemeToggleWrapper,
  parameters: {
    docs: {
      description: {
        component: "Option 2. The copy comes from the translations, so the only control is `locale`.",
      },
    },
  },
});
export default meta;

export const Wrapper = meta.story({});
