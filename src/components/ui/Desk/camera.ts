// Camera for the Home desk, ported from v11 (docs/design/v11/canvas.js, DeskCamera).
// CSS lays the desk out at rest (card centered, world around it); the camera only adds an offset
// on top of that layout. Offset 0 is the resting view, so loading this script never moves anything.
// No zoom (v11).

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

/** How far the world may travel past each viewport edge. */
const OVERSCROLL = 64;
/** Keyboard step for the arrow keys, in px. */
const KEY_STEP = 64;
/** Pointer travel, in px, before a press counts as a drag and its click is swallowed. */
export const DRAG_THRESHOLD = 5;
/** Margin, in px, inside which a focused element counts as in view. */
const FOCUS_MARGIN = 20;
/** Elements that keep their own pointer behaviour instead of panning the desk (objects drag themselves). */
const INTERACTIVE = "button,a[href],input,textarea,select,desk-object";

/**
 * What the vertical wheel does over the desk.
 * `desk` (v11, default): it pans the desk. `page`: it scrolls the page as usual; only drag and
 * sideways wheel/trackpad pan. `page` is an experiment variant, reached with `?wheel=page` (see the SP issue).
 */
export type WheelMode = "desk" | "page";

interface Pan {
  id: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  moved: boolean;
}

export class DeskCamera {
  x = 0;
  y = 0;
  /** True once the visitor moved the camera; until then a resize keeps the resting view. */
  touched = false;
  private targetX: number | null = null;
  private targetY: number | null = null;
  private frame = 0;
  private pan: Pan | null = null;
  private suppressClick = false;
  private readonly abort = new AbortController();

  /**
   * @param viewport the visible window of the desk; receives the input and the dot-grid offset.
   * @param layer the element the camera translates (card and world move together).
   * @param world the full desk area, used for the bounds.
   */
  constructor(
    private readonly viewport: HTMLElement,
    private readonly layer: HTMLElement,
    private readonly world: HTMLElement,
    private readonly wheelMode: WheelMode = "desk",
  ) {
    const signal = this.abort.signal;
    viewport.addEventListener("pointerdown", (event) => this.onPointerDown(event), { signal });
    viewport.addEventListener("pointermove", (event) => this.onPointerMove(event), { signal });
    for (const type of ["pointerup", "pointercancel", "lostpointercapture"] as const) {
      viewport.addEventListener(type, (event) => this.onPointerEnd(event), { signal });
    }
    // A drag that ends over a link must not follow it when the pointer is released.
    viewport.addEventListener(
      "click",
      (event) => {
        if (!this.suppressClick) return;
        event.preventDefault();
        event.stopPropagation();
      },
      { capture: true, signal },
    );
    // Links and images are natively draggable (a ghost of the URL); on the desk a drag pans or moves objects.
    viewport.addEventListener("dragstart", (event) => event.preventDefault(), { signal });
    viewport.addEventListener("wheel", (event) => this.onWheel(event), { passive: false, signal });
    viewport.addEventListener("keydown", (event) => this.onKeyDown(event), { signal });
    viewport.addEventListener("focusin", (event) => this.onFocusIn(event), { signal });
    // Focus can make the browser scroll an overflow:hidden box; the camera owns that offset.
    viewport.addEventListener("scroll", () => this.resetScroll(), { signal });
    matchMedia("(prefers-reduced-motion: reduce)").addEventListener(
      "change",
      () => {
        this.stop();
        this.move(this.x, this.y);
      },
      { signal },
    );
  }

  destroy() {
    this.stop();
    this.abort.abort();
    this.layer.style.removeProperty("translate");
    this.viewport.style.removeProperty("--desk-camera-x");
    this.viewport.style.removeProperty("--desk-camera-y");
  }

  /** Back to the resting view that CSS lays out. */
  center() {
    this.stop();
    this.touched = false;
    this.move(0, 0);
  }

  /** After a resize: CSS keeps the resting view centered; a moved camera only re-checks its bounds. */
  refit() {
    if (this.touched) this.move(this.x, this.y);
    else this.center();
  }

