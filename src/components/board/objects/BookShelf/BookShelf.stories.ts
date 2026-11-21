import preview from "../../../../../.storybook/preview";
import BookShelf from "./BookShelf.astro";
import { covers } from "../Book/covers";

// Sample review: the real ones are still to be written.
// Pages come from each edition's listing: Random House hardcover (320), Libsa (128), Deusto hardcover (372),
// Refactoring.Guru's Spanish ebook (436). The Kybalión cover is a digital edition with no page count of its own:
// 160 is another Spanish edition's, to be replaced by the owner's copy.
const review = "Sample review. Two or three handwritten lines go here.";

const meta = preview.meta({
  title: "Components/Board/Objects/BookShelf",
  component: BookShelf,
  tags: ["autodocs"],
  parameters: {
    // Centered, and in its own frame on the docs page: the object opens parts beyond its own box, which the
    // inline docs story would clip.
    layout: "centered",
    docs: {
      story: { inline: false, height: "620px" },
      description: {
        component:
          "A small shelf with the `books` being read, which can be taken out and put back. Each book is a solid with a cover and a spine, so taking and storing it is a real quarter turn. Pressing a spine (`takeLabel`) pulls the book out of the row; it turns its cover to the front on the way to a spot beside the shelf and opens on its review. Dragging a spine pulls the book out in the hand: it goes wherever it is dropped and opens there. A book that is out is a Book (`bookLabel`): pressing it opens or closes it, and it can be dragged around. Carrying it back near the shelf lights up its place; dropped there, it closes, turns its spine out and slides in between its neighbours. Its empty place stays a button (`returnLabel`) that calls the book back without dragging, which is also the keyboard path. Several books can be out at once. Books go back in any order: the empty place of the book in the hand moves along the row to where the book is aimed, and the other spines make room. Each book takes its `pages`, which set how thick its spine is (18px up to 150 pages, then a pixel every 25 pages, 40px at most), a `color` for its spine and an optional `cover` image, and a shorter `spine` title when the full one does not fit. A book that is out no longer belongs to the shelf: it lies on the Desk the shelf stands on (or on the page when there is no desk), so moving the shelf leaves it where it is. Reduced motion moves books without the flight.",
      },
    },
  },
});
export default meta;

export const Playground = meta.story({
  args: {
    books: [
      {
        title: "How to Know a Person",
        pages: 320,
        author: "David Brooks",
        color: "#b0294f",
        cover: covers.howToKnowAPerson,
        review,
      },
      {
        title: "El Principito",
        pages: 128,
        author: "Antoine de Saint-Exupéry",
        color: "#16407a",
        cover: covers.elPrincipito,
        review,
      },
      {
        title: "Cómo ganar amigos e influir sobre las personas",
        pages: 372,
        spine: "Cómo ganar amigos",
        author: "Dale Carnegie",
        color: "#0f5e6e",
        cover: covers.comoGanarAmigos,
        review,
      },
      {
        title: "El Kybalión",
        pages: 160,
        author: "Tres Iniciados",
        color: "#8a6a3c",
        cover: covers.elKybalion,
        review,
      },
      {
        title: "Sumérgete en los patrones de diseño",
        pages: 436,
        spine: "Patrones de diseño",
        author: "Alexander Shvets",
        color: "#1b2150",
        cover: covers.patronesDeDiseno,
        review,
      },
    ],
    heading: "MY REVIEW",
    bookplate: "ex libris · JOTA",
    takeLabel: "Take {title} off the shelf",
    returnLabel: "Put {title} back on the shelf",
    bookLabel: "{title}: open or close the book",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Press a spine and the book comes out and opens. Drag another spine out and drop it anywhere. Then carry a book back to the shelf: its place follows it along the row, so it can be stored anywhere.",
      },
    },
  },
});
