// The layout editor keeps its unsaved positions in this browser, and in development the Board shows them, so an
// arrangement can be walked on the real desk before it is copied out. A draft made over an older layout.ts is
// ignored: `base` is the layout it started from. An object rests in two places, on the desktop desk and on the
// desk a phone opens (`Kind`); it tilts the same on both.
export interface Position {
  x: number;
  y: number;
  tilt: number;
}
export type Positions = Record<string, Position>;

export type Kind = "desktop" | "phone";

const KEYS = { desktop: "board-layout-draft", phone: "board-layout-draft-phone" };
/** The custom properties DeskObject reads each resting place from. */
const AXES = {
  desktop: { x: "--desk-object-x", y: "--desk-object-y" },
  phone: { x: "--desk-object-compact-x", y: "--desk-object-compact-y" },
};

/** The placed objects under `world`, by layout id, in DOM order. */
export function placedObjects(world: ParentNode) {
  const found = new Map<string, HTMLElement>();
  for (const mark of world.querySelectorAll<HTMLElement>("[data-layout-id]")) {
    const item = mark.closest<HTMLElement>(".desk-object");
    if (item) found.set(mark.dataset["layoutId"] ?? "", item);
  }
  return found;
}

export const readPosition = (item: HTMLElement, kind: Kind = "desktop"): Position => ({
  x: Math.round(parseFloat(item.style.getPropertyValue(AXES[kind].x)) || 0),
  y: Math.round(parseFloat(item.style.getPropertyValue(AXES[kind].y)) || 0),
  tilt: parseFloat(item.style.getPropertyValue("--desk-object-tilt")) || 0,
});

/** Moves the object's resting place of that kind; only the desktop place sets the tilt. */
export function writePosition(item: HTMLElement, at: Position, kind: Kind = "desktop") {
  item.style.setProperty(AXES[kind].x, `${at.x}px`);
  item.style.setProperty(AXES[kind].y, `${at.y}px`);
  if (kind === "desktop") item.style.setProperty("--desk-object-tilt", `${at.tilt}deg`);
}

export function readAll(items: Map<string, HTMLElement>, kind: Kind = "desktop"): Positions {
  return Object.fromEntries([...items].map(([id, item]) => [id, readPosition(item, kind)]));
}

export function writeAll(items: Map<string, HTMLElement>, positions: Positions, kind: Kind = "desktop") {
  for (const [id, at] of Object.entries(positions)) {
    const item = items.get(id);
    if (item && Number.isFinite(at?.x) && Number.isFinite(at?.y))
      writePosition(item, { x: at.x, y: at.y, tilt: Number.isFinite(at.tilt) ? at.tilt : 0 }, kind);
  }
}

/** The saved draft, if it was made over the layout the page now ships. Storage can be blocked: then there is none. */
export function loadDraft(base: Positions, kind: Kind = "desktop"): Positions | undefined {
  try {
    const saved = JSON.parse(localStorage.getItem(KEYS[kind]) ?? "null") as {
      base: string;
      objects: Positions;
    } | null;
    return saved?.base === JSON.stringify(base) ? saved.objects : undefined;
  } catch {
    return undefined;
  }
}

export function saveDraft(base: Positions, objects: Positions | undefined, kind: Kind = "desktop") {
  try {
    if (objects) localStorage.setItem(KEYS[kind], JSON.stringify({ base: JSON.stringify(base), objects }));
    else localStorage.removeItem(KEYS[kind]);
  } catch {
    // Without storage the draft only lives until the page reloads.
  }
}
