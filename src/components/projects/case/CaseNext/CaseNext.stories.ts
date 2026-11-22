import preview from "../../../../../.storybook/preview";
import CaseNext from "./CaseNext.astro";
import { withLocale } from "../../../../../.storybook/locale";

const meta = preview.meta({
  ...withLocale,
  title: "Components/Projects/Case/CaseNext",
  component: CaseNext,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The end of a case (v11 `.case-next`): the previous and the next case in Work order, wrapping around; WorkCase computes both. Stacked on phones. The footer follows.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    previous: { href: "#", title: "Datadog to groundcover", company: "GoodRx" },
    next: { href: "#", title: "CAPS+", company: "Cast & Crew" },
  },
});
