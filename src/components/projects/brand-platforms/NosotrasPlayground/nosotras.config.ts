// Copy and stage data for NosotrasPlayground (v11 page). The recreated site stays in Spanish on both pages, as it is
// live; only the frame around it follows the page language.
import type { Lang } from "../../../../i18n/ui";

export const nosotrasUrl = "https://www.nosotrasonline.com.co/";

/** The three worlds, in the order the phone's arrow walks them. Each is named after its character. */
export const nosotrasWorlds = ["utero", "periodo", "flujo"] as const;
export type NosotrasWorld = (typeof nosotrasWorlds)[number];

/**
 * Where each character stands in each world on the desktop artboard, in artboard units [x, y, width], measured on the
 * designer's XD home screens. Keys are in depth order: front, middle, back.
 */
export const nosotrasCast: Record<NosotrasWorld, Record<NosotrasWorld, readonly [number, number, number]>> = {
  utero: { utero: [688, 150, 287], periodo: [895, 230, 191], flujo: [1025, 228, 202] },
  periodo: { periodo: [709, 128, 272], flujo: [928, 268, 153], utero: [1046, 275, 141] },
  flujo: { flujo: [720, 170, 236], utero: [927, 250, 143], periodo: [1033, 244, 177] },
};

/** The site's own copy, as published (Spanish on both pages). */
export const nosotrasSite = {
  nav: [
    { label: "Inicio", left: 8.6 },
    { label: "Entre Nosotras", left: 28.6, menu: true },
    { label: "Productos", left: 50, menu: true, current: true },
    { label: "Mis Puntos", left: 70.3 },
    { label: "Magazín", left: 90, menu: true },
  ],
  contact: "Contáctanos",
  signIn: "Iniciar sesión",
  signUp: "Regístrate",
  play: "Jugar",
} as const;

export const nosotrasCopy = {
  en: {
    label: "Nosotras today · a recreation of the live page",
    desktop:
      "Recreation of the Nosotras “Estoy creciendo” page: three characters on a floating island. Choosing one brings it to the front and its world colours with it.",
    mobile:
      "Recreation of the Nosotras “Estoy creciendo” page on a phone: one character at a time, with an arrow to meet the next and its world.",
    phone: "The Nosotras page on a phone",
    characters: {
      utero: "Uterus character",
      periodo: "Period drop character",
      flujo: "Cream drop character",
    },
    next: "Next character",
    front: "%s in front",
    play: "Demo only: the real game lives on Nosotras Online.",
    hint: "Choose a character to bring it to the front, or press “Play” to walk through their worlds.",
    note: "Rebuilt from the original design files. Characters and artwork belong to Nosotras.",
    tour: "Play",
    live: "See it live on Nosotras Online",
  },
  es: {
    label: "Nosotras hoy · recreación de la página en vivo",
    desktop:
      "Recreación de la página «Estoy creciendo» de Nosotras: tres personajes sobre una isla flotante. Al elegir uno pasa al frente y trae los colores de su mundo.",
    mobile:
      "Recreación de la página «Estoy creciendo» de Nosotras en un teléfono: un personaje cada vez, con una flecha para ver el siguiente y su mundo.",
    phone: "La página de Nosotras en un teléfono",
    characters: {
      utero: "Personaje útero",
      periodo: "Personaje gota de menstruación",
      flujo: "Personaje gota crema",
    },
    next: "Siguiente personaje",
    front: "%s al frente",
    play: "Solo demo: el juego real vive en Nosotras Online.",
    hint: "Elige un personaje para traerlo al frente, o pulsa «Jugar» para recorrer sus mundos.",
    note: "Reconstruida a partir de los archivos de diseño originales. Los personajes y las ilustraciones pertenecen a Nosotras.",
    tour: "Jugar",
    live: "Ver en vivo en Nosotras Online",
  },
} as const satisfies Record<Lang, unknown>;
