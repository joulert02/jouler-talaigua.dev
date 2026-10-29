import preview from "../../.storybook/preview";
import Button from "./Button.astro";

const meta = preview.meta({
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
});

export default meta;

export const Primary = meta.story({
  args: {
    label: "Get in touch",
  },
});
