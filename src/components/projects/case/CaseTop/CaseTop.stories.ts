import preview from "../../../../../.storybook/preview";
import CaseTop from "./CaseTop.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/Case/CaseTop",
  component: CaseTop,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The sticky bar on case pages (v11, restored by the owner 2026-11-23): the back pill to the case's row on Work and the language switch to the same case in the other language. Cases have no Dock. Once the page scrolls, its hairline becomes the reading progress; on phones the bar hides on scroll down and returns on scroll up.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({ args: { slug: "brand-platforms" } });
