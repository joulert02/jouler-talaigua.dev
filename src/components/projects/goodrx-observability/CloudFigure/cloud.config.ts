// Copy for CloudFigure, approved with the case (docs/content/projects/goodrx-groundcover-migration-redesign.md, v11 page).
import type { Lang } from "../../../../i18n/ui";

export const cloudCopy = {
  en: {
    label: "Before and after: where the data lives",
    sides: [
      { title: "Before · Datadog", points: ["Pricing based on storage", "Data in the vendor's storage"] },
      {
        title: "After · groundcover, BYOC",
        points: ["Their interface and SDK", "Running on GoodRx's own infrastructure"],
      },
    ],
  },
  es: {
    label: "Antes y después: dónde viven los datos",
    sides: [
      {
        title: "Antes · Datadog",
        points: ["Precio basado en almacenamiento", "Datos en el almacenamiento del proveedor"],
      },
      {
        title: "Después · groundcover, BYOC",
        points: ["Su interfaz y su SDK", "Corriendo sobre la infraestructura de GoodRx"],
      },
    ],
  },
} satisfies Record<Lang, unknown>;
