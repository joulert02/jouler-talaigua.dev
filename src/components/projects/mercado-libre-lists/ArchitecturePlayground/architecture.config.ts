import type { Lang } from "@/i18n/ui";
import { products } from "../ListsPlayground/lists.config";

type ApiId = "lists" | "catalog" | "prices" | "shipping";
/** One call the BFF makes for a card: what that API answers and what the BFF takes from it. Illustrative data. */
interface Call {
  api: ApiId;
  takes: readonly string[];
  leaves: readonly string[];
}
export type CardId = "product" | "list";
export interface Card {
  id: CardId;
  label: string;
  calls: readonly Call[];
  /** What the BFF returns for this card, in order. */
  response: readonly (readonly [string, string | number | boolean])[];
}

const { camera } = products;
const amount = (price: string) => Number(price.replace(/\D/g, ""));

const copy = {
  en: {
    noscript: "Enable JavaScript to switch cards.",
    label: "Illustrative data · not Mercado Libre code",
    legend: "Card",
    stepsLegend: "Steps",
    /** Step names: the column title, and the short one for the phone steps. */
    steps: [
      {
        title: "APIs the BFF calls",
        short: "1 APIs",
        caption: "The BFF calls several APIs and takes only what is highlighted.",
      },
      {
        title: "BFF response",
        short: "2 BFF",
        caption: "It joins that data in one contract made for this card.",
      },
      { title: "Screen", short: "3 Screen", caption: "The frontend receives it ready and shows the result." },
    ],
    apis: { lists: "Lists API", catalog: "Catalog API", prices: "Prices API", shipping: "Shipping API" },
    hint: "Pick a card and see what it receives.",
    play: "Play",
    playAgain: "Play again",
    said: "{card}: the BFF calls {apis} APIs and returns {n} fields.",
    listName: "Ana's birthday",
    count: "3 products",
    freeShipping: "Free shipping",
    cards: { product: "Product card", list: "List card" },
  },
  es: {
    noscript: "Activa JavaScript para cambiar de tarjeta.",
    label: "Datos ilustrativos · no es código de Mercado Libre",
    legend: "Tarjeta",
    stepsLegend: "Pasos",
    steps: [
      {
        title: "APIs que llama el BFF",
        short: "1 APIs",
        caption: "El BFF llama a varias APIs y toma solo lo resaltado.",
      },
      {
        title: "Respuesta del BFF",
        short: "2 BFF",
        caption: "Junta esos datos en un contrato hecho para esta tarjeta.",
      },
      {
        title: "Pantalla",
        short: "3 Pantalla",
        caption: "El frontend lo recibe listo y muestra el resultado.",
      },
    ],
    apis: {
      lists: "API de listas",
      catalog: "API de catálogo",
      prices: "API de precios",
      shipping: "API de envíos",
    },
    hint: "Elige una tarjeta y mira qué le llega.",
    play: "Reproducir",
    playAgain: "Reproducir otra vez",
    said: "{card}: el BFF llama a {apis} APIs y devuelve {n} campos.",
    listName: "Cumpleaños de Ana",
    count: "3 productos",
    freeShipping: "Envío gratis",
    cards: { product: "Tarjeta de producto", list: "Tarjeta de lista" },
  },
} as const satisfies Record<Lang, unknown>;

export function architecture(lang: Lang) {
  const text = copy[lang];
  const title = camera.t[lang];
  const image = `${camera.img}.svg`;
  const cards: readonly Card[] = [
    {
      id: "product",
      label: text.cards.product,
      calls: [
        { api: "catalog", takes: ["title", "image"], leaves: ["brand", "warranty"] },
        { api: "prices", takes: ["price", "old_price"], leaves: ["currency"] },
        { api: "shipping", takes: ["free_shipping"], leaves: ["carrier"] },
      ],
      response: [
        ["title", title],
        ["image", image],
        ["price", amount(camera.price)],
        ["old_price", amount(camera.old ?? camera.price)],
        ["free_shipping", true],
      ],
    },
    {
      id: "list",
      label: text.cards.list,
      calls: [
        { api: "lists", takes: ["name", "items"], leaves: ["owner", "visibility"] },
        { api: "catalog", takes: ["image"], leaves: ["title", "brand"] },
      ],
      response: [
        ["name", text.listName],
        ["items", 3],
        ["image", image],
      ],
    },
  ];
  return { text, title, cards, price: camera.price, old: camera.old, image: camera.img };
}
