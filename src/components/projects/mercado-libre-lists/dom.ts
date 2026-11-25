export function required<T extends HTMLElement = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T {
  const node = root.querySelector<T>(selector);
  if (!node) throw new Error(`Missing demo element: ${selector}`);
  return node;
}
export const all = <T extends HTMLElement = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T[] => [...root.querySelectorAll<T>(selector)];
export const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const esc = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );
