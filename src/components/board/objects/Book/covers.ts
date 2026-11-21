// The covers of the books on the shelf, by a short name. Each image belongs to its publisher and is shown, as a
// bookshop would, to name the book. To add one: drop the image in src/assets/books and add it here.
import comoGanarAmigos from "../../../../assets/books/como-ganar-amigos.jpg";
import elKybalion from "../../../../assets/books/el-kybalion.jpg";
import elPrincipito from "../../../../assets/books/el-principito.jpg";
import howToKnowAPerson from "../../../../assets/books/how-to-know-a-person.jpg";
import patronesDeDiseno from "../../../../assets/books/patrones-de-diseno.jpg";

export const covers = { howToKnowAPerson, elPrincipito, comoGanarAmigos, elKybalion, patronesDeDiseno };
export type CoverName = keyof typeof covers;
