// Brand platforms · Nosotras: the recreated "Estoy creciendo" page. Choosing a character rotates the cast and
// brings that character's world (colours) to the front, as in the designer's three XD home screens; the phone
// arrow does the same one character at a time. "Jugar" only explains where the real game lives.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const say = t => { const live = $('#live'); if (!live) return; live.textContent = ''; setTimeout(() => (live.textContent = t), 30); };
const replay = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

// Where each character stands in each world, in artboard units [x, y, width], measured on the XD home screens.
// Keys are in depth order: front, middle, back.
const WORLDS = ['utero', 'periodo', 'flujo'];
const CAST = {
  utero: { utero: [688, 150, 287], periodo: [895, 230, 191], flujo: [1025, 228, 202] },
  periodo: { periodo: [709, 128, 272], flujo: [928, 268, 153], utero: [1046, 275, 141] },
  flujo: { flujo: [720, 170, 236], utero: [927, 250, 143], periodo: [1033, 244, 177] },
};

const lab = $('.nos-lab');
if (lab) {
  // Desktop/Mobile switch; phones always get the mobile frame (same rule as frameSite in case.js).
  const site = $('.petys', lab), narrow = matchMedia('(max-width: 719px)');
  const fit = () => { site.dataset.device = narrow.matches ? 'mobile' : $('input[name="ns-device"]:checked', lab).value; };
  $$('input[name="ns-device"]', lab).forEach(r => r.addEventListener('change', fit));
  narrow.addEventListener('change', fit); fit();

  const chip = $('.pt-chip', lab);
  let timer;
  $$('.ns-play', lab).forEach(b => b.addEventListener('click', () => {
    chip.textContent = lab.dataset.play; chip.classList.add('show'); say(lab.dataset.play);
    clearTimeout(timer); timer = setTimeout(() => chip.classList.remove('show'), 3500);
  }));

  const hop = b => { if (!reduce()) replay(b, 'hop'); };
  $$('.ns-char', lab).forEach(b => b.addEventListener('animationend', e => {
    if (e.target === b) b.classList.remove('arc'); else b.classList.remove('hop', 'in');
  }));

  const desk = $$('.ns-hero .ns-char', lab), phone = $$('.ns-chars .ns-char', lab);
  const name = w => desk.find(b => b.dataset.char === w).getAttribute('aria-label');
  const setWorld = w => {
    const from = site.dataset.world;
    if (w === from) return;
    site.dataset.world = w;
    desk.forEach(b => {
      const c = b.dataset.char, [x, y, width] = CAST[w][c], rank = Object.keys(CAST[w]).indexOf(c);
      b.style.setProperty('--x', x); b.style.setProperty('--y', y); b.style.setProperty('--w', width);
      b.style.zIndex = 3 - rank;
      b.setAttribute('aria-pressed', String(rank === 0));
      if (c === from && !reduce()) replay(b, 'arc');
    });
    phone.forEach(b => { b.hidden = b.dataset.char !== w; });
    const now = phone.find(b => !b.hidden);
    if (now && !reduce()) replay(now, 'in');
    say(lab.dataset.front.replace('%s', name(w)));
  };

  desk.forEach(b => b.addEventListener('click', () => (site.dataset.world === b.dataset.char ? hop(b) : setWorld(b.dataset.char))));
  phone.forEach(b => b.addEventListener('click', () => hop(b)));
  $('.ns-next', lab)?.addEventListener('click', () => setWorld(WORLDS[(WORLDS.indexOf(site.dataset.world) + 1) % WORLDS.length]));
}
