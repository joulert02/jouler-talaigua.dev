// Copy for ShellPlayground, approved with the case (v11 page, docs/design/v11/work/bancolombia-svp/).
// Results are a bold sentence plus the rest; `{n}` is replaced by the script.
import type { Lang } from "../../../../i18n/ui";

interface Result {
  strong: string;
  rest: string;
}

export const shellCopy = {
  en: {
    label: "Illustration · not Bancolombia code",
    shortLabel: "Illustration",
    legend: "Setup",
    typical: "Typical setup",
    proposal: "My proposal",
    hint: "Deploy a micro frontend in each setup and watch the shell.",
    deploy: "Deploy a micro frontend",
    users: "Millions of people using the bank",
    shell: "Shell",
    registry: "Registry inside the shell",
    lazy: "Opens the login first; loads the rest on demand.",
    config: "Configuration · fetched in the browser",
    microFrontends: "Micro frontends",
    initial: ["Login", "Registration"],
    redeploys: "Shell redeploys",
    start: "Pick a setup, then deploy.",
    states: {
      running: "Running",
      busy: "Rebuilding and redeploying…",
      redeployed: "Redeployed",
      untouched: "Untouched",
    },
    microFrontend: "Micro frontend {n}",
    typicalOne: {
      strong: "Shell redeployed {n} time.",
      rest: "Every release waited for it, and every team depended on it.",
    },
    typicalMany: {
      strong: "Shell redeployed {n} times.",
      rest: "Every release waited for it, and every team depended on it.",
    },
    proposalDone: {
      strong: "Micro frontend {n} is live.",
      rest: "Only the configuration changed; the shell was never rebuilt.",
    },
  },
  es: {
    label: "Ilustración · no es código de Bancolombia",
    shortLabel: "Ilustración",
    legend: "Configuración",
    typical: "Configuración típica",
    proposal: "Mi propuesta",
    hint: "Despliega un micro frontend en cada configuración y mira el shell.",
    deploy: "Desplegar un micro frontend",
    users: "Millones de personas usando el banco",
    shell: "Shell",
    registry: "Registro dentro del shell",
    lazy: "Abre primero el login; carga el resto bajo demanda.",
    config: "Configuración · se lee en el navegador",
    microFrontends: "Micro frontends",
    initial: ["Login", "Registro"],
    redeploys: "Redespliegues del shell",
    start: "Elige una configuración y despliega.",
    states: {
      running: "En ejecución",
      busy: "Recompilando y redesplegando…",
      redeployed: "Redesplegado",
      untouched: "Intacto",
    },
    microFrontend: "Micro frontend {n}",
    typicalOne: {
      strong: "Shell redesplegado {n} vez.",
      rest: "Cada lanzamiento lo esperaba, y cada equipo dependía de él.",
    },
    typicalMany: {
      strong: "Shell redesplegado {n} veces.",
      rest: "Cada lanzamiento lo esperaba, y cada equipo dependía de él.",
    },
    proposalDone: {
      strong: "El micro frontend {n} está en producción.",
      rest: "Solo cambió la configuración; el shell nunca se recompiló.",
    },
  },
} as const satisfies Record<
  Lang,
  {
    states: Record<"running" | "busy" | "redeployed" | "untouched", string>;
    typicalOne: Result;
    typicalMany: Result;
    proposalDone: Result;
    initial: readonly string[];
    [key: string]: unknown;
  }
>;

/** The registry keys the shell starts with, as they appear in code. */
export const shellKeys = ["login", "registration"] as const;
