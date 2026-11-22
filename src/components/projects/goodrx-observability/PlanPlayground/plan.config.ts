// Copy for PlanPlayground, approved with the case (docs/content/projects/goodrx-groundcover-migration-redesign.md, v11 page).
import type { Lang } from "../../../../i18n/ui";

export const planCopy = {
  en: {
    label: "Our plan · tick each question",
    shortLabel: "Our plan",
    questions: [
      { title: "What to measure", text: "Which metrics to migrate first." },
      { title: "How it runs", text: "How the migration would run." },
      { title: "How to prove it", text: "Both tools capture the same thing, the same way." },
      { title: "When it is done", text: "A definition of done, ending in production." },
    ],
    waiting: "Four questions to answer before writing code.",
    readyTitle: "Plan ready.",
    ready: "Presented to our leads and to product, before any code.",
    run: "Tick them all",
    again: "Start over",
  },
  es: {
    label: "Nuestro plan · marca cada pregunta",
    shortLabel: "Nuestro plan",
    questions: [
      { title: "Qué medir", text: "Qué métricas migrar primero." },
      { title: "Cómo se ejecuta", text: "Cómo iba a correr la migración." },
      { title: "Cómo demostrarlo", text: "Las dos herramientas capturan lo mismo, de la misma forma." },
      { title: "Cuándo está terminado", text: "Una definición de terminado que acaba en producción." },
    ],
    waiting: "Cuatro preguntas que responder antes de escribir código.",
    readyTitle: "Plan listo.",
    ready: "Presentado a nuestros líderes y a producto, antes de cualquier código.",
    run: "Marcarlas todas",
    again: "Empezar de nuevo",
  },
} satisfies Record<Lang, unknown>;
