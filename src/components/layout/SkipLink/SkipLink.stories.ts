import preview from "../../../../.storybook/preview";
import SkipLink from "./SkipLink.astro";
import Example from "../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Layout/SkipLink",
  component: Example,
  ...exampleMeta(SkipLink),
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'First focusable element of every page. It stays hidden until it gets keyboard focus, then jumps to the main content, so keyboard and screen-reader users can skip the navigation (WCAG 2.4.1). The target needs `tabindex="-1"` to receive focus.',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "layout/SkipLink/examples/SkipLinkExample.astro" },
  parameters: {
    docs: { description: { story: "Click inside the canvas and press Tab to reveal it." } },
  },
});
