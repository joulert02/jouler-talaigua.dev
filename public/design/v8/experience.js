import { DeskCamera } from './canvas.js';

const mobile = () => matchMedia('(max-width:900px)').matches;
const reduced = () => matchMedia('(prefers-reduced-motion:reduce)').matches;
const positions = {
  desktop: { moto:[340,475], teach:[470,370], envelope:[820,1190], rocket:[1360,760], ticket:[420,920], portrait:[1360,350], vinyl:[1460,1210], naruto:[270,1110], lol:[1700,910], pole:[1380,1040] },
  mobile: { moto:[270,420], teach:[460,310], envelope:[695,895], rocket:[850,650], ticket:[445,865], portrait:[775,325], vinyl:[900,1050], naruto:[220,1100], lol:[1040,1180], pole:[650,1140] }
};

// One world and one camera, inline on desktop and modal on mobile.
export class BoardExperience {
  constructor({ board, profile, dialog, objects, createObject, getView, store, say }) {
    Object.assign(this, { board, profile, dialog, objects, getView, store, say });
    this.viewport = document.querySelector('#deskViewport');
    this.world = document.querySelector('#desk');
    this.panel = document.querySelector('#deskPanel');
    this.stage = document.createElement('div');
    this.stage.className = 'desk-stage';
    this.stage.id = 'deskStage';
    this.stage.append(this.viewport, document.querySelector('.camera-controls'), this.panel);
    dialog.append(this.stage);
    this.identity = profile.cloneNode(true);
    this.identity.id = 'deskCard';
    this.world.append(this.identity);
    this.saved = {
      desktop: store.get('jota-v8-desk-pos-desktop', {}),
      mobile: store.get('jota-v8-desk-pos-mobile', {})
    };
    this.homeVisible = false;
    this.pageMode = false;
    this.leftBoard = false;
    this.camera = new DeskCamera(this.viewport, this.world, this.identity, {
      canInteract: () => this.panel.hidden && (mobile() ? dialog.open : this.locked)
    });
    objects.forEach(object => {
      const button = createObject(object);
      this.world.append(button);
      this.bindObject(button, object);
    });
    this.identity.querySelector('[data-mobile-explore]').href = '#explore';
    this.identity.querySelector('[data-mobile-explore]').textContent = 'More about me';
    document.querySelector('#exClose').addEventListener('click', () => this.close());
    dialog.addEventListener('cancel', event => {
      event.preventDefault();
      if (!this.panel.hidden) this.closePanel(); else this.close();
    });
    dialog.addEventListener('close', () => this.didClose());
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !dialog.open && !this.panel.hidden) {
        event.preventDefault(); this.closePanel();
      }
    });
    this.viewport.addEventListener('pointerdown', () => this.cancelEntrance(), { passive:true });
    document.querySelector('#centerDesk').addEventListener('click', () => this.say('Desk centered'));
    document.querySelector('#fitDesk').addEventListener('click', () => this.say('All objects visible. Tap an object to explore it.'));
    matchMedia('(max-width:900px)').addEventListener('change', () => this.mount());
    this.resize = new ResizeObserver(() => {
      if (!this.viewport.clientWidth || this.entrance) return;
      if (!this.camera.touched) this.camera.center();
      else this.camera.move(this.camera.x, this.camera.y);
    });
    this.resize.observe(this.viewport);
    window.addEventListener('scroll', () => {
      if (mobile() || !this.homeVisible) return;
      if (this.locked) { if (scrollY) window.scrollTo(0,0); return; }
      if (!this.pageMode) return;
      if (scrollY > 80) this.leftBoard = true;
      if (this.leftBoard && scrollY <= 2) this.lock(true);
    }, { passive:true });
    this.mount();
  }

  get locked() { return document.documentElement.classList.contains('board-mode'); }
  mode() { return mobile() ? 'mobile' : 'desktop'; }
  delta(button) {
    return ['--dx','--dy'].map(key => parseFloat(button.style.getPropertyValue(key)) || 0);
  }
  place(button, x, y) {
    button.style.setProperty('--dx', x + 'px');
    button.style.setProperty('--dy', y + 'px');
  }
  layout() {
    const mode = this.mode();
    this.world.querySelectorAll('.obj').forEach(button => {
      const [x,y] = positions[mode][button.dataset.id];
      button.style.setProperty('--x', x + 'px');
      button.style.setProperty('--y', y + 'px');
      this.place(button, ...(this.saved[mode][button.dataset.id] || [0,0]));
    });
  }
  mount() {
    this.cancelEntrance();
    if (!mobile() && this.dialog.open) this.dialog.close();
    (mobile() ? this.dialog : this.board).append(this.stage);
    this.layout();
    this.profile.querySelector('[data-mobile-explore]').href = '#explore';
    this.profile.querySelector('[data-mobile-explore]').setAttribute('aria-haspopup', 'dialog');
    if (!mobile()) this.profile.querySelector('[data-mobile-explore]').removeAttribute('aria-haspopup');
    const signature = this.identity.querySelector('.mark');
    if (mobile()) signature.removeAttribute('href'); else signature.href = '#home';
    this.lock(!mobile() && this.homeVisible && !this.pageMode);
    if (this.viewport.clientWidth) this.camera.center();
  }
  setHomeVisible(visible) {
    this.homeVisible = visible;
    if (!visible) this.leaveBoard();
    else if (!this.pageMode) this.lock(true);
  }
  lock(value) {
    const on = Boolean(value && !mobile() && this.homeVisible && !document.body.hasAttribute('data-case'));
    document.documentElement.classList.toggle('board-mode', on);
    if (on) { this.pageMode = false; this.leftBoard = false; if (scrollY) window.scrollTo(0,0); }
    if (!on) this.camera.stop();
  }
  leaveBoard() {
    if (!this.panel.hidden) this.closePanel(false, false);
    this.pageMode = true;
    this.leftBoard = false;
    this.lock(false);
    this.cancelEntrance();
  }
  home() {
    if (!this.panel.hidden) this.closePanel(false, false);
    this.pageMode = false;
    this.homeVisible = true;
    this.lock(true);
    this.camera.center();
  }
  open(trigger, push = true) {
    if (!mobile()) {
      this.home();
      this.camera.fit();
      this.viewport.focus({preventScroll:true});
      if (push) history.pushState(null, '', '#explore');
      return;
    }
    if (this.dialog.open) return;
    this.returnTarget = trigger || this.profile.querySelector('[data-mobile-explore]');
    this.origin = location.hash.startsWith('#explore') ? '#home' : (location.hash || '#home');
    const from = this.profile.getBoundingClientRect();
    this.dialog.showModal();
    this.layout();
    this.camera.center();
    if (push) history.pushState(null, '', '#explore');
    this.viewport.focus({preventScroll:true});
    if (!reduced()) {
      const to = this.identity.getBoundingClientRect();
      this.identity.classList.add('morphing');
      this.entrance = this.identity.animate([
        { transform:'translate(' + (from.left - to.left) + 'px,' + (from.top - to.top) + 'px)', width:from.width + 'px', height:from.height + 'px' },
        { transform:'translate(0,0)', width:to.width + 'px', height:to.height + 'px' }
      ], {duration:300, easing:'cubic-bezier(.2,.8,.2,1)'});
      this.world.querySelectorAll('.obj').forEach(button => button.animate(
        [{opacity:0},{opacity:1}], {duration:250, delay:80, fill:'backwards'}
      ));
      this.entrance.finished.catch(() => {}).finally(() => {
        this.identity.classList.remove('morphing');
        this.entrance = null;
      });
    }
  }
  cancelEntrance() {
    this.entrance?.cancel();
    this.identity.classList.remove('morphing');
  }
  close({ animate = true, restoreFocus = true } = {}) {
    if (!this.dialog.open || this.closing) return;
    this.cancelEntrance();
    this.restoreFocus = restoreFocus;
    if (!animate || reduced() || !this.panel.hidden) { this.dialog.close(); return; }
    this.closing = true;
    this.stage.animate([{opacity:1},{opacity:0}], {duration:140}).finished
      .catch(() => {}).finally(() => { this.closing = false; this.dialog.close(); });
  }
  didClose() {
    this.camera.stop();
    this.cancelEntrance();
    this.world.querySelectorAll('.moving,.dragging').forEach(button => {
      button.classList.remove('moving','dragging'); this.settle(button);
    });
    this.identity.classList.remove('guard');
    this.closePanel(false, false);
    if (location.hash.startsWith('#explore')) history.replaceState(null, '', this.origin || '#home');
    if (mobile() && this.restoreFocus !== false && this.returnTarget?.isConnected) this.returnTarget.focus({preventScroll:true});
    this.restoreFocus = true;
  }
  openPanel(view, update = true) {
    if (!['letter','roadmap'].includes(view)) return;
    this.cancelEntrance();
    this.camera.stop();
    this.panelReturn = document.activeElement;
    const content = this.getView(view).cloneNode(true);
    content.removeAttribute('id'); content.hidden = false; content.className = 'panel-content';
    content.querySelector('.back-link')?.remove();
    content.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
    content.querySelectorAll('[style]').forEach(node => node.style.removeProperty('view-transition-name'));
    const heading = document.createElement('h2');
    heading.id = 'deskPanelTitle'; heading.className = 'sr';
    heading.textContent = view === 'letter' ? 'A letter for you' : 'My roadmap';
    const back = document.createElement('button');
    back.type = 'button'; back.className = 'btn ghost sm'; back.textContent = '← Back to desk';
    back.addEventListener('click', () => this.closePanel());
    this.panel.replaceChildren(heading, back, content);
    this.panel.hidden = false; this.panel.scrollTop = 0;
    this.viewport.inert = true; this.stage.classList.add('is-reading');
    if (update) history.replaceState(null, '', '#explore-' + view);
    this.panel.focus({preventScroll:true});
  }
  closePanel(update = true, restoreFocus = true) {
    this.panel.hidden = true; this.panel.replaceChildren();
    this.viewport.inert = false; this.stage.classList.remove('is-reading');
    if (update) history.replaceState(null, '', mobile() ? '#explore' : '#home');
    if (restoreFocus && this.panelReturn?.isConnected) this.panelReturn.focus({preventScroll:true});
  }
  settle(button, announce = false) {
    const c = this.identity.getBoundingClientRect(), bounds = this.world.getBoundingClientRect();
    const r = button.getBoundingClientRect(), margin = 20;
    const limit = (dx,dy) => [
      Math.max(bounds.left + 12 - r.left, Math.min(bounds.right - 12 - r.right, dx)),
      Math.max(bounds.top + 12 - r.top, Math.min(bounds.bottom - 12 - r.bottom, dy))
    ];
    const hits = (dx,dy) => r.right + dx > c.left - margin && r.left + dx < c.right + margin && r.bottom + dy > c.top - margin && r.top + dy < c.bottom + margin;
    let [dx,dy] = limit(0,0);
    if (hits(dx,dy)) {
      const options = [[c.left-margin-r.right,dy],[c.right+margin-r.left,dy],[dx,c.top-margin-r.bottom],[dx,c.bottom+margin-r.top]]
        .map(([x,y]) => limit(x,y)).filter(([x,y]) => !hits(x,y)).sort((a,b) => Math.hypot(...a)-Math.hypot(...b));
      if (options.length) [dx,dy] = options[0];
    }
    const [x,y] = this.delta(button);
    this.place(button, x + dx / this.camera.scale, y + dy / this.camera.scale);
    this.saved[this.mode()][button.dataset.id] = this.delta(button);
    this.store.set('jota-v8-desk-pos-' + this.mode(), this.saved[this.mode()]);
    if (announce) this.say('Object placed outside the identity card.');
  }
  bindObject(button, object) {
    let down = null;
    button.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      this.cancelEntrance();
      down = { id:event.pointerId, sx:event.clientX, sy:event.clientY, delta:this.delta(button), moved:false };
    });
    button.addEventListener('pointermove', event => {
      if (!down || event.pointerId !== down.id) return;
      const dx = event.clientX - down.sx, dy = event.clientY - down.sy;
      if (!down.moved && Math.hypot(dx,dy) > 6) {
        down.moved = true; button.setPointerCapture(down.id);
        button.classList.add('dragging'); this.identity.classList.add('guard');
      }
      if (down.moved) this.place(button, down.delta[0] + dx/this.camera.scale, down.delta[1] + dy/this.camera.scale);
    });
    const end = () => {
      if (!down) return;
      const moved = down.moved; down = null;
      button.classList.remove('dragging'); this.identity.classList.remove('guard');
      if (moved) {
        this.settle(button); button.dataset.dragged = 'true';
        setTimeout(() => delete button.dataset.dragged, 0);
      }
    };
    button.addEventListener('pointerup', end);
    button.addEventListener('pointercancel', end);
    button.addEventListener('lostpointercapture', end);
    button.addEventListener('click', () => {
      if (button.dataset.dragged || button.classList.contains('moving')) return;
      if (this.camera.scale < .75) { this.camera.focusObject(button); return; }
      if (object.go) this.openPanel(object.go);
      else button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'));
    });
    button.addEventListener('keydown', event => {
      if (event.key.toLowerCase() === 'm') {
        event.preventDefault();
        const moving = !button.classList.contains('moving');
        button.classList.toggle('moving', moving); this.identity.classList.toggle('guard', moving);
        if (moving) this.say('Arrow keys to move. Enter or Escape to place.');
        else this.settle(button, true);
        return;
      }
      if (!button.classList.contains('moving')) return;
      const delta = {ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]}[event.key];
      if (delta) { event.preventDefault(); const [x,y] = this.delta(button); this.place(button, x+delta[0], y+delta[1]); }
      if (event.key === 'Enter' || event.key === 'Escape') {
        event.preventDefault(); event.stopPropagation();
        button.classList.remove('moving'); this.identity.classList.remove('guard'); this.settle(button, true);
      }
    });
  }
}
