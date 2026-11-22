// Copy for PetysPlayground, approved with the case (docs/content/projects/pragma-brand-platforms.md, v11 page).
import type { Lang } from "../../../i18n/ui";

export const petysUrl = "https://petys.com/";

export const petysCopy = {
  en: {
    label: "Petys today · screenshots of the live site",
    desktopAlt: "The Petys home page in a desktop browser.",
    mobileAlt: "The Petys home page on a phone.",
    updated: "Updated just now",
    railTitle: "How a content change reaches the site · illustration",
    showRail: "Show the illustration",
    hideRail: "Hide the illustration",
    steps: [
      { name: "Contentful", text: "An editor publishes, in the content model I designed." },
      { name: "GraphQL", text: "The build asks for exactly the content each page needs." },
      { name: "Gatsby · Jenkins", text: "Every page becomes static files." },
      { name: "AWS S3", text: "The new files are uploaded." },
      { name: "CloudFront", text: "The cache is invalidated, so people get the new version." },
      { name: "petys.com", text: "The change is live." },
    ],
    hint: "Press “Publish a change” to follow a content change from the CMS to the live site.",
    live: "See it live on petys.com",
    publish: "Publish a change",
    done: "Published: the home page shows the new banner. From the CMS to the CDN, through the pipeline and cache policies an architect reviewed with me.",
  },
  es: {
    label: "Petys hoy · capturas del sitio en vivo",
    desktopAlt: "La página de inicio de Petys en un navegador de escritorio.",
    mobileAlt: "La página de inicio de Petys en un teléfono.",
    updated: "Actualizado ahora",
    railTitle: "Cómo llega un cambio de contenido al sitio · ilustración",
    showRail: "Ver ilustración",
    hideRail: "Ocultar ilustración",
    steps: [
      { name: "Contentful", text: "Alguien publica, en el modelo de contenido que diseñé." },
      { name: "GraphQL", text: "El build pide exactamente el contenido que necesita cada página." },
      { name: "Gatsby · Jenkins", text: "Cada página se convierte en archivos estáticos." },
      { name: "AWS S3", text: "Se suben los archivos nuevos." },
      { name: "CloudFront", text: "Se invalida la caché, así la gente recibe la versión nueva." },
      { name: "petys.com", text: "El cambio está en vivo." },
    ],
    hint: "Presiona “Publicar un cambio” para seguir un cambio de contenido del CMS al sitio en vivo.",
    live: "Ver en vivo en petys.com",
    publish: "Publicar un cambio",
    done: "Publicado: la página de inicio muestra el banner nuevo. Del CMS al CDN, por el pipeline y las políticas de caché que un arquitecto revisó conmigo.",
  },
} as const satisfies Record<Lang, unknown>;
