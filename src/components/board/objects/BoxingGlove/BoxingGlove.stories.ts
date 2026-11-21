import preview from "../../../../../.storybook/preview";
import BoxingGlove from "./BoxingGlove.astro";

const meta = preview.meta({
  title: "Components/Board/Objects/BoxingGlove",
  component: BoxingGlove,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "460px" },
      description: {
        component:
          "A boxing glove that throws a punch on every press and keeps count in its note: `hits.one` and `hits.other` are the title for one hit and for several, with `{count}` replaced, and `text` stays under it. The glove keeps its own colors in both themes; reduced motion counts without the swing.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    label: "Punch",
    hits: { one: "{count} hit!", other: "{count} hits!" },
    text: "I built Stream Fighters, a web boxing game played live at an event in November 2026.",
  },
  parameters: {
    docs: { description: { story: "Press the glove a few times: it punches and the count goes up." } },
  },
});
