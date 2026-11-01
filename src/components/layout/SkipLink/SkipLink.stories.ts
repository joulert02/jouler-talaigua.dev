import preview from "../../../../.storybook/preview";
import SkipLinkStory from "./stories/SkipLinkStory.astro";

const meta = preview.meta({
  title: "Components/Layout/SkipLink",
  component: SkipLinkStory,
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
  args: { href: "#main" },
  parameters: { docs: { description: { story: "Click inside the canvas and press Tab to reveal it." } } },
});
