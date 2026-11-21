import preview from "../../../../../.storybook/preview";
import Book from "./Book.astro";
import { covers } from "./covers";

const meta = preview.meta({
  title: "Components/Board/Objects/Book",
  component: Book,
  tags: ["autodocs"],
  argTypes: {
    color: { control: "color" },
    // The control lists the example covers by name; "none" shows the plain colored cover.
    cover: {
      control: "select",
      options: ["none", ...Object.keys(covers)],
      mapping: { none: undefined, ...covers },
    },
  },
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "420px" },
      description: {
        component:
          "A book that opens on a handwritten review. It is a toggle (`aria-pressed`): pressing it swings the cover open in 3D over the first page, which shows `heading` and `review`, with the `bookplate` inside the cover; pressing again closes it. The cover is configurable: a `cover` image (the book's real cover, from `covers.ts`) fills the front, and without one the front is `color` with `title` and `author` printed on it. `color` also paints the cover's edge and inside. Used loose on the desk and as the copy BookShelf pulls out. Pages keep their own colors in both themes.",
      },
    },
  },
});
export default meta;

const sample = {
  heading: "MY REVIEW",
  // Sample review: the real one is still to be written.
  review: "Sample review. Two or three handwritten lines go here.",
  bookplate: "ex libris · JOTA",
};

export const Playground = meta.story({
  args: {
    title: "How to Know a Person",
    author: "David Brooks",
    color: "#b0294f",
    cover: "howToKnowAPerson",
    ...sample,
    label: "How to Know a Person: open the book",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Press the book to open it on the review. Switch `cover` to try the five example covers, or none.",
      },
    },
  },
});

export const PlainCover = meta.story({
  name: "Plain cover",
  args: {
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    color: "#16407a",
    ...sample,
    label: "El Principito: open the book",
  },
  parameters: {
    docs: {
      description: { story: "Without a `cover` image, the front is `color` with the title and author." },
    },
  },
});
