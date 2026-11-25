import preview from "../../../../.storybook/preview";
import Switch from "./Switch.astro";

const meta = preview.meta({
  title: "Components/UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          'An on/off switch (v11 `.switch`): a native checkbox with `role="switch"`, so Space toggles it and screen readers announce on or off without script. Playgrounds read it by `name` (GoodRx: session recording, Show the component).',
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { name: "recording", label: "Session recording", detail: "On by default", checked: true },
  parameters: {
    docs: {
      description: { story: "Click the row or press Space with focus on it; the detail line is optional." },
    },
  },
});
