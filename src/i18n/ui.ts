export const languages = { en: "English", es: "Español" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.writing": "Writing",
    "nav.about": "About",
    "home.title": "Jouler Talaigua",
    "home.lead": "Spike page — validating the stack. Real copy comes after the discovery brief.",
    "projects.status.published": "Published",
    "projects.status.in-progress": "In progress",
    "projects.status.idea": "Idea",
    "theme.toggle": "Toggle theme",
  },
  es: {
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.writing": "Artículos",
    "nav.about": "Sobre mí",
    "home.title": "Jouler Talaigua",
    "home.lead": "Página del spike — validando el stack. El copy real llega tras el brief de discovery.",
    "projects.status.published": "Publicado",
    "projects.status.in-progress": "En desarrollo",
    "projects.status.idea": "Idea",
    "theme.toggle": "Cambiar tema",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)["en"];

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

export function localePath(lang: Lang, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === "/" ? "/" : clean}`;
}
