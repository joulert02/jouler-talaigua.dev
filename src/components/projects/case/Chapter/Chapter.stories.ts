import preview from "../../../../../.storybook/preview";
import Chapter from "./Chapter.astro";
import Example from "../../../../../.storybook/Example.astro";
import { exampleMeta } from "../../../../../.storybook/example";

const meta = preview.meta({
  title: "Components/Projects/Case/Chapter",
  component: Example,
  ...exampleMeta(Chapter),
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A case chapter (v11 `.chapter`): number, title and one lead sentence, then the interactive piece (an ExampleFrame or a playground) and a FullStory disclosure (“The full story”) with the approved paragraphs, unchanged. Its `id` is the anchor CaseIntro's invitation points at.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: { example: "projects/case/Chapter/examples/ChapterExample.astro" },
  parameters: { docs: { description: { story: "Open “The full story” to read the paragraphs." } } },
});
