import preview from "../../../../.storybook/preview";
import PhoneFrame from "./PhoneFrame.astro";

const meta = preview.meta({
  title: "Components/UI/PhoneFrame",
  component: PhoneFrame,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An iPhone frame, as in the v11 case studies, for showing a mobile screen inside a page. Whatever goes in its slot is the screen; fixed-position content (a bottom bar, the Dock) stays inside it. The frame is hardware: it keeps its colours in both themes.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { label: "Empty screen" },
  parameters: {
    docs: { description: { story: "The empty frame; `label` names the screen for screen readers." } },
  },
});
