// Opens or closes the note under a board object (ObjectReveal) and, when given, replaces what it says.
export interface RevealContent {
  title: string;
  text: string;
}

export function setReveal(host: Element, open: boolean, content?: RevealContent) {
  const reveal = host.querySelector(".object-reveal");
  if (!reveal) return;
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
