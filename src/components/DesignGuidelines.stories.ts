import DesignGuidelines from "./DesignGuidelines.astro";
import preview from "../../.storybook/preview";

const meta = preview.meta({
  title: "Design Guidelines/Overview",
  component: DesignGuidelines,
  tags: ["autodocs"],
});

export default meta;

export const Overview = meta.story({});
