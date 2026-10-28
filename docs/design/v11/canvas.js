const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
// Reaching the bottom arms the hint at once; holding a drag there fills it over this long before Work opens.
// Wheel and trackpad never fill it: browsers cannot tell when the fingers lift, so only a held pointer can be cancelled on release.
const EDGE_MS = 2600;
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));

// The camera moves the world, while objects retain their own positions in it.
export class DeskCamera {
  constructor(viewport, world, card, options = {}) {
    this.viewport = viewport;
    this.world = world;
    this.card = card;
    this.canInteract = options.canInteract || (() => true);
    this.onEdge = options.onEdge || (() => {});
    this.edge = { armed: false, frame: 0 };
    this.touched = false;
    this.scale = 1;
    this.x = this.y = 0;
    this.frame = 0;
    this.pan = null;
    this.suppressClick = false;
    viewport.addEventListener('pointerdown', event => {
      if (!this.canInteract() || event.button !== 0 || event.target.closest('.obj,button,a[href],input,textarea,select')) return;
      this.touched = true;
      this.stop(); this.resetEdge();
      this.pan = { id: event.pointerId, sx: event.clientX, sy: event.clientY, x: this.x, y: this.y, moved: false, last: 0 };
      viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('panning');
    });
    viewport.addEventListener('pointermove', event => {
      const p = this.pan;
      if (!p || p.id !== event.pointerId) return;
      const dx = event.clientX - p.sx, dy = event.clientY - p.sy;
      if (Math.hypot(dx, dy) > 5) p.moved = true;
      const before = this.y;
      this.move(p.x + dx, p.y + dy);
      if (this.y < before || (this.y === before && dy < p.last)) this.startEdge();
      p.last = dy;
    });
    const end = event => {
      if (!this.pan || this.pan.id !== event.pointerId) return;
      this.suppressClick = this.pan.moved;
      this.resetEdge();
      this.pan = null;
      viewport.classList.remove('panning');
      setTimeout(() => { this.suppressClick = false; }, 0);
    };
    viewport.addEventListener('pointerup', end);
    viewport.addEventListener('pointercancel', end);
    viewport.addEventListener('lostpointercapture', end);
    viewport.addEventListener('click', event => {
      if (this.suppressClick) { event.preventDefault(); event.stopPropagation(); }
    }, true);
    viewport.addEventListener('wheel', event => {
      if (!this.canInteract() || !event.cancelable || event.ctrlKey || event.metaKey) return;
      this.touched = true;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1;
      const dx = (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * unit;
      const dy = (event.shiftKey && !event.deltaX ? 0 : event.deltaY) * unit;
      const coarse = event.deltaMode !== 0 || (Number.isInteger(event.deltaY) && Math.abs(event.deltaY) >= 50 && !event.deltaX);
      this.glide((this.targetX ?? this.x) - dx, (this.targetY ?? this.y) - dy, coarse);
    }, { passive: false });
    viewport.addEventListener('keydown', event => {
      if (!this.canInteract() || event.target !== viewport) return;
      const delta = { ArrowLeft: [64, 0], ArrowRight: [-64, 0], ArrowUp: [0, 64], ArrowDown: [0, -64], PageDown:[0,-viewport.clientHeight*.65], PageUp:[0,viewport.clientHeight*.65] }[event.key];
      if (delta) { this.touched = true; event.preventDefault(); this.glide(this.x + delta[0], this.y + delta[1], true); }
      if (event.key === '0' || event.key === 'Home') { event.preventDefault(); this.center(); }
    });
    viewport.addEventListener('focusin', event => {
      viewport.scrollLeft = viewport.scrollTop = 0;
      const object = event.target.closest('.obj');
      if (!object || !object.matches(':focus-visible')) return;
      const r = object.getBoundingClientRect(), v = viewport.getBoundingClientRect();
      if (r.left < v.left + 20 || r.right > v.right - 20 || r.top < v.top + 20 || r.bottom > v.bottom - 20) {
        viewport.scrollLeft = viewport.scrollTop = 0;
        const cx = object.offsetLeft + object.offsetWidth / 2 + (parseFloat(object.style.getPropertyValue('--dx')) || 0);
        const cy = object.offsetTop + object.offsetHeight / 2 + (parseFloat(object.style.getPropertyValue('--dy')) || 0);
        this.stop(); this.move(v.width / 2 - cx * this.scale, v.height / 2 - cy * this.scale);
      }
    });
    viewport.addEventListener('scroll', () => {
      if (viewport.scrollLeft || viewport.scrollTop) viewport.scrollLeft = viewport.scrollTop = 0;
    });
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => { this.stop(); this.move(this.x, this.y); });
  }
  // Forcing the wheel past the bottom of the board hands off to the page below. Only a gesture that
  // starts at the bottom counts, so trackpad inertia from the scroll that got there cannot trigger it.
  atBottom() {
    const vh = this.viewport.clientHeight, h = this.world.offsetHeight * this.scale;
    return h < vh - 128 || (this.targetY ?? this.y) <= Math.min(vh - h - 64, 64) + 1;
  }
  // Called from move(): arriving at the bottom arms the hint; leaving it disarms.
  syncEdge() {
    const e = this.edge, at = this.atBottom();
    if (at === e.armed) return;
    e.armed = at;
    if (at) { this.onEdge(0, false, true); } else this.resetEdge();
  }
  // Called while a drag is held at the bottom. Needs the edge to be armed; does nothing if already running.
  startEdge() {
    const e = this.edge;
    if (!e.armed || e.frame) return;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / EDGE_MS, 1);
      if (p >= 1) { e.frame = 0; this.onEdge(1, true, false); return; }
      this.onEdge(p, false, true);
      e.frame = requestAnimationFrame(tick);
    };
    e.frame = requestAnimationFrame(tick);
  }
  resetEdge() {
    const e = this.edge;
    cancelAnimationFrame(e.frame); e.frame = 0;
    this.onEdge(0, false, e.armed);
  }
  stop() {
    cancelAnimationFrame(this.frame);
    this.frame = 0;
    this.targetX = this.targetY = null;
  }
  bounds(x, y) {
    const vw = this.viewport.clientWidth, vh = this.viewport.clientHeight;
    const w = this.world.offsetWidth * this.scale, h = this.world.offsetHeight * this.scale;
    return [w < vw - 128 ? (vw - w) / 2 : clamp(x, Math.min(vw - w - 64, 64), 64), h < vh - 128 ? (vh - h) / 2 : clamp(y, Math.min(vh - h - 64, 64), 64)];
  }
  move(x, y) {
    [this.x, this.y] = this.bounds(x, y);
    this.viewport.scrollLeft = this.viewport.scrollTop = 0;
    this.world.style.transform = `translate3d(${this.x}px,${this.y}px,0) scale(${this.scale})`;
    this.viewport.style.setProperty('--camera-x', `${this.x}px`);
    this.viewport.style.setProperty('--camera-y', `${this.y}px`);
    this.syncEdge();
  }
  glide(x, y, smooth) {
    if (!smooth || reducedMotion()) { this.stop(); this.move(x, y); return; }
    [this.targetX, this.targetY] = this.bounds(x, y);
    if (this.frame) return;
    let last = performance.now();
    const tick = now => {
      const mix = 1 - Math.exp(-(now - last) / 48); last = now;
      this.move(this.x + (this.targetX - this.x) * mix, this.y + (this.targetY - this.y) * mix);
      if (Math.hypot(this.targetX - this.x, this.targetY - this.y) < .35) {
        this.move(this.targetX, this.targetY); this.stop(); return;
      }
      this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }
  center() {
    this.stop(); this.scale = 1; this.touched = false;
    const small = matchMedia('(max-width:900px)').matches;
    const cy = small ? this.viewport.clientHeight * .46 : Math.max(this.card.offsetHeight / 2 + 24, (this.viewport.clientHeight - 80) / 2);
    this.move(this.viewport.clientWidth / 2 - (this.card.offsetLeft + this.card.offsetWidth / 2), cy - (this.card.offsetTop + this.card.offsetHeight / 2));
  }
  focusObject(object) {
    this.stop(); this.scale = 1; this.touched = true;
    const x = object.offsetLeft + object.offsetWidth / 2 + (parseFloat(object.style.getPropertyValue('--dx')) || 0);
    const y = object.offsetTop + object.offsetHeight / 2 + (parseFloat(object.style.getPropertyValue('--dy')) || 0);
    this.move(this.viewport.clientWidth / 2 - x, this.viewport.clientHeight / 2 - y);
  }
}

