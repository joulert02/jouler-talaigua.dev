import preview from "../../../../.storybook/preview";
import SegmentedSwitch from "./SegmentedSwitch.astro";

const meta = preview.meta({
  title: "Components/UI/SegmentedSwitch",
  component: SegmentedSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A segmented switch (v11 `.seg-switch`): native radios in a fieldset, so arrow keys, forms and screen readers work without script. The legend is visually hidden. Playgrounds read the checked value by `name` (Desktop/Mobile, Registration/Academy).",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    name: "device",
    legend: "Device",
    options: [
      { value: "desktop", label: "Desktop" },
      { value: "mobile", label: "Mobile" },
    ],
    value: "desktop",
  },
  parameters: {
    docs: {
      description: {
        story: "Click or use the arrow keys to move between options; focus shows on the option.",
      },
    },
  },
});
