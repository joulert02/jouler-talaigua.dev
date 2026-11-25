// The coffee objects talk on the window, like the lamp and its lights: the bag of beans loads the grinder, and the
// grinder hands ground coffee to the dripper. None of them knows the others, and each one works alone.
import { closeReveals } from "./reveal";

export const COFFEE_EVENT = "desk:coffee";
export interface CoffeeDetail {
  /** "beans": beans were poured into the grinder. "ground": the grinder finished and the coffee is ready to brew. */
  step: "beans" | "ground";
}

export const announceCoffee = (step: CoffeeDetail["step"]) =>
  window.dispatchEvent(new CustomEvent<CoffeeDetail>(COFFEE_EVENT, { detail: { step } }));

/** Runs `on` when a coffee step is announced. */
export const onCoffee = (step: CoffeeDetail["step"], on: () => void, signal: AbortSignal) =>
  window.addEventListener(
    COFFEE_EVENT,
    (event) => (event as CustomEvent<CoffeeDetail>).detail.step === step && on(),
    { signal },
  );

/**
 * Press-and-hold on a button, with the pointer or with Space or Enter. `start` returns whether the hold begins.
 * `stop` runs when the hold ends, however it ends.
 */
export function onHold(button: HTMLElement, start: () => boolean, stop: () => void, signal: AbortSignal) {
  let held = false;
  const begin = () => {
    if (held || !start()) return;
    held = true;
    // A long press may end without a click, so the hold itself closes the note of any other object.
    closeReveals((object) => object.contains(button));
  };
  const finish = () => {
    if (!held) return;
    held = false;
    stop();
  };
  button.addEventListener("pointerdown", (event) => event.button === 0 && begin(), { signal });
  button.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== " " && event.key !== "Enter") return;
      // A held key repeats, and every repeat of Enter would press the button again: the hold is one press.
      if (event.repeat) event.preventDefault();
      else begin();
    },
    { signal },
  );
  button.addEventListener("keyup", finish, { signal });
  button.addEventListener("blur", finish, { signal });
  window.addEventListener("pointerup", finish, { signal });
  window.addEventListener("pointercancel", finish, { signal });
}
