// The layout editor keeps its unsaved positions in this browser, and in development the Board shows them, so an
// arrangement can be walked on the real desk before it is copied out. A draft made over an older layout.ts is
// ignored: `base` is the layout it started from.
export interface Position {
  x: number;
  y: number;
  tilt: number;
}
export type Positions = Record<string, Position>;

const KEY = "board-layout-draft";

/** The placed objects under `world`, by layout id, in DOM order. */
export function placedObjects(world: ParentNode) {
  const found = new Map<string, HTMLElement>();
  for (const mark of world.querySelectorAll<HTMLElement>("[data-layout-id]")) {
    const item = mark.closest<HTMLElement>(".desk-object");
    if (item) found.set(mark.dataset["layoutId"] ?? "", item);
  }
  return found;
}

export const readPosition = (item: HTMLElement): Position => ({
  x: Math.round(parseFloat(item.style.getPropertyValue("--desk-object-x")) || 0),
  y: Math.round(parseFloat(item.style.getPropertyValue("--desk-object-y")) || 0),
  tilt: parseFloat(item.style.getPropertyValue("--desk-object-tilt")) || 0,
});

export function writePosition(item: HTMLElement, at: Position) {
  item.style.setProperty("--desk-object-x", `${at.x}px`);
  item.style.setProperty("--desk-object-y", `${at.y}px`);
  item.style.setProperty("--desk-object-tilt", `${at.tilt}deg`);
}

export function readAll(items: Map<string, HTMLElement>): Positions {
  return Object.fromEntries([...items].map(([id, item]) => [id, readPosition(item)]));
}

export function writeAll(items: Map<string, HTMLElement>, positions: Positions) {
  for (const [id, at] of Object.entries(positions)) {
    const item = items.get(id);
    if (item && Number.isFinite(at?.x) && Number.isFinite(at?.y))
      writePosition(item, { x: at.x, y: at.y, tilt: Number.isFinite(at.tilt) ? at.tilt : 0 });
  }
}

/** The saved draft, if it was made over the layout the page now ships. Storage can be blocked: then there is none. */
export function loadDraft(base: Positions): Positions | undefined {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as {
      base: string;
      objects: Positions;
    } | null;
    return saved?.base === JSON.stringify(base) ? saved.objects : undefined;
  } catch {
    return undefined;
  }
}

export function saveDraft(base: Positions, objects: Positions | undefined) {
  try {
    if (objects) localStorage.setItem(KEY, JSON.stringify({ base: JSON.stringify(base), objects }));
    else localStorage.removeItem(KEY);
  } catch {
    // Without storage the draft only lives until the page reloads.
  }
}
