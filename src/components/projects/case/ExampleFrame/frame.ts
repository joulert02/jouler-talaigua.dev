// Shared behaviour for the playgrounds inside an ExampleFrame.

/** Says `text` through the frame's polite live region (cleared first, so a repeat is read again). */
export function announce(frame: Element, text: string): void {
  const live = frame.querySelector<HTMLElement>("[data-example-live]");
  if (!live) return;
  live.textContent = "";
  setTimeout(() => (live.textContent = text), 30);
}

/** Below this width the playgrounds always show their phone version, and the Desktop/Mobile switch hides. */
export const PHONE_QUERY = "(max-width: 719px)";

/**
 * Keeps `site.dataset.device` in step with the frame's Desktop/Mobile radios (`name`); phones always get "mobile".
 */
export function followDevice(frame: Element, site: HTMLElement, name: string): void {
  const narrow = matchMedia(PHONE_QUERY);
  const radios = [...frame.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)];
  const fit = () => {
    site.dataset.device = narrow.matches
      ? "mobile"
      : (radios.find((radio) => radio.checked)?.value ?? "desktop");
  };
  radios.forEach((radio) => radio.addEventListener("change", fit));
  narrow.addEventListener("change", fit);
  fit();
}

/** Waits `ms`; with reduced motion it still pauses (so each step is seen), at least 400ms. */
export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, matchMedia("(prefers-reduced-motion: reduce)").matches ? Math.max(ms, 400) : ms),
  );
