// v9 · case pages: shared chrome (theme, copy, dock) and the navigation simulation.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const live = $('#live');
const say = t => { live.textContent = ''; setTimeout(() => (live.textContent = t), 30); };
const toast = t => { const e = $('#toast'); e.textContent = t; e.classList.add('on'); clearTimeout(e._t); e._t = setTimeout(() => e.classList.remove('on'), 1600); };
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } }
};

const slug = location.pathname.split('/').filter(Boolean).pop();
try { sessionStorage.setItem('jota-v9-last-case', slug); } catch { /* storage unavailable */ }

// Theme, shared with the home page.
const state = Object.assign({ scale: 'compact', theme: 'system' }, store.get('jota-v9', {}));
const isDark = () => state.theme === 'dark' || (state.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
function applyPrefs() {
  root.dataset.scale = state.scale;
  if (state.theme === 'system') delete root.dataset.theme; else root.dataset.theme = state.theme;
  $('#themeBtn')?.setAttribute('aria-pressed', String(isDark()));
  store.set('jota-v9', state);
}
applyPrefs();
$('#themeBtn')?.addEventListener('click', () => { state.theme = isDark() ? 'light' : 'dark'; applyPrefs(); say(isDark() ? 'Dark theme on' : 'Light theme on'); });

document.addEventListener('click', async e => {
  const b = e.target.closest('[data-copy]');
  if (b) {
    try { await navigator.clipboard.writeText(b.dataset.copy); toast('Email copied'); say('Email copied'); }
    catch { toast('Copy: ' + b.dataset.copy); say('Email: ' + b.dataset.copy); }
  }
  const t = e.target.closest('[data-todo]');
  if (t) { e.preventDefault(); toast('Coming soon: ' + t.dataset.todo); }
});
const footer = $('#contact');
if (footer) new IntersectionObserver(es => es.forEach(en => $('#dock')?.classList.toggle('away', en.isIntersecting)), { threshold: .15 }).observe(footer);

// Navigation simulation (Mercado Libre case). Generic data; not Mercado Libre code.
const NAMES = ['Camera', 'Headphones', 'Sneakers', 'Kettle', 'Backpack', 'Lamp', 'Blender', 'Sunglasses', 'Notebook', 'Speaker', 'Jacket', 'Plant'];
const BATCH = 12, TOTAL = 48, TARGET = 14;
// Reduced motion keeps the pauses (so each step is visible) and drops the animation itself.
const wait = ms => new Promise(r => setTimeout(r, reduce() ? Math.max(ms, 400) : ms));

class Phone {
  constructor(col) {
    this.col = col; this.mode = col.dataset.mode;
    this.el = $('.phone', col); this.list = $('ul', col); this.scroller = $('.scroller', col);
    this.loader = $('.loader', col); this.count = $('.count', col);
    this.title = $('.detail h3', col); this.stack = $('.stack', col); this.result = $('.result', col);
    this.backBtn = $('.detail .in-back', col);
    this.scroller.addEventListener('scroll', () => this.maybeLoad());
    this.list.addEventListener('click', e => { const b = e.target.closest('button[data-i]'); if (b) this.open(+b.dataset.i, true); });
    this.list.addEventListener('keydown', e => this.rove(e));
    this.list.addEventListener('focusin', e => { const b = e.target.closest('button[data-i]'); if (b) this.setRover(+b.dataset.i); });
    this.backBtn.addEventListener('click', () => this.back({ user: true }));
    this.reset();
  }
  name(i) { return `Item ${String(i).padStart(2, '0')} · ${NAMES[(i - 1) % NAMES.length]}`; }
  row(i) {
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.dataset.i = i; b.tabIndex = -1; b.setAttribute('aria-label', `Open ${this.name(i)}`);
    b.innerHTML = `<span class="ph" aria-hidden="true">${String(i).padStart(2, '0')}</span><span></span><span class="num" aria-hidden="true">›</span>`;
    b.children[1].textContent = this.name(i); li.append(b); return li;
  }
  item(i) { return $(`button[data-i="${i}"]`, this.list); }
  // One tab stop per list (roving tabindex); arrows move between items.
  setRover(i) { $$('button[data-i]', this.list).forEach(b => (b.tabIndex = -1)); const b = this.item(i); if (b) b.tabIndex = 0; this.rover = i; }
  rove(e) {
    const keys = { ArrowDown: 1, ArrowUp: -1, Home: -Infinity, End: Infinity };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const d = keys[e.key];
    const next = d === -Infinity ? 1 : d === Infinity ? this.loaded : Math.min(this.loaded, Math.max(1, this.rover + d));
    this.setRover(next); this.item(next).focus({ preventScroll: false }); this.maybeLoad();
  }
  append(n) {
    const from = this.loaded + 1, to = Math.min(TOTAL, this.loaded + n);
    for (let i = from; i <= to; i++) this.list.append(this.row(i));
    this.loaded = to; this.updateCount(); this.setRover(this.rover && this.rover <= to ? this.rover : 1);
  }
  updateCount() { this.count.textContent = `${this.loaded} of ${TOTAL}`; this.loader.hidden = this.loaded >= TOTAL && !this.stuck; }
  setLoader(stuck) { this.loader.textContent = stuck ? 'Loading more… (stuck)' : 'Loading more…'; this.loader.classList.toggle('stuck', stuck); }
  reset() {
    this.list.replaceChildren(); this.loaded = 0; this.rover = 1; this.stuck = false; this.loading = false; this.saved = 0; this.opened = null;
    this.append(BATCH); this.scroller.scrollTop = 0; this.setScreen('list'); this.setLoader(false);
    this.setStack('List'); this.result.textContent = ''; delete this.result.dataset.tone;
  }
  setStack(t) { this.stack.textContent = t; }
  setScreen(name) {
    this.el.dataset.screen = name;
    $('.list-screen', this.el).inert = name !== 'list';
    $('.detail', this.el).inert = name !== 'detail';
  }
  async maybeLoad() {
    if (this.loading || this.loaded >= TOTAL) return;
    const s = this.scroller;
    const nearEnd = s.scrollTop + s.clientHeight >= s.scrollHeight - 80 || this.rover >= this.loaded - 1;
    if (!nearEnd) return;
    if (this.stuck) { this.setLoader(true); return; }
    this.loading = true; await wait(450); this.append(BATCH); this.loading = false;
  }
  async scrollTo(i) {
    while (this.loaded < i) { this.rover = this.loaded; this.scroller.scrollTop = this.scroller.scrollHeight; await this.maybeLoad(); }
    const b = this.item(i);
    const top = b.offsetTop - this.scroller.clientHeight / 2 + 30;
    this.scroller.scrollTo({ top, behavior: reduce() ? 'auto' : 'smooth' });
    await wait(650);
  }
  open(i, user = false) {
    this.opened = i; this.saved = this.scroller.scrollTop; this.setRover(i);
    $$('li', this.list).forEach(li => delete li.dataset.hit);
    this.title.textContent = this.name(i);
    this.setScreen('detail');
    const short = this.name(i).split(' · ')[0];
    this.setStack(this.mode === 'after' ? `List (kept) › ${short}` : `${short} (list discarded)`);
    if (user) this.backBtn.focus({ preventScroll: true });
  }
  back({ user = false, silent = false } = {}) {
    if (this.el.dataset.screen !== 'detail') return;
    const i = this.opened;
    this.setScreen('list');
    if (this.mode === 'after') {
      this.scroller.scrollTop = this.saved;
      const li = this.item(i)?.parentElement; if (li) li.dataset.hit = 'true';
      this.setStack('List (restored)');
      this.result.innerHTML = `<b>Back at item ${i}.</b> Scroll position and loaded items kept.`;
      this.result.dataset.tone = 'good';
      if (user) this.item(i)?.focus({ preventScroll: true });
    } else {
      this.list.replaceChildren(); this.loaded = 0; this.rover = 1; this.stuck = true; this.append(BATCH); this.setLoader(true);
      this.scroller.scrollTop = 0;
      this.setStack('List (rebuilt from the top)');
      this.result.innerHTML = '<b>Back at item 1.</b> The list reloaded and stopped loading.';
      this.result.dataset.tone = 'bad';
      if (user) this.item(1)?.focus({ preventScroll: true });
    }
    if (!silent) say(`${this.mode === 'after' ? 'After' : 'Before'}: ${this.result.textContent}`);
  }
}

const demo = $('.demo');
if (demo) {
  const phones = $$('.phone-col', demo).map(c => new Phone(c));
  const wrap = $('.phones', demo), play = $('[data-act="play"]', demo), resetBtn = $('[data-act="reset"]', demo);
  const radios = $$('input[name="demo-mode"]', demo);
  radios.forEach(r => r.addEventListener('change', () => { wrap.dataset.show = r.value; }));
  let running = false;
  const lock = on => {
    running = on;
    [play, resetBtn].forEach(b => b.setAttribute('aria-disabled', String(on)));
    radios.forEach(r => (r.disabled = on));
    phones.forEach(p => (p.el.inert = on));
    if (on) demo.setAttribute('aria-busy', 'true'); else demo.removeAttribute('aria-busy');
  };
  play.addEventListener('click', async () => {
    if (running) return;
    lock(true);
    // Both phones always run, so switching view or resizing never shows a half-finished comparison.
    phones.forEach(p => p.reset());
    say('Playing: scroll to item 14, open it, then go back.');
    await wait(300);
    await Promise.all(phones.map(p => p.scrollTo(TARGET)));
    phones.forEach(p => { const li = p.item(TARGET)?.parentElement; if (li) li.dataset.hit = 'true'; });
    await wait(500);
    phones.forEach(p => p.open(TARGET));
    await wait(1100);
    phones.forEach(p => p.back({ silent: true }));
    say('Before: back at item 1, the list reloaded and stopped loading. After: back at item 14, position kept.');
    play.textContent = 'Play again';
    lock(false);
    play.focus({ preventScroll: true });
  });
  resetBtn.addEventListener('click', () => { if (running) return; phones.forEach(p => p.reset()); play.textContent = 'Play'; say('Simulation reset.'); });
}

// Enlarge screenshots.
const lightbox = $('#lightbox');
if (lightbox) {
  let opener = null;
  document.addEventListener('click', e => {
    const z = e.target.closest('.zoom'); if (!z) return;
    opener = z; const img = $('img', lightbox);
    img.src = z.dataset.full; img.alt = $('img', z).alt;
    lightbox.showModal();
  });
  $('.lb-close', lightbox).addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => opener?.focus());
}
