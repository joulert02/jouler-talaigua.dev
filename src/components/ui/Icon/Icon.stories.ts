import preview from "../../../../.storybook/preview";
import Icon from "./Icon.astro";

const meta = preview.meta({
  title: "Components/UI/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Line icons for navigation and actions, drawn at 20px in `currentColor`, so they take the colour of their parent. Always decorative (`aria-hidden`): the control that holds an icon carries the accessible name.",
      },
    },
  },
  argTypes: { name: { control: "select", options: ["home", "work", "notes", "roadmap", "email", "theme"] } },
});
export default meta;

export const Playground = meta.story({
  args: { name: "home" },
  parameters: { docs: { description: { story: "Pick an icon by name." } } },
});
