// Copy for FoundationPlayground. Steps rewritten as the challenges I faced (owner feedback, 2026-11-23); draft for review.
import type { Lang } from "../../../../i18n/ui";

export interface FoundationStep {
  /** The step, shown in the list. */
  name: string;
  /** What it meant, shown under the current step. */
  text: string;
}

/** One card on the board: what the step left in place. The last one shows the login capture instead of chips. */
export interface FoundationPiece {
  label: string;
  /** The chips; `flow` draws them as a pipeline with arrows between them. */
  items: readonly string[];
  flow?: boolean;
}

export const foundationCopy = {
  en: {
    label: "Five challenges · illustration, not Bancolombia code",
    shortLabel: "Five challenges · illustration",
    back: "‹ Back",
    next: "Next ›",
    step: "Challenge {n} of {total}: ",
    steps: [
      {
        name: "A new world: a bank, not a marketing site",
        text: "I went from React and Gatsby marketing sites to Angular, Clean Architecture and how a bank builds: its cross-cutting teams and its design system. I met with a Google Developer Expert to understand the standards the bank already used.",
      },
      {
        name: "The frontend architecture",
        text: "How the micro frontends talk to each other in the browser, and how the shell finds and loads them. I ran the proofs of concept and wrote the guidelines.",
      },
      {
        name: "Repositories and archetypes",
        text: "Every micro-frontend repository, plus archetype templates that gave each new one the right structure from day one.",
      },
      {
        name: "Continuous integration and delivery",
        text: "Azure DevOps pipelines from scratch: builds, secrets management and deployment to AWS S3 behind the CloudFront CDN.",
      },
      {
        name: "Ready for a team to grow on",
        text: "The Bancolombia Design System integrated and a first login page as proof that everything worked end to end, so every new person started on the same standards.",
      },
    ],
    pieces: [
      { label: "Standards", items: ["Angular", "Clean Architecture", "Bancolombia Design System"] },
      { label: "Architecture", items: ["Shell", "Micro frontends", "Client-side communication"] },
      { label: "Repositories", items: ["Micro frontends", "Archetypes"] },
      { label: "Pipeline", items: ["Azure DevOps", "AWS S3", "CloudFront"], flow: true },
    ],
    login: "Login",
    note: "The login shown is today's public page, launched later by the wider team.",
  },
  es: {
    label: "Cinco retos · ilustración, no es código de Bancolombia",
    shortLabel: "Cinco retos · ilustración",
    back: "‹ Atrás",
    next: "Siguiente ›",
    step: "Reto {n} de {total}: ",
    steps: [
      {
        name: "Un mundo nuevo: un banco, no un sitio de marketing",
        text: "Pasé de sitios de marketing con React y Gatsby a Angular, Clean Architecture y la forma de construir de un banco: sus equipos transversales y su sistema de diseño. Me reuní con un Google Developer Expert para entender los estándares que el banco ya usaba.",
      },
      {
        name: "La arquitectura frontend",
        text: "Cómo se comunican los micro frontends entre sí en el navegador, y cómo el shell los encuentra y los carga. Hice las pruebas de concepto y escribí los lineamientos.",
      },
      {
        name: "Repositorios y arquetipos",
        text: "Cada repositorio de micro frontend, más plantillas arquetipo que daban a cada uno nuevo la estructura correcta desde el primer día.",
      },
      {
        name: "Integración y despliegue continuos",
        text: "Los pipelines de Azure DevOps desde cero: builds, manejo de secretos y despliegue a AWS S3 detrás del CDN de CloudFront.",
      },
      {
        name: "Listo para que el equipo creciera",
        text: "El Bancolombia Design System integrado y una primera página de login como prueba de que todo funcionaba de punta a punta, para que cada persona nueva arrancara con los mismos estándares.",
      },
    ],
    pieces: [
      { label: "Estándares", items: ["Angular", "Clean Architecture", "Bancolombia Design System"] },
      { label: "Arquitectura", items: ["Shell", "Micro frontends", "Comunicación en el cliente"] },
      { label: "Repositorios", items: ["Micro frontends", "Arquetipos"] },
      { label: "Pipeline", items: ["Azure DevOps", "AWS S3", "CloudFront"], flow: true },
    ],
    login: "Login",
    note: "El login que se ve es la página pública de hoy, lanzada después por el equipo completo.",
  },
} as const satisfies Record<
  Lang,
  {
    label: string;
    shortLabel: string;
    back: string;
    next: string;
    step: string;
    steps: readonly FoundationStep[];
    pieces: readonly FoundationPiece[];
    login: string;
    note: string;
  }
>;
