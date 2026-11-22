// Copy for PrivacyPlayground, approved with the case (docs/content/projects/goodrx-groundcover-migration-redesign.md, v11 page).
import type { Lang } from "../../../../i18n/ui";

export const privacyCopy = {
  en: {
    label: "Illustration · SDK settings",
    shortLabel: "Illustration · SDK settings",
    settings: [
      { name: "recording", label: "Session recording", detail: "On by default" },
      { name: "events", label: "User events", detail: "Page views, searches" },
      { name: "errors", label: "Console errors", detail: "Captured and grouped" },
    ],
    previewLabel: "What the SDK captures",
    recording: { title: "Recording a session", detail: "a replay of one person's visit" },
    events: { title: "Events", detail: "view · home page, action · search · no user attached" },
    errors: { title: "TypeError · 12 occurrences", detail: "grouped · no user attached" },
    blocked: "Not allowed by GoodRx's policies",
    allowed: "Within GoodRx's policies",
    hint: "groundcover records sessions out of the box. Switch it off, the way we configured it.",
    configure: "Configure it like we did",
  },
  es: {
    label: "Ilustración · configuración del SDK",
    shortLabel: "Ilustración · configuración del SDK",
    settings: [
      { name: "recording", label: "Grabación de sesiones", detail: "Activada por defecto" },
      { name: "events", label: "Eventos de usuario", detail: "Vistas de página, búsquedas" },
      { name: "errors", label: "Errores de consola", detail: "Capturados y agrupados" },
    ],
    previewLabel: "Lo que captura el SDK",
    recording: { title: "Grabando una sesión", detail: "la repetición de la visita de una persona" },
    events: { title: "Eventos", detail: "view · inicio, action · búsqueda · sin usuario asociado" },
    errors: { title: "TypeError · 12 ocurrencias", detail: "agrupado · sin usuario asociado" },
    blocked: "No lo permiten las políticas de GoodRx",
    allowed: "Dentro de las políticas de GoodRx",
    hint: "groundcover graba las sesiones por defecto. Apágalo, como lo configuramos.",
    configure: "Configurarlo como lo hicimos",
  },
} satisfies Record<Lang, unknown>;
