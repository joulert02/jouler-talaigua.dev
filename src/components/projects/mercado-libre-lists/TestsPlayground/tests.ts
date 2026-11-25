import { announce, wait } from "@/components/projects/case/ExampleFrame/frame";
import { reduce as reduced } from "../dom";

/** Each kind of test runs its own example step by step; only the unit one has a coverage bar to move. */
export function mountTests(root: HTMLElement): void {
  const stops = [...root.querySelectorAll<HTMLElement>("[data-kind]")].map((panel) =>
    mountPanel(root, panel),
  );
  // On phones the switch hides the other example, so its run stops.
  root
    .querySelectorAll('input[name="meli-tests"]')
    .forEach((radio) => radio.addEventListener("change", () => stops.forEach((stop) => stop())));
}

function mountPanel(root: HTMLElement, panel: HTMLElement): () => void {
  const find = <T extends HTMLElement = HTMLElement>(selector: string) => panel.querySelector<T>(selector);
  const runButton = find<HTMLButtonElement>(".tests-playground__run-bar .button");
  const runWhat = find(".tests-playground__run-what");
  const toggle = find<HTMLButtonElement>(".tests-playground__toggle");
  const wide = find('[data-output="wide"]');
  const narrow = find('[data-output="narrow"]');
  const fill = find(".tests-playground__cov-fill");
  const value = find(".tests-playground__cov-val");
  const sub = find(".tests-playground__cov-sub");
  const steps = [...panel.querySelectorAll<HTMLElement>("[data-step]")];
  if (!runButton || !runWhat || !toggle || !wide || !narrow || !value || !sub) return () => undefined;

  const copy = JSON.parse(panel.dataset.copy ?? "{}") as Record<
    "joined" | "after" | "running" | "step" | "again" | "passed" | "done",
    string
  >;
  const idle = [wide.textContent ?? "", narrow.textContent ?? ""] as const;
  const say = (onWide: string, onNarrow = onWide) => {
    wide.textContent = onWide;
    narrow.textContent = onNarrow;
  };
  const mark = (step: HTMLElement, state?: "run" | "pass") => {
    step.toggleAttribute("data-state", Boolean(state));
    if (state) step.dataset.state = state;
    const sign = step.querySelector(".tests-playground__st");
    if (sign) sign.textContent = state === "pass" ? "✓" : "·";
  };
  // Where the team was: the bar goes back and the steps clear.
  const reset = () => {
    steps.forEach((step) => mark(step));
    if (!fill) return;
    fill.style.width = "";
    value.textContent = "~60%";
    sub.textContent = copy.joined;
  };

  let run = 0;
  let busy = false;
  const free = () => {
    busy = false;
    runButton.removeAttribute("aria-disabled");
  };
  toggle.addEventListener("click", () =>
    toggle.setAttribute("aria-expanded", String(toggle.getAttribute("aria-expanded") !== "true")),
  );
  runButton.addEventListener("click", async () => {
    if (busy) return;
    const mine = ++run;
    busy = true;
    runButton.setAttribute("aria-disabled", "true");
    announce(root, copy.running);
    reset();
    // With no bar to move, the steps are what there is to see: a phone opens them.
    if (!fill) {
      toggle.setAttribute("aria-expanded", "true");
      steps.at(-1)?.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" });
    }

    for (const [index, step] of steps.entries()) {
      say(copy.running, copy.step.replace("{n}", String(index + 1)).replace("{total}", String(steps.length)));
      mark(step, "run");
      await wait(450);
      if (mine !== run) return;
      mark(step, "pass");
    }
    say(copy.passed);
    runWhat.textContent = copy.again;
    if (fill) {
      fill.style.width = "82%";
      const duration = reduced() ? 0 : 1400;
      const start = performance.now();
      for (let progress = 0; progress < 1;) {
        const now = await new Promise(requestAnimationFrame);
        if (mine !== run) return;
        progress = duration ? Math.min(1, Math.max(0, (now - start) / duration)) : 1;
        value.textContent = `${Math.round(60 + 22 * (1 - (1 - progress) ** 3))}%`;
      }
      value.textContent = "80%+";
      sub.textContent = copy.after;
    }
    announce(root, fill ? `${copy.passed}. ${copy.done}` : copy.passed);
    free();
  });

  return () => {
    if (!busy) return;
    run += 1;
    reset();
    say(...idle);
    free();
  };
}
