import preview from "../../../../.storybook/preview";
import Button from "./Button.astro";
import { ui } from "../../../i18n/ui";

const meta = preview.meta({
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: [
          "Triggers an action or takes the visitor somewhere. It renders a `<button>`, or an `<a>` when it gets an `href`, so links stay links for keyboard and screen readers.",
          "**Usage:** one `primary` per area; every other action is `ghost`.",
        ].join("\n\n"),
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "ghost"] },
    size: { control: "select", options: ["md", "sm"] },
    type: { control: "select", options: ["button", "submit", "reset"] },
    label: { control: "text" },
    href: { control: "text" },
  },
});
export default meta;

export const Playground = meta.story({
  args: { label: ui.en["layout.contact"], variant: "primary", size: "md", type: "button" },
  parameters: {
    docs: {
      description: {
        story:
          "Every prop is a control: try `href` to switch to a link, or an `https://` URL for an external one.",
      },
    },
  },
});

export const Ghost = meta.story({
  args: { label: ui.en["layout.cv"], variant: "ghost", size: "md", href: "#" },
  parameters: {
    docs: {
      description: {
        story: "The secondary action that sits next to a primary one, as in the identity card.",
      },
    },
  },
});
