import preview from "../../../../../.storybook/preview";
import CaseHeader from "./CaseHeader.astro";

const meta = preview.meta({
  title: "Components/Projects/Case/CaseHeader",
  component: CaseHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The top of a case page (v11 `.case-head`): the company as a mono label and the title as the page's H1. WorkCase fills it from the entry's frontmatter. The title shares `case-title-<slug>` with its row on Work, so it morphs between the two pages.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { company: "Grupo Familia brands · via PRAGMA", title: "Brand platforms", slug: "brand-platforms" },
});
