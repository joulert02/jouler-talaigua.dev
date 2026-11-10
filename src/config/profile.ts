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
export type FooterEntry =
  | { kind: "link"; link: ProfileLink }
  | { kind: "email"; address: string }
  | { kind: "text"; text: LocalizedText };
export interface FooterColumn {
  heading: UiKey;
  items: readonly FooterEntry[];
}
export interface FooterData {
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
// TODO(verify): v11 career rows are draft owner-supplied data, not publication approval.
export const careerItems = [
  {
    company: "Cast & Crew",
    role: { en: "Senior Software Engineer · via Remoti", es: "Ingeniero de software sénior · vía Remoti" },
    years: { en: "2026 – Present", es: "2026 – Actualidad" },
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
  { label: "layout.about", href: "#letter" },
] as const satisfies readonly ProfileLink[];
// The CV PDFs live in public/cv/, one per language.
export const cvLink: ProfileLink = {
  label: "layout.cv",
  href: { en: "/cv/Jouler_Talaigua_CV.pdf", es: "/cv/Jouler_Talaigua_CV_ES.pdf" },
  download: true,
};
export const identity: IdentityData = {
  brand,
  // TODO(verify): v11 draft role and Spanish translation await owner approval.
  role: { en: "Senior Full-Stack Software Engineer", es: "Ingeniero de software sénior full-stack" },
  // TODO(verify): v11 draft sentence and Spanish translation await owner approval.
  sentence: {
    en: "I build products with care for the people using them—and the teams behind them.",
    es: "Creo productos cuidando a las personas que los usan y a los equipos que los hacen posibles.",
  },
  contact: { label: "layout.contact", href: "#contact" },
  cv: cvLink,
  links: identityLinks,
  career: careerItems,
};
// TODO(verify): footer copy (location and origin lines) requires owner approval.
export const footerColumns: readonly FooterColumn[] = [
  {
    heading: "layout.site",
    items: [
      { kind: "link", link: { label: "layout.work", href: "#work" } },
      { kind: "link", link: { label: "layout.notes", href: "#notes" } },
      { kind: "link", link: { label: "layout.roadmap", href: "#roadmap" } },
      { kind: "link", link: { label: "layout.letter", href: "#letter" } },
    ],
  },
  {
    heading: "layout.social",
    items: [
      {
        kind: "link",
        link: { label: "layout.instagram", href: "https://www.instagram.com/joulert02/", target: "_blank" },
      },
      { kind: "link", link: identityLinks[1] },
      { kind: "link", link: identityLinks[0] },
    ],
  },
  {
    heading: "layout.contactHeading",
    items: [
      { kind: "email", address: contactEmail },
      { kind: "link", link: { ...cvLink, label: "layout.cvPdf" } },
      { kind: "text", text: { en: "Madrid · remote across EU", es: "Madrid · remoto en la UE" } },
    ],
  },
];
export const footer: FooterData = {
  columns: footerColumns,
  wordmark: brand.name,
  // TODO(verify): v11 origin line awaits owner approval; intentionally Spanish in both locales.
  origin: { en: "Hecho en Madrid, con raíces colombianas", es: "Hecho en Madrid, con raíces colombianas" },
  originLang: "es",
  copyright: "© 2026",
};