// Brief easing for coarse wheel steps; fine trackpad deltas keep native scrolling.
export function setupPageScroll() {
  let frame = 0, target = 0, from = 0, start = 0;
  const stop = () => { cancelAnimationFrame(frame); frame = 0; };
  document.addEventListener('wheel', event => {
    if (document.documentElement.classList.contains('board-mode') || event.defaultPrevented || event.target.closest('#deskPanel') || document.querySelector('dialog[open]') || reducedMotion() || event.ctrlKey || event.metaKey || event.deltaX || !event.cancelable) return;
    const coarse = event.deltaMode !== 0 || (Number.isInteger(event.deltaY) && Math.abs(event.deltaY) >= 80);
    if (!coarse) { stop(); return; }
    if (event.target.closest('textarea,select,[contenteditable]')) return;
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    if ((!frame && scrollY <= 0 && event.deltaY < 0) || (!frame && scrollY >= max && event.deltaY > 0)) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
    if (frame && Math.sign(event.deltaY) !== Math.sign(target - scrollY)) stop();
    target = clamp((frame ? target : scrollY) + event.deltaY * unit, 0, max);
    from = scrollY; start = performance.now(); cancelAnimationFrame(frame);
    const tick = now => {
      const t = Math.min((now - start) / 180, 1), eased = 1 - Math.pow(1 - t, 3);
      window.scrollTo({ top: from + (target - from) * eased, behavior: 'instant' });
      frame = t < 1 ? requestAnimationFrame(tick) : 0;
    };
    frame = requestAnimationFrame(tick);
  }, { passive: false });
  for (const event of ['pointerdown', 'touchstart', 'keydown']) document.addEventListener(event, stop, { passive: true });
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', stop);
}
