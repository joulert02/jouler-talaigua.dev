import preview from "../../../../../.storybook/preview";
import Ticket from "./Ticket.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/Ticket",
  component: Ticket,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A one-way boarding pass from the roadmap prototype: `from` and `to` (a code, a place and, for Colombia, a flag bar in the `--color-flag-*` tokens), notched sides and short `details` on the stub. Text keeps the 14px floor. Used as the face of a FlipCard.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    from: { code: "COL", place: "Colombia", flag: "colombia" },
    to: { code: "VLC", place: "Valencia, Spain" },
    details: ["One way", "Jun 2026"],
  },
  parameters: {
    docs: {
      description: {
        story: "Edit the codes, places and details; the stub spreads its details across the ticket.",
      },
    },
  },
});
