import preview from "../../../../.storybook/preview";
import CopyEmail from "./CopyEmail.astro";

const meta = preview.meta({
  title: "Components/Layout/CopyEmail",
  component: CopyEmail,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Copies the contact address (`contactEmail` in `src/config/profile.ts`) and announces the result in a polite live region. If the clipboard is unavailable, it shows the address so it can be copied by hand. Used in the Dock and the Footer.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {},
  parameters: {
    docs: { description: { story: "Click it; the feedback appears at the bottom of the viewport." } },
  },
});
