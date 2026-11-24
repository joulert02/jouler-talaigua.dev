// Copy for TeamMap, from the approved "From one engineer to twenty" (docs/content/projects/bancolombia-sucursal-virtual-personas.md).
// Draft wording for the owner's review (2026-11-23 proposal).
import type { Lang } from "../../../../i18n/ui";

export interface TeamRow {
  /** The moment, in the mono label column. */
  label: string;
  /** How many people, in type before the value; tabular, so it can count up without moving the line. */
  count?: number;
  /** When set, the count runs from this number up to `count` as the row comes into view: the team growing. */
  countFrom?: number;
  /** What the team was then, in type (after the count when there is one). */
  value: string;
  /** One line under it. */
  note: string;
}

export const teamMapCopy = {
  en: {
    title: "How the team grew",
    start: {
      label: "At the start",
      count: 1,
      value: "engineer",
      note: "No team, no repository, no pipeline.",
    },
    grown: {
      label: "Grown",
      count: 20,
      countFrom: 1,
      value: "people in five squads",
      note: "From juniors to masters. I helped choose them in interviews.",
    },
    across: {
      label: "Across squads",
      value: "The squad leads and me",
      note: "Where the standards were agreed and architecture and security decisions went through.",
    },
  },
  es: {
    title: "Cómo creció el equipo",
    start: {
      label: "Al empezar",
      count: 1,
      value: "ingeniero",
      note: "Sin equipo, repositorio ni pipeline.",
    },
    grown: {
      label: "Al crecer",
      count: 20,
      countFrom: 1,
      value: "personas en cinco squads",
      note: "De juniors a masters. Ayudé a elegirlas en entrevistas.",
    },
    across: {
      label: "Entre squads",
      value: "Los líderes de squad y yo",
      note: "Ahí se acordaban los estándares y pasaban las decisiones de arquitectura y seguridad.",
    },
  },
} as const satisfies Record<Lang, { title: string; start: TeamRow; grown: TeamRow; across: TeamRow }>;
