// Tab order by groups (HU-02): the Home visits the identity card, then the Dock, then the board's objects, then the
// footer, although the Dock and the desk around the card sit elsewhere in the document.

/**
 * Where Tab (or Shift+Tab) goes from `current`. The page's stops are visited group by group, lowest `rank` first, in
 * document order within a group. When `current` is not a stop (an element focused by a skip link, such as `<main>`),
 * Tab goes to the first stop inside or after it and Shift+Tab to the last one before it.
 * @template T
 * @param {T[]} stops the focusable elements, in document order
 * @param {(stop: T) => number} rank the group of a stop
 * @param {T} current the focused element
 * @param {boolean} backwards Shift+Tab
 * @param {(stop: T) => boolean} after whether a stop is inside or after `current` in the document; used only when
 *   `current` is not a stop
 * @returns {T | null} the next stop, or null to leave the page's stops to the browser
 */
export function nextStop(stops, rank, current, backwards, after) {
  const order = [...stops].sort((a, b) => rank(a) - rank(b));
  const at = order.indexOf(current);
  if (at >= 0) return order[at + (backwards ? -1 : 1)] ?? null;
  return (backwards ? order.filter((stop) => !after(stop)).at(-1) : order.find(after)) ?? null;
}
