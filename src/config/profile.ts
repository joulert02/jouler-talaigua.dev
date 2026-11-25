import type { Lang, UiKey } from "../i18n/ui";
export type LocalizedText = Record<Lang, string>;
export interface ProfileLink {
  label: UiKey;
  /** One URL, or one per language (a file that exists in each language, like the CV). */
  href: string | LocalizedText;
  target?: "_blank";
  /** The link downloads a file instead of opening it. */
  download?: true;
}
/** A value that is the same in every language, or the one for the page's language. */
export function localized(value: string | LocalizedText, lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}
export interface CareerItem {
  company: string;
  role: LocalizedText;
  /** One range, or one per language when it holds a word ("Present"). */
  years: string | LocalizedText;
}
export interface BrandData {
  mark: string;
  label: string;
  name: string;
  href: string;
}
export interface IdentityData {
  brand: BrandData;
  role: LocalizedText;
  sentence: LocalizedText;
  contact: ProfileLink;
  cv: ProfileLink;
  links: readonly ProfileLink[];
  career: readonly CareerItem[];
}
export interface FooterContact {
  heading: UiKey;
  email: string;
  cv: ProfileLink;
}
export interface FooterColumn {
  heading: UiKey;
  links: readonly ProfileLink[];
}
export interface FooterData {
  contact: FooterContact;
  columns: readonly FooterColumn[];
  wordmark: string;
  origin: LocalizedText;
  originLang: Lang;
  copyright: string;
}
export interface LanguageItem {
  lang: Lang;
  label: UiKey;
  href: string;
}
export const languageItems: readonly LanguageItem[] = [
  { lang: "en", label: "layout.en", href: "/" },
  { lang: "es", label: "layout.es", href: "/es/" },
];
export const contactEmail = "joulert02@gmail.com";
export const brand: BrandData = { mark: "J", label: "JOTA", name: "Jouler Talaigua", href: "/" };
// Career rows approved by the owner for version A (2026-11-11).
export const careerItems = [
  {
    company: "Cast & Crew",
    role: { en: "Senior Software Engineer", es: "Ingeniero de software sénior" },
    years: { en: "Present", es: "Actualidad" },
  },
  {
    company: "EPAM Systems",
    role: { en: "Senior Software Engineer", es: "Ingeniero de software sénior" },
    years: "2025 – 26",
  },
  {
    company: "Mercado Libre",
    role: { en: "Senior Software Engineer", es: "Ingeniero de software sénior" },
    years: "2023 – 25",
  },
  {
    company: "PRAGMA",
    role: { en: "QA Tester → Tech Lead", es: "QA Tester → Líder técnico" },
    years: "2019 – 23",
  },
] as const satisfies readonly CareerItem[];
export const identityLinks = [
  { label: "layout.linkedin", href: "https://www.linkedin.com/in/jouler-talaigua", target: "_blank" },
  { label: "layout.github", href: "https://github.com/joulert02", target: "_blank" },
  { label: "layout.about", href: { en: "/more-about-me/", es: "/es/more-about-me/" } },
] as const satisfies readonly ProfileLink[];
// The CV PDFs live in public/cv/, one per language.
export const cvLink: ProfileLink = {
  label: "layout.cv",
  href: { en: "/cv/Jouler_Talaigua_CV.pdf", es: "/cv/Jouler_Talaigua_CV_ES.pdf" },
  download: true,
};
export const identity: IdentityData = {
  brand,
  // Role and sentence approved by the owner for version A (2026-11-11).
  role: { en: "Senior Software Engineer", es: "Ingeniero de software sénior" },
  sentence: {
    en: "I enjoy building products focused on the user experience and connecting with people along the way.",
    es: "Me gusta construir productos enfocados en la experiencia del usuario y conectar con personas en el proceso.",
  },
  contact: { label: "layout.contact", href: "#contact" },
  cv: cvLink,
  links: identityLinks,
  career: careerItems,
};
// Footer copy approved by the owner for version A (2026-11-11).
export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "layout.site",
    links: [
      { label: "layout.home", href: { en: "/", es: "/es/" } },
      { label: "layout.work", href: { en: "/work/", es: "/es/work/" } },
      // Notes and Roadmap stay out until they have content, as in the Dock (navigation.ts).
      // { label: "layout.notes", href: { en: "/notes/", es: "/es/notes/" } },
      // { label: "layout.roadmap", href: "#roadmap" },
    ],
  },
  {
    heading: "layout.social",
    links: [
      { label: "layout.instagram", href: "https://www.instagram.com/joulert02/", target: "_blank" },
      identityLinks[1],
      identityLinks[0],
    ],
  },
];
export const footer: FooterData = {
  contact: {
    heading: "layout.contactHeading",
    email: contactEmail,
    cv: { ...cvLink, label: "layout.cvPdf" },
  },
  columns: footerColumns,
  wordmark: brand.name,
  // Intentionally Spanish in both locales.
  origin: {
    en: "Hecho en Valencia, con raíces colombianas",
    es: "Hecho en Valencia, con raíces colombianas",
  },
  originLang: "es",
  copyright: "© 2026",
};
