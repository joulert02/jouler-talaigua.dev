import preview from "../../../../.storybook/preview";
import { withLocale } from "../../../../.storybook/locale";
import Footer from "./Footer.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Layout/Footer",
  component: Example,
  ...exampleMeta(Footer, withLocale),
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Site footer: link columns, wordmark and origin line, all from `footer` in `src/config/profile.ts`. The email row has a `copy-email` slot (CopyEmail).",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "layout/Footer/examples/FooterExample.astro" },
  parameters: {
    docs: {
      description: {
        story: "Switch `locale` to review the copy in Spanish.",
      },
    },
  },
});