  stop() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.targetX = this.targetY = null;
  }

  /** Clamps an offset so the world never leaves more than OVERSCROLL of empty desk at an edge. */
  private bounds(x: number, y: number): [number, number] {
    const view = this.viewport.getBoundingClientRect();
    const world = this.world.getBoundingClientRect();
    // Where the world would sit at offset 0, relative to the viewport.
    const restLeft = world.left - view.left - this.x;
    const restTop = world.top - view.top - this.y;
    const axis = (value: number, rest: number, viewSize: number, size: number) =>
      size < viewSize - 2 * OVERSCROLL
        ? (viewSize - size) / 2 - rest
        : clamp(value, Math.min(viewSize - size - OVERSCROLL, OVERSCROLL) - rest, OVERSCROLL - rest);
    return [axis(x, restLeft, view.width, world.width), axis(y, restTop, view.height, world.height)];
  }

  private move(x: number, y: number) {
    [this.x, this.y] = this.bounds(x, y);
    this.resetScroll();
    this.layer.style.translate = `${this.x}px ${this.y}px`;
    // The dot grid lives on the viewport and follows the camera through these.
    this.viewport.style.setProperty("--desk-camera-x", `${this.x}px`);
    this.viewport.style.setProperty("--desk-camera-y", `${this.y}px`);
  }

  /** Eases toward a target for wheel and keyboard steps; jumps when motion is reduced. */
  private glide(x: number, y: number, smooth: boolean) {
    if (!smooth || reducedMotion()) {
      this.stop();
      this.move(x, y);
      return;
    }
    [this.targetX, this.targetY] = this.bounds(x, y);
    if (this.frame) return;
    let last = performance.now();
    const tick = (now: number) => {
      if (this.targetX === null || this.targetY === null) return;
      const mix = 1 - Math.exp(-(now - last) / 48);
      last = now;
      this.move(this.x + (this.targetX - this.x) * mix, this.y + (this.targetY - this.y) * mix);
      if (Math.hypot(this.targetX - this.x, this.targetY - this.y) < 0.35) {
        this.move(this.targetX, this.targetY);
        this.stop();
        return;
      }
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }

  private resetScroll() {
    if (this.viewport.scrollLeft || this.viewport.scrollTop) {
      this.viewport.scrollLeft = this.viewport.scrollTop = 0;
    }
  }

  private onPointerDown(event: PointerEvent) {
    if (event.button !== 0 || (event.target as Element).closest(INTERACTIVE)) return;
    this.touched = true;
    this.stop();
    this.pan = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: this.x,
      y: this.y,
      moved: false,
    };
    this.viewport.setPointerCapture(event.pointerId);
    this.viewport.dataset["panning"] = "";
  }

  private onPointerMove(event: PointerEvent) {
    const pan = this.pan;
    if (!pan || pan.id !== event.pointerId) return;
    const dx = event.clientX - pan.startX;
    const dy = event.clientY - pan.startY;
    if (Math.hypot(dx, dy) > DRAG_THRESHOLD) pan.moved = true;
    this.move(pan.x + dx, pan.y + dy);
  }

  private onPointerEnd(event: PointerEvent) {
    if (!this.pan || this.pan.id !== event.pointerId) return;
    this.suppressClick = this.pan.moved;
    this.pan = null;
    delete this.viewport.dataset["panning"];
    setTimeout(() => {
      this.suppressClick = false;
    }, 0);
  }

  private onWheel(event: WheelEvent) {
    // Pinch-zoom (ctrl) and browser shortcuts (meta) stay with the browser.
    if (!event.cancelable || event.ctrlKey || event.metaKey) return;
    // Page mode: a mostly vertical, unshifted wheel belongs to the page.
    if (this.wheelMode === "page" && !event.shiftKey && Math.abs(event.deltaY) >= Math.abs(event.deltaX))
      return;
    event.preventDefault();
    this.touched = true;
    const unit =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? this.viewport.clientHeight
          : 1;
    // Shift + vertical wheel pans sideways, as browsers do for horizontal scroll.
    const sideways = event.shiftKey && !event.deltaX;
    const dx = (sideways ? event.deltaY : event.deltaX) * unit;
    const dy = (sideways ? 0 : event.deltaY) * unit;
    // A mouse wheel moves in coarse steps and gets easing; a trackpad's fine deltas follow the fingers.
    const coarse =
      event.deltaMode !== WheelEvent.DOM_DELTA_PIXEL ||
      (Number.isInteger(event.deltaY) && Math.abs(event.deltaY) >= 50 && !event.deltaX);
    this.glide((this.targetX ?? this.x) - dx, (this.targetY ?? this.y) - dy, coarse);
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.target !== this.viewport) return;
    const page = this.viewport.clientHeight * 0.65;
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [KEY_STEP, 0],
      ArrowRight: [-KEY_STEP, 0],
      ArrowUp: [0, KEY_STEP],
      ArrowDown: [0, -KEY_STEP],
      PageUp: [0, page],
      PageDown: [0, -page],
    };
    const step = steps[event.key];
    if (step) {
      event.preventDefault();
      this.touched = true;
      // Held keys repeat faster than the easing settles: add to the target, not the current spot.
      this.glide((this.targetX ?? this.x) + step[0], (this.targetY ?? this.y) + step[1], true);
    } else if (event.key === "0" || event.key === "Home") {
      event.preventDefault();
      this.center();
    }
  }

  /** Tab brings a focused element that sits off screen into the middle of the view. */
  private onFocusIn(event: FocusEvent) {
    this.resetScroll();
    const target = event.target as HTMLElement;
    if (target === this.viewport || !target.matches(":focus-visible")) return;
    const box = target.getBoundingClientRect();
    const view = this.viewport.getBoundingClientRect();
    const inView =
      box.left >= view.left + FOCUS_MARGIN &&
      box.right <= view.right - FOCUS_MARGIN &&
      box.top >= view.top + FOCUS_MARGIN &&
      box.bottom <= view.bottom - FOCUS_MARGIN;
    if (inView) return;
    this.stop();
    this.touched = true;
    this.move(
      this.x + view.left + view.width / 2 - (box.left + box.width / 2),
      this.y + view.top + view.height / 2 - (box.top + box.height / 2),
    );
  }
}
