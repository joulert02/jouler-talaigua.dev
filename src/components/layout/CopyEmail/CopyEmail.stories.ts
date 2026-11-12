import preview from "../../../../.storybook/preview";
import CopyEmail from "./CopyEmail.astro";

const meta = preview.meta({
  title: "Components/Layout/CopyEmail",
  component: CopyEmail,
  tags: ["autodocs"],
  argTypes: { variant: { control: "inline-radio", options: ["icon", "text"] } },
  parameters: {
    docs: {
      description: {
        component:
          "Copies the contact address (`contactEmail` in `src/config/profile.ts`) and announces the result in a polite live region. If the clipboard is unavailable, it shows the address so it can be copied by hand. `icon` is the Dock action; `text` is the button next to the address in the Footer.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { variant: "icon" },
  parameters: {
    docs: { description: { story: "Click it; the feedback appears at the bottom of the viewport." } },
  },
});

export const Text = meta.story({
  args: { variant: "text" },
  parameters: { docs: { description: { story: "Next to the address in the Footer, as in v11." } } },
});
