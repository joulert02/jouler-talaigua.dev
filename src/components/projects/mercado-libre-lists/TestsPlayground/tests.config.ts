import type { Lang } from "@/i18n/ui";

/** The names the methods reserve stay in English in both languages (owner, 2026-11-25). */
type Keyword = "Component:" | "Behavior:" | "Feature:" | "Scenario:" | "Given" | "And" | "When" | "Then";
interface Line {
  keyword: Keyword;
  text: string;
}
export interface Example {
  /** What the example is, and whose code it is not. */
  label: string;
  /** Its two heading lines: what is tested and what it should do. */
  head: readonly [Line, Line];
  steps: readonly Line[];
  /** The line beside the button before a run. */
  hint: string;
  /** The same place on phones, where the example starts closed. */
  idle: string;
  passed: string;
  /** Opens the example on phones. */
  show: string;
  /** What the button runs ("Run" + "test"). */
  what: string;
}
interface TestsCopy {
  legend: string;
  tabs: Record<"unit" | "e2e", string>;
  coverageTitle: string;
  joined: string;
  bar80: string;
  after: string;
  covered: string;
  planned: string;
  remaining: string;
  coverageRule: string;
  e2eTitle: string;
  e2eNumber: string;
  e2eJoined: string;
  e2eRule: string;
  pocTitle: string;
  poc: readonly { name: string; status: string; picked?: true }[];
  run: string;
  again: string;
  running: string;
  step: string;
  coverageDone: string;
  unit: Example;
  e2e: Example;
}

export const testsCopy: Record<Lang, TestsCopy> = {
  en: {
    legend: "Kind of test",
    tabs: { unit: "Unit", e2e: "End-to-end" },
    coverageTitle: "Unit test coverage",
    joined: "when I joined (estimate)",
    bar80: "80% · deliberate bar",
    after: "afterwards",
    covered: "Covered by tests",
    planned: "Planned",
    remaining: "Remaining",
    coverageRule:
      "Chasing 100% makes every change a fight with a number, and people start writing tests that protect nothing.",
    e2eTitle: "End-to-end tests",
    e2eNumber: "0",
    e2eJoined: "when I joined",
    e2eRule: "I proposed covering what mattered most to the business: the critical flows and their rules.",
    pocTitle: "Proof of concept",
    poc: [
      { name: "Playwright", status: "Worked" },
      { name: "WebDriverIO", status: "Worked · company standard", picked: true },
    ],
    run: "Run",
    again: "again",
    running: "Running…",
    step: "Step {n} of {total}",
    coverageDone: "Unit coverage: 80%+",
    unit: {
      label: "Illustrative test · not Mercado Libre code",
      head: [
        { keyword: "Component:", text: "Add to a list" },
        { keyword: "Behavior:", text: "Saves the product to the chosen list" },
      ],
      steps: [
        { keyword: "Given", text: "the lists service is mocked" },
        { keyword: "When", text: 'I choose "Ana\'s birthday" and confirm' },
        { keyword: "Then", text: "it asks to save the product and shows the confirmation" },
      ],
      hint: "Unit tests check how the component should behave, not just its functions.",
      idle: "1 illustrative test · 3\u00a0steps",
      passed: "1 test passed · 3\u00a0steps",
      show: "Show test",
      what: "test",
    },
    e2e: {
      label: "Illustrative scenario · not Mercado Libre code",
      head: [
        { keyword: "Feature:", text: "Gift lists" },
        { keyword: "Scenario:", text: "A shopper adds a product to a gift list" },
      ],
      steps: [
        { keyword: "Given", text: "I am signed in" },
        { keyword: "And", text: 'I have a gift list named "Ana\'s birthday"' },
        { keyword: "When", text: 'I add the product to "Ana\'s birthday"' },
        { keyword: "Then", text: 'the list "Ana\'s birthday" shows the product' },
      ],
      hint: "Plain language the whole team can read.",
      idle: "1 illustrative scenario · 4\u00a0steps",
      passed: "1 scenario passed · 4\u00a0steps",
      show: "Show scenario",
      what: "scenario",
    },
  },
  es: {
    legend: "Tipo de prueba",
    tabs: { unit: "Unitarias", e2e: "End-to-end" },
    coverageTitle: "Cobertura de pruebas unitarias",
    joined: "cuando llegué (estimado)",
    bar80: "80% · umbral deliberado",
    after: "después",
    covered: "Cubierto por pruebas",
    planned: "Planificado",
    remaining: "Pendiente",
    coverageRule:
      "Perseguir el 100% convierte cada cambio en una pelea con un número, y la gente empieza a escribir pruebas que no protegen nada.",
    e2eTitle: "Pruebas end-to-end",
    e2eNumber: "0",
    e2eJoined: "cuando llegué",
    e2eRule: "Propuse cubrir lo que más le importaba al negocio: los flujos críticos y sus reglas.",
    pocTitle: "Prueba de concepto",
    poc: [
      { name: "Playwright", status: "Funcionó" },
      { name: "WebDriverIO", status: "Funcionó · estándar de la empresa", picked: true },
    ],
    run: "Ejecutar",
    again: "de nuevo",
    running: "Ejecutando…",
    step: "Paso {n} de {total}",
    coverageDone: "Cobertura unitaria: 80%+",
    unit: {
      label: "Prueba ilustrativa · no es código de Mercado Libre",
      head: [
        { keyword: "Component:", text: "Agregar a una lista" },
        { keyword: "Behavior:", text: "Guarda el producto en la lista elegida" },
      ],
      steps: [
        { keyword: "Given", text: "el servicio de listas está simulado" },
        { keyword: "When", text: 'elijo "Cumpleaños de Ana" y confirmo' },
        { keyword: "Then", text: "pide guardar el producto y muestra la confirmación" },
      ],
      hint: "Las unitarias comprueban cómo debe comportarse el componente, no solo sus funciones.",
      idle: "1 prueba ilustrativa · 3\u00a0pasos",
      passed: "1 prueba aprobada · 3\u00a0pasos",
      show: "Ver prueba",
      what: "prueba",
    },
    e2e: {
      label: "Escenario ilustrativo · no es código de Mercado Libre",
      head: [
        { keyword: "Feature:", text: "Listas de regalos" },
        { keyword: "Scenario:", text: "Una persona agrega un producto a una lista de regalos" },
      ],
      steps: [
        { keyword: "Given", text: "inicié sesión" },
        { keyword: "And", text: 'tengo una lista de regalos llamada "Cumpleaños de Ana"' },
        { keyword: "When", text: 'agrego el producto a "Cumpleaños de Ana"' },
        { keyword: "Then", text: 'la lista "Cumpleaños de Ana" muestra el producto' },
      ],
      hint: "Lenguaje sencillo que todo el equipo puede leer.",
      idle: "1 escenario ilustrativo · 4\u00a0pasos",
      passed: "1 escenario aprobado · 4\u00a0pasos",
      show: "Ver escenario",
      what: "escenario",
    },
  },
};
