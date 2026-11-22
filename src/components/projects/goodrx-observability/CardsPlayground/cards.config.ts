// Copy for CardsPlayground (docs/content/projects/goodrx-groundcover-migration-redesign.md, v11 page). The cards are
// placeholder test content, not GoodRx's articles, authors or photos; they stay in English, as on the site.
import type { Lang } from "../../../../i18n/ui";

export const goodrxUrl = "https://www.goodrx.com/";

export type CardVariant = "featured" | "horizontal" | "article";

export const cards: readonly {
  variant: CardVariant;
  tag: string;
  title: string;
  byline?: string;
  date?: string;
  /** Placeholder art: two colours for the image's gradient. */
  art: readonly [string, string];
}[] = [
  {
    variant: "featured",
    tag: "Collection",
    title: "A Simple Guide to Your Yearly Checkup",
    art: ["#2f6f6b", "#9cc9c2"],
  },
  {
    variant: "horizontal",
    tag: "Medications",
    title: "How to Read the Label on Your Prescription",
    byline: "By Guest writer · Published on Sep 24, 2026",
    art: ["#c9d6e3", "#f1f4f7"],
  },
  {
    variant: "article",
    tag: "Sleep",
    title: "Small Habits That Help You Sleep Better",
    byline: "By Guest writer",
    date: "Updated on Sep 23, 2026",
    art: ["#c8b8a6", "#efe6da"],
  },
  {
    variant: "article",
    tag: "Diet and nutrition",
    title: "Five Easy Ways to Add More Vegetables to Your Day",
    byline: "By Guest writer",
    date: "Updated on Sep 23, 2026",
    art: ["#b7c98f", "#eef2dc"],
  },
];

export const cardsCopy = {
  en: {
    label: "Recreation of the shipped cards · not GoodRx code",
    shortLabel: "Recreation of the shipped cards",
    show: "Show the component",
    heading: "Learn more about your health",
    variants: { featured: "Card · featured", horizontal: "Card · horizontal", article: "Card · article" },
    shown: "Every card on the section comes from one component, in three variants.",
    note: "“Learn more about your health”: featured, horizontal and article cards, all from one component. Titles, authors and images are placeholder test content, not GoodRx's.",
    live: "See it live on GoodRx",
  },
  es: {
    label: "Recreación de las cards publicadas · no es código de GoodRx",
    shortLabel: "Recreación de las cards publicadas",
    show: "Mostrar el componente",
    heading: "Learn more about your health",
    variants: { featured: "Card · featured", horizontal: "Card · horizontal", article: "Card · article" },
    shown: "Cada card de la sección sale de un solo componente, en tres variantes.",
    note: "“Learn more about your health”: cards destacada, horizontal y de artículo, todas de un mismo componente. Títulos, autores e imágenes son contenido de prueba, no de GoodRx, en inglés como en el sitio.",
    live: "Ver en vivo en GoodRx",
  },
} satisfies Record<Lang, unknown>;
