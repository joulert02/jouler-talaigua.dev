// Copy for SdksPlayground, approved with the case (docs/content/projects/goodrx-groundcover-migration-redesign.md, v11 page).
// `{n}` and `{env}` are filled in by the script.
import type { Lang } from "../../../../i18n/ui";

export const sdksCopy = {
  en: {
    label: "Illustration · not GoodRx data",
    shortLabel: "Illustration · not GoodRx data",
    environmentsLabel: "Environments",
    environments: ["Local", "Test environments", "Production"],
    events: [
      { kind: "view", detail: "home page", label: "Open the home page" },
      { kind: "action", detail: "search", label: "Search" },
      { kind: "error", detail: "console error", label: "Trigger a console error" },
    ],
    streams: [
      { name: "Datadog SDK", tag: "existing" },
      { name: "groundcover SDK", tag: "new" },
    ],
    empty: "No events yet.",
    hint: "Send a few events, then promote the release.",
    match: "{n} of {n} events arrived the same in both tools.",
    first: "Send an event first, then promote.",
    promoted: "Deployed to {env}.",
    certified: "Certified in production. Every point of the definition of done checked.",
    promote: "Promote ›",
    again: "Start over",
  },
  es: {
    label: "Ilustración · no son datos de GoodRx",
    shortLabel: "Ilustración · no son datos de GoodRx",
    environmentsLabel: "Ambientes",
    environments: ["Local", "Ambientes de prueba", "Producción"],
    events: [
      { kind: "view", detail: "inicio", label: "Abrir el inicio" },
      { kind: "action", detail: "búsqueda", label: "Buscar" },
      { kind: "error", detail: "error de consola", label: "Provocar un error de consola" },
    ],
    streams: [
      { name: "SDK de Datadog", tag: "actual" },
      { name: "SDK de groundcover", tag: "nuevo" },
    ],
    empty: "Todavía no hay eventos.",
    hint: "Envía algunos eventos y luego promueve la versión.",
    match: "{n} de {n} eventos llegaron igual a las dos herramientas.",
    first: "Envía primero un evento y luego promueve.",
    promoted: "Desplegado en {env}.",
    certified: "Certificado en producción. Cada punto de la definición de terminado, revisado.",
    promote: "Promover ›",
    again: "Empezar de nuevo",
  },
} satisfies Record<Lang, unknown>;
