import { announce, wait } from "@/components/projects/case/ExampleFrame/frame";

/** The chosen card decides what the three steps show. Play walks them: each API call, the BFF response, the screen. */
export function mountArchitecture(root: HTMLElement): void {
  const frame = root.querySelector<HTMLElement>(".example-frame");
  const play = root.querySelector<HTMLButtonElement>(".example-frame__actions button");
  const cards = [...root.querySelectorAll<HTMLInputElement>('input[name="meli-card"]')];
  const steps = [...root.querySelectorAll<HTMLElement>(".architecture-playground__step")];
  if (!frame || !play || !cards.length) return;

  const copy = JSON.parse(root.dataset.copy ?? "{}") as Record<"play" | "playAgain" | "said", string>;
  const layers = [...root.querySelectorAll<HTMLElement>("[data-card]")];
  const chosen = () => cards.find((card) => card.checked);
  const ofCard = (selector: string) => [
    ...root.querySelectorAll<HTMLElement>(`[data-card="${chosen()?.value}"] ${selector}`),
  ];
  const say = () =>
    announce(
      frame,
      copy.said
        .replace("{card}", chosen()?.labels?.[0]?.textContent?.trim() ?? "")
        .replace("{apis}", String(ofCard(".architecture-playground__api").length))
        .replace("{n}", String(ofCard(".architecture-playground__key").length)),
    );

  // A new run, or a choice by hand, makes any earlier run stop.
  let run = 0;
  const stop = () => {
    run += 1;
    root.removeAttribute("data-playing");
    root.querySelectorAll("[data-done]").forEach((element) => element.removeAttribute("data-done"));
    steps.forEach((step) => step.removeAttribute("data-now"));
    play.removeAttribute("aria-disabled");
  };
  cards.forEach((card) =>
    card.addEventListener("change", () => {
      stop();
      layers.forEach((layer) => layer.toggleAttribute("data-on", layer.dataset.card === card.value));
      say();
    }),
  );
  root.querySelectorAll('input[name="meli-step"]').forEach((radio) => radio.addEventListener("change", stop));

  play.addEventListener("click", async () => {
    if (play.getAttribute("aria-disabled") === "true") return;
    stop();
    const mine = run;
    play.setAttribute("aria-disabled", "true");
    root.setAttribute("data-playing", "");
    for (const [index, step] of steps.entries()) {
      steps.forEach((other) => other.toggleAttribute("data-now", other === step));
      step.setAttribute("data-done", "");
      const radio = step.querySelector<HTMLInputElement>('input[name="meli-step"]');
      if (radio) radio.checked = true;
      for (const api of index === 0 ? ofCard(".architecture-playground__api") : []) {
        await wait(450);
        if (mine !== run) return;
        api.setAttribute("data-done", "");
      }
      await wait(1200);
      if (mine !== run) return;
    }
    say();
    play.textContent = copy.playAgain;
    stop();
  });
}
