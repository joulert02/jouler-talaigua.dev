import preview from "../../../../../.storybook/preview";
import ShellPlayground from "./ShellPlayground.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/BancolombiaSvp/ShellPlayground",
  component: ShellPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Chapter 02 of the Bancolombia case: deploy a micro frontend with the registry inside the shell (it rebuilds every time) or in a configuration the browser reads (the shell is never touched). Try “Deploy a micro frontend” in each setup. Copy in `shell.config.ts`.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({});
