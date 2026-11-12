import preview from "../../../../../.storybook/preview";
import { withLocale } from "../../../../../.storybook/locale.js";
import ThemeToggleHoc from "./ThemeToggleHoc";

// SP-03 probe, to review and then delete.
const meta = preview.meta({
  ...withLocale,
  title: "SP-03 probes/1 · HOC withLabels",
  component: ThemeToggleHoc as never,
  parameters: {
    docs: {
      description: {
        component:
          "Option 1. The copy comes from the translations, so the only control is `locale`. Untested: depends on Astro runtime internals.",
      },
    },
  },
});
export default meta;

export const Hoc = meta.story({});
