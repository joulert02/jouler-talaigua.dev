export const languages = { en: "English", es: "Español" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    "layout.skip": "Skip to content",
    "layout.projectsSkip": "Skip to projects",
    "layout.homeLabel": "Jouler Talaigua, home",
    "layout.contact": "Get in touch",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.cv": "Download CV",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.cvPdf": "Download CV (PDF)",
    "layout.linkedin": "LinkedIn",
    "layout.github": "GitHub",
    "layout.about": "More about me",
    "layout.career": "Career",
    "layout.site": "Site",
    "layout.social": "Social",
    "layout.contactHeading": "Contact",
    "layout.work": "Work",
    "layout.notes": "Notes",
    "layout.roadmap": "Roadmap",
    "layout.letter": "A letter for you",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.instagram": "Instagram",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.tiktok": "TikTok",
    "layout.language": "Language",
    "layout.en": "EN",
    "layout.es": "ES",
    "layout.readIn": "Read in English",
    "layout.mainContent": "Main content",
    "dock.main": "Main",
    "dock.home": "Home",
    "dock.work": "Work",
    "dock.notes": "Notes",
    "dock.roadmap": "Roadmap", // TODO(verify)
    "dock.copyLabel": "Copy my email address",
    "dock.copyTooltip": "Copy email",
    "dock.copyText": "Copy",
    "dock.copied": "Email copied",
    "dock.failed": "Copy failed, here it is", // TODO(verify)
    "dock.themeLabel": "Toggle theme",
    "dock.themeTooltip": "Theme",
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
    "layout.skip": "Saltar al contenido",
    "layout.projectsSkip": "Saltar a proyectos",
    "layout.homeLabel": "Jouler Talaigua, inicio",
    "layout.contact": "Contactar",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.cv": "Descargar CV",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.cvPdf": "Descargar CV (PDF)",
    "layout.linkedin": "LinkedIn",
    "layout.github": "GitHub",
    "layout.about": "Más sobre mí",
    "layout.career": "Trayectoria",
    "layout.site": "Sitio",
    "layout.social": "Social",
    "layout.contactHeading": "Contacto",
    "layout.work": "Proyectos",
    "layout.notes": "Notas",
    "layout.roadmap": "Hoja de ruta",
    "layout.letter": "Una carta para ti",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.instagram": "Instagram",
    // TODO(verify): draft label or destination awaits owner approval.
    "layout.tiktok": "TikTok",
    "layout.language": "Idioma",
    "layout.en": "EN",
    "layout.es": "ES",
    "layout.readIn": "Leer en español",
    "layout.mainContent": "Contenido principal",
    "dock.main": "Principal",
    "dock.home": "Inicio",
    "dock.work": "Trabajo",
    "dock.notes": "Notas",
    "dock.roadmap": "Roadmap", // TODO(verify)
    "dock.copyLabel": "Copiar mi correo",
    "dock.copyTooltip": "Copiar correo",
    "dock.copyText": "Copiar",
    "dock.copied": "Correo copiado",
    "dock.failed": "No se pudo copiar, aquí está", // TODO(verify)
    "dock.themeLabel": "Cambiar tema",
    "dock.themeTooltip": "Tema",
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

/**
 * The page's language, read once per render instead of passed through props: `Astro.locals.lang` when a render sets it,
 * else the route's locale (`/` or `/es/`, from the i18n config). Every component on a page gets the same answer.
 */
export function getLang(astro: { locals: App.Locals; currentLocale?: string | undefined }): Lang {
  const lang = astro.locals.lang ?? astro.currentLocale;
  return lang !== undefined && lang in languages ? (lang as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

export function localePath(lang: Lang, path = "/"): string {
  if (path.startsWith("#")) return path; // an in-page fragment has no locale
  const clean = path.startsWith("/") ? path : `/${path}`;
  return lang === defaultLang ? clean : `/${lang}${clean === "/" ? "/" : clean}`;
}
