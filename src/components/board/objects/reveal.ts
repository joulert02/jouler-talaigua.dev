// The notes under the board objects (ObjectReveal): one at a time.
export interface RevealContent {
  title: string;
  text: string;
}

/** Closes the open notes, except those of the objects `keep` accepts. What the object itself was doing stays. */
export function closeReveals(keep: (object: Element) => boolean) {
  for (const reveal of document.querySelectorAll(".object-reveal[data-open]")) {
    const object = reveal.closest(".desk-object") ?? reveal.parentElement;
    if (!object || !keep(object)) reveal.removeAttribute("data-open");
  }
}

// Only the object in use shows its note: pressing anything else closes it, and so does the empty board, so a note never
// stays over another object. The path is read, not the target's ancestors: a press may redraw what was pressed.
document.addEventListener("click", (event) => {
  const path = event.composedPath();
  closeReveals((object) => path.includes(object));
});

/** Opens or closes an object's note and, when given, replaces what it says. Opening it closes any other. */
export function setReveal(host: Element, open: boolean, content?: RevealContent) {
  const reveal = host.querySelector(".object-reveal");
  if (!reveal) return;
  if (open) closeReveals((object) => object.contains(host));
  if (content) {
    const title = reveal.querySelector(".object-reveal__title");
    const text = reveal.querySelector(".object-reveal__text");
    if (title) title.textContent = content.title;
    if (text) text.textContent = content.text;
  }
  reveal.toggleAttribute("data-open", open);
}

/** Reads a JSON list a component printed in a data attribute. */
export function readList<T>(host: HTMLElement, name: string): T[] {
  try {
    const value: unknown = JSON.parse(host.dataset[name] ?? "[]");
    return Array.isArray(value) ? (value as T[]) : [];
  } catch {
    return [];
  }
}
