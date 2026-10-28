// v10 · case pages: shared chrome (theme, copy, dock, sticky back), the lists recreation,
// the test scenario runner and the navigation simulation. Strings follow <html lang>.
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
// Reduced motion keeps the pauses (so each step is visible) and drops the animation itself.
const wait = ms => new Promise(r => setTimeout(r, reduce() ? Math.max(ms, 400) : ms));

const STRINGS = {
  en: {
    darkOn: 'Dark theme on', lightOn: 'Light theme on', copied: 'Email copied', copy: 'Copy: ', email: 'Email: ', soon: 'Coming soon: ',
    // Test runner
    run: 'Run scenario', running: 'Running…', passed: '1 scenario passed · 4 steps', runAgain: 'Run again', joined: 'when I joined (estimate)', after: 'afterwards',
    // Navigation simulation
    item: 'Item', open: 'Open', names: ['Camera', 'Headphones', 'Sneakers', 'Kettle', 'Backpack', 'Lamp', 'Blender', 'Sunglasses', 'Notebook', 'Speaker', 'Jacket', 'Plant'],
    of: 'of', loading: 'Loading more…', stuck: 'Loading more… (stuck)', stackList: 'List', kept: s => `List (kept) › ${s}`, discarded: s => `${s} (list discarded)`,
    restored: 'List (restored)', rebuilt: 'List (rebuilt from the top)',
    goodResult: i => `<b>Back at item ${i}.</b> Scroll position and loaded items kept.`, badResult: '<b>Back at item 1.</b> The list reloaded and stopped loading.',
    before: 'Before', afterW: 'After', play: 'Play', playAgain: 'Play again', navPlaying: 'Playing: scroll to item 14, open it, then go back.',
    navDone: 'Before: back at item 1, the list reloaded and stopped loading. After: back at item 14, position kept.', resetDone: 'Simulation reset.', coverage: 'Unit coverage:',
    tabs: ['My favorites', 'Lists (6)'], free: 'Free shipping', bar: ['Home', 'Categories', 'Cart', 'Videos', 'More'], search: 'Search products, brands and more…', buy: 'Buy now', cart: 'Add to cart', newItem: 'New', backDemo: 'Back (in demo)'
  },
  es: {
    darkOn: 'Tema oscuro activado', lightOn: 'Tema claro activado', copied: 'Correo copiado', copy: 'Copiar: ', email: 'Correo: ', soon: 'Muy pronto: ',
    run: 'Ejecutar escenario', running: 'Ejecutando…', passed: '1 escenario aprobado · 4 pasos', runAgain: 'Ejecutar de nuevo', joined: 'cuando llegué (estimado)', after: 'después',
    item: 'Ítem', open: 'Abrir', names: ['Cámara', 'Audífonos', 'Tenis', 'Hervidor', 'Morral', 'Lámpara', 'Licuadora', 'Gafas de sol', 'Cuaderno', 'Parlante', 'Chaqueta', 'Planta'],
    of: 'de', loading: 'Cargando más…', stuck: 'Cargando más… (atascado)', stackList: 'Lista', kept: s => `Lista (conservada) › ${s}`, discarded: s => `${s} (lista descartada)`,
    restored: 'Lista (restaurada)', rebuilt: 'Lista (reconstruida desde arriba)',
    goodResult: i => `<b>De vuelta en el ítem ${i}.</b> Se conservan la posición y los ítems cargados.`, badResult: '<b>De vuelta en el ítem 1.</b> La lista se recargó y dejó de cargar.',
    before: 'Antes', afterW: 'Después', play: 'Reproducir', playAgain: 'Reproducir otra vez', navPlaying: 'Reproduciendo: bajar hasta el ítem 14, abrirlo y volver.',
    navDone: 'Antes: de vuelta en el ítem 1, la lista se recargó y dejó de cargar. Después: de vuelta en el ítem 14, con la posición conservada.', resetDone: 'Simulación reiniciada.', coverage: 'Cobertura unitaria:',
    tabs: ['Mis favoritos', 'Listas (6)'], free: 'Envío gratis', bar: ['Inicio', 'Categorías', 'Carrito', 'Videos', 'Más'], search: 'Buscar productos, marcas y más…', buy: 'Comprar ahora', cart: 'Agregar al carrito', newItem: 'Nuevo', backDemo: 'Volver (en la demo)'
  }
};
const T = STRINGS[root.lang.slice(0, 2)] || STRINGS.en;

const slug = location.pathname.split('/').filter(Boolean).pop();
try { sessionStorage.setItem('jota-v10-last-case', slug); } catch { /* storage unavailable */ }

// Theme, shared with the home page.
const state = Object.assign({ scale: 'compact', theme: 'system' }, store.get('jota-v10', {}));
const isDark = () => state.theme === 'dark' || (state.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
function applyPrefs() {
  root.dataset.scale = state.scale;
  if (state.theme === 'system') delete root.dataset.theme; else root.dataset.theme = state.theme;
  $('#themeBtn')?.setAttribute('aria-pressed', String(isDark()));
  store.set('jota-v10', state);
}
applyPrefs();
$('#themeBtn')?.addEventListener('click', () => { state.theme = isDark() ? 'light' : 'dark'; applyPrefs(); say(isDark() ? T.darkOn : T.lightOn); });

document.addEventListener('click', async e => {
  const b = e.target.closest('[data-copy]');
  if (b) {
    try { await navigator.clipboard.writeText(b.dataset.copy); toast(T.copied); say(T.copied); }
    catch { toast(T.copy + b.dataset.copy); say(T.email + b.dataset.copy); }
  }
  const t = e.target.closest('[data-todo]');
  if (t) { e.preventDefault(); toast(T.soon + t.dataset.todo); }
});
const footer = $('#contact');
if (footer) new IntersectionObserver(es => es.forEach(en => $('#dock')?.classList.toggle('away', en.isIntersecting)), { threshold: .15 }).observe(footer);

// Sticky back bar gets a hairline once the page scrolls under it.
const caseTop = $('.case-top');
if (caseTop) { const onScroll = () => caseTop.classList.toggle('stuck', scrollY > 8); addEventListener('scroll', onScroll, { passive: true }); onScroll(); }

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const IMG = '/design/v10/assets/meli-ui/';
const P = {
  camera: { t: 'Cámara Instantánea Fujifilm Instax Mini 12 Azul con Funda y Kit de Accesorios', img: 'camera', old: '450.530', price: '384.543', off: 14, q: [6, '64.091'], full: true },
  drybag: { t: 'Maleta Dry Bag Motocicleta C25 C3 Gris Fire Parts Gris', img: 'drybag-grey', cover: 'list-moto', old: '216.900', price: '195.210', off: 10, q: [3, '65.070'] },
  kx: { t: 'Inflador Eléctrico Portátil KX Pantalla Digital Batería Recargable Negro', img: 'inflator-kx', by: 'K6', price: '80.990', q: [3, '26.997'], full: true },
  mini: { t: 'Inflador Portatil Recargable Compresor Y Linterna Auto Moto Color Negro', img: 'inflator-mini', price: '182.900', q: [6, '30.483'] },
  maleta: { t: 'Maleta Dry Bag 40l Impermeable Maletyn Moto Aventura Viaje Negro', img: 'drybag-black', price: '189.500', paused: true },
  tenis: { t: 'Tenis Casuales Azul Marino', img: 'list-tenis', price: '279.900', q: [6, '46.650'] },
  cafe: { t: 'Jarra para Café de Vidrio 600 ml', img: 'list-cafe', price: '89.900', q: [3, '29.967'] },
  tech: { t: 'Audífonos Inalámbricos Over-Ear con Cancelación de Ruido Negro', img: 'list-tech', price: '1.149.000', q: [12, '95.750'], full: true },
  ropa: { t: 'Gafas de Sol Redondas Marco Dorado', img: 'list-ropa', price: '159.900', q: [3, '53.300'] },
  cocina: { t: 'Licuadora de Vidrio con 2 Vasos Moledores', img: 'list-cocina', price: '459.900', q: [6, '76.650'], full: true }
};
const ICON = {
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="4" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="14" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 14v6m-3-3h6" stroke="currentColor" stroke-width="1.6"/></svg>',
  cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h3l2 10h10l2-7H7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="10" cy="19" r="1.2" fill="currentColor"/><circle cx="17" cy="19" r="1.2" fill="currentColor"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m10 9 5 3-5 3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  more: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h11M4 17h7m6-3v6m-3-3h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16.5 16.5 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  pencil: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4.5 4.5 4.5L8 20.5H3.5V16Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  signal: '<svg viewBox="0 0 20 13" aria-hidden="true"><rect x="0" y="8" width="3.2" height="5" rx="1" fill="currentColor"/><rect x="5.5" y="5.5" width="3.2" height="7.5" rx="1" fill="currentColor"/><rect x="11" y="3" width="3.2" height="10" rx="1" fill="currentColor"/><rect x="16.5" y="0" width="3.2" height="13" rx="1" fill="currentColor"/></svg>',
  wifi: '<svg viewBox="0 0 18 13" aria-hidden="true"><path d="M1 4.6a11 11 0 0 1 16 0M3.6 7.6a7 7 0 0 1 10.8 0M6.3 10.5a3.200 3.200 0 0 1 5.400 0" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/></svg>',
  battery: '<svg viewBox="0 0 28 13" aria-hidden="true"><rect x=".6" y=".6" width="23" height="11.800" rx="3.600" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.200"/><rect x="2.400" y="2.400" width="19.200" height="8.200" rx="2.200" fill="currentColor"/><path d="M25.500 4.500v4a2 2 0 0 0 0-4Z" fill="currentColor" fill-opacity=".45"/></svg>'
};
const iosTop = (head) => `<div class="n-top"><div class="n-status" aria-hidden="true"><span class="n-time">9:41</span><span class="n-sys">${ICON.signal}${ICON.wifi}${ICON.battery}</span></div><div class="n-head">${head}</div></div>`;
const iosBar = () => `<div class="n-bar" aria-hidden="true">${['home', 'grid', 'cart', 'play', 'more'].map((k, n) => `<span${n === 4 ? ' class="on"' : ''}>${ICON[k]}<small>${T.bar[n]}</small></span>`).join('')}</div>`;
const iosChrome = '<i class="n-island" aria-hidden="true"></i><i class="n-home" aria-hidden="true"></i>';

// 01 · Lists: a recreation of the shipped Favorites and Lists screens, rebuilt from the owner's captures.
// Product photos, titles and prices come from those captures where they show them; the rest is sample data.
const meli = $('.meli');
if (meli) {
  const UI = {
    en: {
      crumbs: ['Purchases', 'Favorites'], favorites: 'Favorites', createList: 'Create list', myFavs: 'My favorites', lists: n => `Lists (${n})`,
      listOf: 'List of products', products: n => `${n} ${n === 1 ? 'product' : 'products'}`, addToList: 'Add to list', remove: 'Delete',
      editName: 'Edit name', deleteList: 'Delete list', back: 'Back to Lists', createNew: 'Create new list', def: 'Default', confirm: 'Confirm',
      goLists: 'Go to my lists', listName: 'List name', create: 'Create', save: 'Save', close: 'Close', more: 'More actions', search: 'Search products, brands and more…',
      free: 'Free shipping', paused: 'Listing paused', by: s => `By ${s}`, q: (n, a) => `${n} installments of $ ${a} interest-free`,
      deleteSel: 'Delete selected favorites', selectAll: 'Select all favorites', select: t => `Select ${t}`, empty: 'This list has no products yet.',
      emptyFavs: 'You have no favorites yet.', savedTo: n => `Saved to ${n} ${n === 1 ? 'list' : 'lists'}`, removedFrom: 'Removed from all your lists',
      removedFav: 'Removed from favorites', removedItem: 'Removed from the list', created: n => `List “${n}” created`, renamed: 'You edited the list.',
      deleted: n => `List “${n}” deleted`, deletedSel: n => `${n} ${n === 1 ? 'favorite' : 'favorites'} deleted`, nameFirst: 'Give the list a name',
      playing: 'Playing: add the camera to a list, then open that list.', createTitle: 'Create product list', createHint: 'Organize your favorite products for your next purchase.', editList: 'Edit list', emptyTitle: 'Add your favorite products to this list', emptySub: 'You can add them from My favorites or from the product page.', addFavs: 'Add My favorites', opens: n => `Open list ${n}`
    },
    es: {
      crumbs: ['Compras', 'Favoritos'], favorites: 'Favoritos', createList: 'Crear lista', myFavs: 'Mis favoritos', lists: n => `Listas (${n})`,
      listOf: 'Lista de productos', products: n => `${n} ${n === 1 ? 'producto' : 'productos'}`, addToList: 'Agregar a lista', remove: 'Eliminar',
      editName: 'Editar nombre', deleteList: 'Eliminar lista', back: 'Volver a Listas', createNew: 'Crear nueva lista', def: 'Predeterminada', confirm: 'Confirmar',
      goLists: 'Ir a mis listas', listName: 'Nombre de la lista', create: 'Crear', save: 'Guardar', close: 'Cerrar', more: 'Más acciones', search: 'Buscar productos, marcas y más…',
      free: 'Envío gratis', paused: 'Publicación pausada', by: s => `Por ${s}`, q: (n, a) => `${n} cuotas de $ ${a} con 0% interés`,
      deleteSel: 'Eliminar favoritos seleccionados', selectAll: 'Seleccionar todos los favoritos', select: t => `Seleccionar ${t}`, empty: 'Esta lista todavía no tiene productos.',
      emptyFavs: 'Todavía no tienes favoritos.', savedTo: n => `Guardado en ${n} ${n === 1 ? 'lista' : 'listas'}`, removedFrom: 'Quitado de todas tus listas',
      removedFav: 'Quitado de favoritos', removedItem: 'Quitado de la lista', created: n => `Lista «${n}» creada`, renamed: 'Editaste la lista.',
      deleted: n => `Lista «${n}» eliminada`, deletedSel: n => `${n} ${n === 1 ? 'favorito eliminado' : 'favoritos eliminados'}`, nameFirst: 'Ponle un nombre a la lista',
      playing: 'Reproduciendo: agregar la cámara a una lista y abrir esa lista.', createTitle: 'Crear lista de productos', createHint: 'Organiza tus productos favoritos para tu próxima compra.', editList: 'Editar lista', emptyTitle: 'Agrega tus productos favoritos a esta lista', emptySub: 'Puedes agregarlos desde Mis Favoritos o desde la página del producto.', addFavs: 'Agregar Mis favoritos', opens: n => `Abrir la lista ${n}`
    }
  };
  const U = UI[root.lang.slice(0, 2)] || UI.en;
  const fresh = () => ({
    mode: 'after', view: 'favs', favs: ['camera', 'drybag'],
    lists: [['moto', 'Moto', ['drybag', 'kx', 'mini', 'maleta']], ['tenis', 'Tenis', ['tenis']], ['cafe', 'cafe', ['cafe']], ['tech', 'Tecnología', ['tech']], ['ropa', 'Ropa', ['ropa']], ['cocina', 'Cocina', ['cocina']]]
      .map(([id, name, items]) => ({ id, name, items: [...items] })),
    legacy: Object.keys(P), sel: new Set(), modal: null, menu: null, renaming: null, fresh: null, focus: null
  });
  let S = fresh();
  const lab = meli.closest('.lab'), win = $('.meli-win', meli), mtoast = $('.m-toast', meli);
  const svgPlus = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6"/></svg>';
  const svgHeart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="currentColor"/></svg>';
  const svgBolt = '<svg viewBox="0 0 9 12" aria-hidden="true"><path d="M5.5 0 0 7h3.5L3 12l6-7.5H5.5Z" fill="currentColor"/></svg>';
  const svgPen = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10.5 2.5 3 3L5 14H2v-3Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  const svgSearch = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 5 5" stroke="currentColor" stroke-width="1.5"/></svg>';
  const list = id => S.lists.find(l => l.id === id);
  const isMobile = () => meli.dataset.device === 'mobile';
  const img = (id, cover) => `${IMG}${(cover && P[id].cover) || P[id].img}.jpg`;
  const say3 = t => { mtoast.textContent = t; mtoast.classList.add('on'); clearTimeout(mtoast._t); mtoast._t = setTimeout(() => mtoast.classList.remove('on'), 2000); say(t); };

  const info = id => {
    const p = P[id];
    return `<p class="m-title">${esc(p.t)}</p>${p.by ? `<span class="m-by">${U.by(p.by)}</span>` : ''}${p.old ? `<s class="m-old">$ ${p.old}</s>` : ''}`
      + `<span class="m-price">$ ${p.price}${p.off ? `<span class="m-off">${p.off}% OFF</span>` : ''}</span>${p.q ? `<span class="m-q">${U.q(...p.q)}</span>` : ''}`
      + (p.paused ? `<span class="m-paused">${U.paused}</span>` : `<span class="m-ship">${U.free}${p.full ? ` <span class="m-full">${svgBolt}FULL</span>` : ''}</span>`);
  };
  const row = (id, acts) => `<li class="m-row"><img src="${img(id)}" alt="" loading="lazy"><div class="m-info">${info(id)}<div class="m-acts">${acts}</div></div></li>`;
  const menu = l => `<div class="m-menu" role="menu"><button type="button" role="menuitem" data-a="rename" data-id="${l.id}" data-k="mi-rename">${U.editName}</button><button type="button" role="menuitem" data-a="del-list" data-id="${l.id}" data-k="mi-del">${U.deleteList}</button></div>`;
  const kebab = (l, k) => `<button type="button" class="m-kebab" data-a="menu" data-id="${l.id}" data-k="${k}" aria-haspopup="menu" aria-expanded="${S.menu === l.id}" aria-label="${U.more}: ${esc(l.name)}">⋮</button>`;
  const renameForm = l => `<form class="m-rename" data-submit="rename-save" data-id="${l.id}"><label class="sr" for="rn-${l.id}">${U.listName}</label><input class="m-input" id="rn-${l.id}" data-k="rn" value="${esc(l.name)}" maxlength="30" autocomplete="off"><button class="m-link" type="submit">${U.save}</button></form>`;

  const header = () => `<p class="m-crumb">${U.crumbs[0]}<span aria-hidden="true">›</span>${U.crumbs[1]}</p>`;
  function legacy() {
    const all = S.legacy.length && S.legacy.every(id => S.sel.has(id));
    return `${isMobile() ? '' : header() + `<div class="m-headrow"><p class="m-h1">${U.favorites}</p></div>`}
      <div class="m-rows"><div class="m-selall"><input type="checkbox" data-a="sel-all" data-k="sel-all" aria-label="${U.selectAll}"${all ? ' checked' : ''}><button type="button" class="m-link" data-a="del-sel" data-k="del-sel"${S.sel.size ? '' : ' disabled'}>${U.deleteSel}</button></div>
      <ul class="m-rows" style="box-shadow:none">${S.legacy.map(id => `<li class="m-row legacy"><input type="checkbox" data-a="sel" data-id="${id}" data-k="sel-${id}" aria-label="${esc(U.select(P[id].t))}"${S.sel.has(id) ? ' checked' : ''}><img src="${img(id)}" alt="" loading="lazy"><div class="m-info">${info(id)}<div class="m-acts"><button type="button" class="m-link" data-a="legacy-rm" data-id="${id}" data-k="lrm-${id}">${U.remove}</button></div></div></li>`).join('') || `<li class="m-empty">${U.emptyFavs}</li>`}</ul></div>`;
  }
  function home() {
    const tab = (v, label) => `<button type="button" role="tab" aria-selected="${S.view === v}" data-a="tab" data-v="${v}" data-k="tab-${v}">${label}</button>`;
    const body = S.view === 'favs'
      ? `<ul class="m-rows">${S.favs.map(id => row(id, `<button type="button" class="m-link" data-a="add" data-id="${id}" data-k="add-${id}">${U.addToList}</button><button type="button" class="m-link" data-a="unfav" data-id="${id}" data-k="unfav-${id}">${U.remove}</button>`)).join('') || `<li class="m-empty">${U.emptyFavs}</li>`}</ul>`
      : `<ul class="m-grid">${S.lists.map(l => `<li class="m-card${l.id === S.fresh ? ' fresh' : ''}">
          <button type="button" class="m-cover" data-a="open" data-id="${l.id}" data-k="open-${l.id}" aria-label="${esc(U.opens(l.name))}">${l.items[0] ? `<img src="${img(l.items[0], true)}" alt="" loading="lazy">` : `<span class="m-ph">${svgHeart}</span>`}${l.items.length > 1 ? `<span class="m-coll">${l.items.slice(0, l.items.length > 3 ? 3 : l.items.length).map(x => `<img src="${img(x)}" alt="">`).join('')}${l.items.length > 3 ? `<b>+${l.items.length - 3}</b>` : ''}</span>` : ''}</button>
          <div class="m-cinfo">${S.renaming === l.id ? renameForm(l) : `<button type="button" class="m-cname" data-a="open" data-id="${l.id}" tabindex="-1">${esc(l.name)}</button>`}
            <p class="m-csub">${U.listOf}</p><p class="m-csub">${U.products(l.items.length)}</p>${kebab(l, 'menu-' + l.id)}${S.menu === l.id ? menu(l) : ''}</div></li>`).join('')}</ul>`;
    return `${isMobile() ? '' : header() + `<div class="m-headrow"><p class="m-h1">${U.favorites}</p><button type="button" class="m-btn" data-a="create" data-k="create">${svgPlus}${U.createList}</button></div>`}
      <div class="m-tabs" role="tablist">${tab('favs', U.myFavs)}${tab('lists', U.lists(S.lists.length))}</div>${body}`;
  }
  const emptyList = () => `<div class="m-emptyn"><span class="m-heartc">${ICON.heart}</span><p class="m-et">${U.emptyTitle}</p><p class="m-es">${U.emptySub}</p><button type="button" class="m-link" data-a="tab" data-v="favs" data-k="tab-favs">${U.addFavs}</button></div>`;
  function detail() {
    const l = list(S.view.slice(5));
    if (isMobile()) return `<div class="m-dhead"><p class="m-h1">${esc(l.name)}</p><button type="button" class="m-pen" data-a="menu" data-id="${l.id}" data-k="dmenu" aria-haspopup="menu" aria-expanded="${S.menu === l.id}" aria-label="${U.more}">${ICON.pencil}</button>${S.menu === l.id ? menu(l) : ''}</div>
      ${l.items.length ? `<ul class="m-rows">${l.items.map(id => row(id, `<button type="button" class="m-link" data-a="rm-item" data-id="${id}" data-k="rm-${id}">${U.remove}</button>`)).join('')}</ul>` : emptyList()}`;
    return `<button type="button" class="m-back" data-a="tab" data-v="lists" data-k="back">‹ ${U.back}</button>
      <div class="m-headrow">${S.renaming === l.id ? renameForm(l) : `<p class="m-h1">${esc(l.name)}</p>`}
        <div class="m-dmeta"><span>${U.products(l.items.length)}</span><span class="m-sep" aria-hidden="true"></span><button type="button" class="m-link" data-a="rename" data-id="${l.id}" data-k="drename">${svgPen}${U.editName}</button>${kebab(l, 'dmenu')}${S.menu === l.id ? menu(l) : ''}</div></div>
      <ul class="m-rows">${l.items.map(id => row(id, `<button type="button" class="m-link" data-a="rm-item" data-id="${id}" data-k="rm-${id}">${U.remove}</button>`)).join('') || `<li class="m-empty">${U.empty}</li>`}</ul>`;
  }
  function modal() {
    const M = S.modal;
    if (!M) return '';
    const form = submit => `<form class="m-newform" data-submit="${submit}"><label class="sr" for="m-new">${U.listName}</label><input class="m-input" id="m-new" data-k="m-new" placeholder="${U.listName}" maxlength="30" autocomplete="off"><button type="submit" class="m-btn">${U.create}</button></form>`;
    const opt = (id, name, thumb, sub = '') => `<li><label class="m-opt"><span class="m-thumb">${thumb}</span><span>${esc(name)}${sub}</span><input type="checkbox" data-a="chk" data-id="${id}" data-k="chk-${id}"${M.checked.has(id) ? ' checked' : ''}></label></li>`;
    const sheet = (submit, value, btn, locked) => `<form class="m-sheetform" data-submit="${submit}" data-id="${M.id || ''}">${M.type === 'create' ? `<p class="m-hint">${U.createHint}</p>` : ''}<label class="sr" for="m-new">${U.listName}</label><input class="m-input" id="m-new" data-k="m-new" data-orig="${esc(value)}" placeholder="${U.listName}" value="${esc(value)}" maxlength="25" autocomplete="off"><span class="m-count" aria-hidden="true">${value.length} / 25</span><button type="submit" class="m-btn m-wide"${locked ? ' disabled' : ''}>${btn}</button></form>`;
    const body = isMobile() && M.type === 'create' ? sheet('new-list', '', U.createList, false)
      : isMobile() && M.type === 'rename' ? sheet('rename-sheet', list(M.id).name, U.confirm, true)
      : M.type === 'create' ? form('new-list')
      : (M.creating ? form('new-in-add') : `<button type="button" class="m-newrow" data-a="creating" data-k="creating"><span class="m-plus" aria-hidden="true">+</span>${U.createNew}</button>`)
        + `<ul class="m-opts">${opt('favs', U.myFavs, svgHeart, `<small>${U.def}</small>`)}${S.lists.map(l => opt(l.id, l.name, l.items[0] ? `<img src="${img(l.items[0])}" alt="">` : '')).join('')}</ul>`;
    const foot = M.type === 'add' ? `<div class="m-mfoot"><button type="button" class="m-btn" data-a="confirm" data-k="confirm">${U.confirm}</button><button type="button" class="m-link" data-a="golists" data-k="golists">${U.goLists}</button></div>` : '';
    return `<div class="m-scrim" data-a="scrim"><div class="m-modal" role="dialog" aria-modal="true" aria-labelledby="m-mt"><div class="m-mhead"><p class="m-mtitle" id="m-mt">${M.type === 'add' ? U.addToList : M.type === 'rename' ? U.editList : isMobile() ? U.createTitle : U.createList}</p><button type="button" class="m-x" data-a="close" data-k="close" aria-label="${U.close}">×</button></div><div class="m-mbody">${body}</div>${foot}</div></div>`;
  }
  let lastView = '';
  function render() {
    const inside = win.contains(document.activeElement);
    const k = S.focus || (inside ? document.activeElement.dataset.k : null);
    const sc = $('.m-scroll', win), viewKey = S.mode + S.view, st = sc && viewKey === lastView ? sc.scrollTop : 0;
    const body = S.mode === 'before' ? legacy() : S.view.startsWith('list:') ? detail() : home();
    if (isMobile()) {
      const inList = S.mode !== 'before' && S.view.startsWith('list:');
      const head = inList
        ? `<button type="button" class="n-arrow" data-a="tab" data-v="lists" data-k="back" aria-label="${U.back}">${ICON.back}</button><span class="n-arrow n-sr" aria-hidden="true">${ICON.search}</span>`
        : `<span class="n-arrow" aria-hidden="true">${ICON.back}</span>`;
      const fab = !inList && S.mode !== 'before' ? `<button type="button" class="n-fab${st > 24 ? ' collapsed' : ''}" data-a="create" data-k="create" aria-label="${U.createList}">${svgPlus}<span>${U.createList}</span></button>` : '';
      win.innerHTML = iosTop(head) + `<div class="m-scroll"><div class="m-page">${body}</div></div>${fab}${iosBar()}${iosChrome}${modal()}`;
    } else {
      win.innerHTML = `<div class="m-top" aria-hidden="true"><div class="m-search"><span>${U.search}</span>${svgSearch}</div></div>`
        + `<div class="m-scroll"><div class="m-page">${body}</div></div>${modal()}`;
    }
    $('.m-scroll', win).scrollTop = st; lastView = viewKey;
    if (S.modal) $('.m-scroll', win).inert = true;
    if (k && (S.focus || inside)) { const el = $(`[data-k="${k}"]`, win); el?.focus({ preventScroll: true }); if (el?.select && k !== 'm-new') el.select(); }
    S.focus = null;
  }
  function closeModal() { S.focus = S.modal?.opener || 'create'; S.modal = null; }
  function act(a, d = {}) {
    const id = d.id;
    switch (a) {
      case 'tab': Object.assign(S, { view: d.v, menu: null, renaming: null, focus: d.k === 'back' ? 'tab-lists' : null }); break;
      case 'open': Object.assign(S, { view: 'list:' + id, menu: null, renaming: null, focus: 'back' }); break;
      case 'create': S.modal = { type: 'create', opener: 'create' }; S.focus = 'm-new'; break;
      case 'add': S.modal = { type: 'add', pid: id, opener: 'add-' + id, creating: false, checked: new Set([...(S.favs.includes(id) ? ['favs'] : []), ...S.lists.filter(l => l.items.includes(id)).map(l => l.id)]) }; S.focus = 'creating'; break;
      case 'unfav': S.favs = S.favs.filter(x => x !== id); say3(U.removedFav); S.focus = 'tab-favs'; break;
      case 'creating': S.modal.creating = true; S.focus = 'm-new'; break;
      case 'new-in-add': case 'new-list': {
        const name = $('#m-new', win).value.trim();
        if (!name) { say3(U.nameFirst); $('#m-new', win).focus(); return; }
        const l = { id: 'n' + Date.now(), name, items: [] };
        S.lists.unshift(l); say3(U.created(name));
        if (a === 'new-in-add') { S.modal.creating = false; S.modal.checked.add(l.id); S.focus = 'chk-' + l.id; }
        else { S.modal = null; Object.assign(S, { view: 'lists', fresh: l.id, focus: 'open-' + l.id }); }
        break;
      }
      case 'close': case 'scrim': closeModal(); break;
      case 'confirm': case 'golists': {
        const { pid, checked } = S.modal;
        const inFav = S.favs.includes(pid);
        if (checked.has('favs') && !inFav) S.favs.unshift(pid);
        if (!checked.has('favs') && inFav) S.favs = S.favs.filter(x => x !== pid);
        S.lists.forEach(l => { const has = l.items.includes(pid); if (checked.has(l.id) && !has) l.items.unshift(pid); if (!checked.has(l.id) && has) l.items = l.items.filter(x => x !== pid); });
        say3(checked.size ? U.savedTo(checked.size) : U.removedFrom);
        closeModal();
        if (a === 'golists') Object.assign(S, { view: 'lists', focus: 'tab-lists', fresh: null });
        break;
      }
      case 'menu': S.menu = S.menu === id ? null : id; S.focus = S.menu ? 'mi-rename' : d.k; break;
      case 'rename':
        S.menu = null;
        if (isMobile()) { S.modal = { type: 'rename', id, opener: S.view.startsWith('list:') ? 'dmenu' : 'menu-' + id }; S.focus = 'm-new'; }
        else { S.renaming = id; S.focus = 'rn'; }
        break;
      case 'rename-sheet': {
        const l = list(id), v = $('#m-new', win).value.trim();
        if (v && v !== l.name) { l.name = v; say3(U.renamed); }
        S.modal = null; S.focus = S.view.startsWith('list:') ? 'dmenu' : 'open-' + id; break;
      }
      case 'rename-save': {
        const l = list(id), v = $('#rn-' + id, win).value.trim();
        if (v && v !== l.name) { l.name = v; say3(U.renamed); }
        S.renaming = null; S.focus = S.view.startsWith('list:') ? 'drename' : 'open-' + id; break;
      }
      case 'del-list': {
        const l = list(id); S.lists = S.lists.filter(x => x !== l); say3(U.deleted(l.name));
        Object.assign(S, { menu: null, view: 'lists', focus: 'tab-lists' }); break;
      }
      case 'rm-item': { const l = list(S.view.slice(5)); l.items = l.items.filter(x => x !== id); say3(U.removedItem); S.focus = 'back'; break; }
      case 'legacy-rm': S.legacy = S.legacy.filter(x => x !== id); S.sel.delete(id); say3(U.removedFav); S.focus = 'sel-all'; break;
      case 'del-sel': { const n = S.sel.size; S.legacy = S.legacy.filter(x => !S.sel.has(x)); S.sel.clear(); say3(U.deletedSel(n)); S.focus = 'sel-all'; break; }
    }
    render();
  }

  win.addEventListener('click', e => {
    if (S.menu && !e.target.closest('.m-menu, .m-kebab')) { S.menu = null; render(); }
    const b = e.target.closest('[data-a]');
    if (!b || b.tagName === 'INPUT' || b.disabled) return;
    if (b.dataset.a === 'scrim' && e.target !== b) return;
    act(b.dataset.a, b.dataset);
  });
  win.addEventListener('input', e => {
    const i = e.target; if (!i.matches('.m-input[data-k="m-new"]')) return;
    const c = $('.m-count', win); if (c) c.textContent = `${i.value.length} / 25`;
    const b = $('.m-sheetform .m-btn', win); if (b && 'orig' in i.dataset) b.disabled = !i.value.trim() || i.value.trim() === i.dataset.orig;
  });
  win.addEventListener('scroll', e => {
    if (!e.target.matches?.('.m-scroll')) return;
    $('.n-fab', win)?.classList.toggle('collapsed', e.target.scrollTop > 24);
  }, true);
  win.addEventListener('change', e => {
    const i = e.target, a = i.dataset.a;
    if (a === 'chk') { const c = S.modal.checked; i.checked ? c.add(i.dataset.id) : c.delete(i.dataset.id); }
    if (a === 'sel') { i.checked ? S.sel.add(i.dataset.id) : S.sel.delete(i.dataset.id); render(); }
    if (a === 'sel-all') { S.sel = new Set(i.checked ? S.legacy : []); render(); }
  });
  win.addEventListener('submit', e => { e.preventDefault(); act(e.target.dataset.submit, e.target.dataset); });
  win.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (S.modal) { e.preventDefault(); closeModal(); render(); }
      else if (S.menu) { e.preventDefault(); S.focus = S.view.startsWith('list:') ? 'dmenu' : 'menu-' + S.menu; S.menu = null; render(); }
      else if (S.renaming) { e.preventDefault(); S.focus = S.view.startsWith('list:') ? 'drename' : 'open-' + S.renaming; S.renaming = null; render(); }
    }
    if (e.key === 'Tab' && S.modal) { // keep focus inside the dialog
      const f = $$('button, input', $('.m-modal', win)).filter(x => !x.disabled);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
      else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
    }
  });

  const radiosMode = $$('input[name="ml-mode"]', lab), radiosDev = $$('input[name="ml-device"]', lab);
  radiosMode.forEach(r => r.addEventListener('change', () => { Object.assign(S, { mode: r.value, modal: null, menu: null, renaming: null }); meli.dataset.mode = r.value; render(); }));
  // On a phone the recreation is always the mobile version; the device switch is hidden there.
  const narrow = matchMedia('(max-width: 719px)');
  const fitDevice = () => { meli.dataset.device = narrow.matches ? 'mobile' : $('input[name="ml-device"]:checked', lab).value; };
  const setDevice = () => { fitDevice(); render(); };
  radiosDev.forEach(r => r.addEventListener('change', setDevice));
  narrow.addEventListener('change', setDevice); fitDevice();

  // Play: add the camera to a list, then open that list.
  const playBtn = $('[data-act="ml-play"]', lab);
  let playing = false;
  playBtn.addEventListener('click', async () => {
    if (playing) return;
    playing = true; playBtn.setAttribute('aria-disabled', 'true'); say(U.playing);
    $('input[name="ml-mode"][value="after"]', lab).checked = true; meli.dataset.mode = 'after'; S = fresh(); render();
    win.scrollIntoView({ block: 'nearest', behavior: reduce() ? 'auto' : 'smooth' });
    await wait(600); act('add', { id: 'camera' }); await wait(900);
    S.modal.checked.add('tech'); S.focus = 'chk-tech'; render(); await wait(900);
    act('confirm'); await wait(1000);
    act('tab', { v: 'lists' }); await wait(1100);
    act('open', { id: 'tech' }); await wait(1600);
    act('tab', { v: 'lists', k: 'back' });
    playing = false; playBtn.removeAttribute('aria-disabled'); playBtn.focus({ preventScroll: true });
  });

  // Reset returns the recreation to its first state.
  $('[data-act="ml-reset"]', lab).addEventListener('click', () => {
    $('input[name="ml-mode"][value="after"]', lab).checked = true; meli.dataset.mode = 'after';
    S = fresh(); render(); say(T.resetDone);
  });
  render();
}

// 02 · The scenario runs step by step; once it passes, coverage fills from the planned 60% to 80%+.
const cov = $('.coverage');
let covered = false;
const fillCoverage = () => {
  if (!cov || covered) return;
  covered = true;
  const fill = $('.cov-fill', cov), val = $('.cov-val', cov), sub = $('.cov-sub', cov);
  fill.style.width = '82%';
  const t0 = performance.now(), dur = reduce() ? 0 : 1400;
  const tick = now => { const k = dur ? Math.min(1, (now - t0) / dur) : 1; val.textContent = Math.round(60 + 22 * (1 - Math.pow(1 - k, 3))) + '%'; if (k < 1) requestAnimationFrame(tick); else { val.textContent = '80%+'; sub.textContent = T.after; say(`${T.coverage} 80%+`); } };
  requestAnimationFrame(tick);
};
const runBtn = $('[data-act="run"]');
if (runBtn) {
  const fig = runBtn.closest('.gherkin'), out = $('.out', fig), steps = $$('li.step', fig);
  let busy = false;
  runBtn.addEventListener('click', async () => {
    if (busy) return;
    busy = true; runBtn.setAttribute('aria-disabled', 'true'); out.textContent = T.running;
    steps.forEach(li => { delete li.dataset.state; $('.st', li).textContent = '·'; });
    for (const li of steps) { li.dataset.state = 'run'; await wait(450); li.dataset.state = 'pass'; $('.st', li).textContent = '\u2713'; }
    out.textContent = T.passed; runBtn.textContent = T.runAgain; busy = false; runBtn.removeAttribute('aria-disabled');
    fillCoverage();
  });
}

// 03 · Navigation simulation, drawn like the native Mercado Libre app. Products reuse the recreation's data; not Mercado Libre code.
const BATCH = 12, TOTAL = 48, TARGET = 14;
const U_Q = (n, a) => (root.lang.slice(0, 2) === 'es' ? `${n} cuotas de $ ${a} con 0% interés` : `${n} installments of $ ${a} interest-free`);
const NAV_IDS = ['camera', 'drybag', 'kx', 'mini', 'maleta', 'tenis', 'cafe', 'tech', 'ropa', 'cocina'];
const phoneHTML = () => `<div class="screen list-screen">
    ${iosTop(`<span class="n-arrow" aria-hidden="true">${ICON.back}</span><span class="count" aria-hidden="true"></span>`)}
    <div class="n-tabs" aria-hidden="true"><span class="on">${T.tabs[0]}</span><span>${T.tabs[1]}</span></div>
    <div class="scroller"><ul></ul><p class="loader"><i aria-hidden="true"></i><span class="sr"></span></p></div>
    ${iosBar()}
    <div class="n-loading" aria-hidden="true"><i></i></div>
  </div>
  <div class="screen detail">
    ${iosTop(`<button class="in-back" type="button" aria-label="${T.backDemo}">${ICON.back}</button><span class="n-search" aria-hidden="true">${T.search}</span>`)}
    <div class="body"><span class="d-new">${T.newItem}</span><h3></h3><img class="d-img" alt=""><p class="d-price"></p><p class="d-q"></p><span class="d-buy" aria-hidden="true">${T.buy}</span><span class="d-cart" aria-hidden="true">${T.cart}</span></div>
  </div>${iosChrome}`;
class Phone {
  constructor(col) {
    this.col = col; this.mode = col.dataset.mode;
    this.el = $('.phone', col); this.el.innerHTML = phoneHTML();
    this.list = $('ul', col); this.scroller = $('.scroller', col);
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
  product(i) { return P[NAV_IDS[(i - 1) % NAV_IDS.length]]; }
  label(i) { return `${T.item} ${String(i).padStart(2, '0')}`; }
  name(i) { return `${this.label(i)} · ${this.product(i).t}`; }
  row(i) {
    const p = this.product(i), li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.dataset.i = i; b.tabIndex = -1; b.setAttribute('aria-label', `${T.open} ${this.name(i)}`);
    b.innerHTML = `<img src="${IMG}${p.img}.jpg" alt=""><span class="n-info"><span class="n-t">${esc(p.t)}</span><span class="n-p">$ ${p.price}</span>${p.paused ? '' : `<span class="n-s">${T.free}</span>`}</span><span class="n-i" aria-hidden="true">${String(i).padStart(2, '0')}</span>`;
    li.append(b); return li;
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
  updateCount() { this.count.textContent = `${this.loaded} ${T.of} ${TOTAL}`; this.loader.hidden = this.loaded >= TOTAL && !this.stuck; }
  setLoader(stuck) { $('.sr', this.loader).textContent = stuck ? T.stuck : T.loading; this.loader.classList.toggle('stuck', stuck); }
  reset() {
    this.list.replaceChildren(); this.loaded = 0; this.rover = 1; this.stuck = false; this.loading = false; this.saved = 0; this.opened = null;
    delete this.el.dataset.loading;
    this.append(BATCH); this.scroller.scrollTop = 0; this.setScreen('list'); this.setLoader(false);
    this.setStack(T.stackList); this.result.textContent = ''; delete this.result.dataset.tone;
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
    const top = b.offsetTop - this.scroller.clientHeight / 2 + 40;
    this.scroller.scrollTo({ top, behavior: reduce() ? 'auto' : 'smooth' });
    await wait(650);
  }
  open(i, user = false) {
    const p = this.product(i);
    this.opened = i; this.saved = this.scroller.scrollTop; this.setRover(i);
    $$('li', this.list).forEach(li => delete li.dataset.hit);
    this.title.textContent = p.t;
    $('.d-img', this.el).src = `${IMG}${p.img}.jpg`;
    $('.d-price', this.el).textContent = `$ ${p.price}`;
    $('.d-q', this.el).textContent = p.q ? U_Q(...p.q) : '';
    this.setScreen('detail');
    this.setStack(this.mode === 'after' ? T.kept(this.label(i)) : T.discarded(this.label(i)));
    if (user) this.backBtn.focus({ preventScroll: true });
  }
  back({ user = false, silent = false } = {}) {
    if (this.el.dataset.screen !== 'detail') return;
    const i = this.opened;
    this.setScreen('list');
    if (this.mode === 'after') {
      this.scroller.scrollTop = this.saved;
      const li = this.item(i)?.parentElement; if (li) li.dataset.hit = 'true';
      this.setStack(T.restored);
      this.result.innerHTML = T.goodResult(i);
      this.result.dataset.tone = 'good';
      if (user) this.item(i)?.focus({ preventScroll: true });
    } else {
      // The app shows its loading screen while the page reloads, then the list starts again from the top.
      this.el.dataset.loading = 'true'; clearTimeout(this._load); this._load = setTimeout(() => delete this.el.dataset.loading, reduce() ? 500 : 1000);
      this.list.replaceChildren(); this.loaded = 0; this.rover = 1; this.stuck = true; this.append(BATCH); this.setLoader(true);
      this.scroller.scrollTop = 0;
      this.setStack(T.rebuilt);
      this.result.innerHTML = T.badResult;
      this.result.dataset.tone = 'bad';
      if (user) this.item(1)?.focus({ preventScroll: true });
    }
    if (!silent) say(`${this.mode === 'after' ? T.afterW : T.before}: ${this.result.textContent}`);
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
    say(T.navPlaying);
    await wait(300);
    await Promise.all(phones.map(p => p.scrollTo(TARGET)));
    phones.forEach(p => { const li = p.item(TARGET)?.parentElement; if (li) li.dataset.hit = 'true'; });
    await wait(500);
    phones.forEach(p => p.open(TARGET));
    await wait(1100);
    phones.forEach(p => p.back({ silent: true }));
    say(T.navDone);
    play.textContent = T.playAgain;
    lock(false);
    play.focus({ preventScroll: true });
  });
  resetBtn.addEventListener('click', () => { if (running) return; phones.forEach(p => p.reset()); play.textContent = T.play; say(T.resetDone); });
}

// The other four cases. Visible copy lives in each page; these tables hold only the strings the modules compose.
const lang = root.lang.slice(0, 2) === 'es' ? 'es' : 'en';
const UI2 = {
  en: {
    running: 'Running', busy: 'Rebuilding and redeploying…', redeployed: 'Redeployed', untouched: 'Untouched', mf: n => `Micro frontend ${n}`,
    typicalMsg: n => `<b>Shell redeployed ${n} ${n === 1 ? 'time' : 'times'}.</b> Every release waited for it, and every team depended on it.`,
    propMsg: n => `<b>Micro frontend ${n} is live.</b> Only the configuration changed; the shell was never rebuilt.`,
    me: 'Me', meLead: 'Me · cross-cutting lead', squad: n => `Squad ${n}`,
    match: n => `<b>${n} of ${n}</b> events arrived the same in both tools.`, promoted: e => `Deployed to <b>${e}</b>.`,
    certified: '<b>Certified in production.</b> Every point of the definition of done checked.', first: 'Send an event first, then promote.',
    step: (a, b) => `Step ${a} of ${b}: `, size: 'Text size', pieces: (a, b) => `${a} of ${b} pieces`, add: 'Add a piece', added: s => `Added: ${s}.`, restart: 'Start over'
  },
  es: {
    running: 'En ejecución', busy: 'Recompilando y redesplegando…', redeployed: 'Redesplegado', untouched: 'Intacto', mf: n => `Micro frontend ${n}`,
    typicalMsg: n => `<b>Shell redesplegado ${n} ${n === 1 ? 'vez' : 'veces'}.</b> Cada lanzamiento lo esperaba, y cada equipo dependía de él.`,
    propMsg: n => `<b>El micro frontend ${n} está en producción.</b> Solo cambió la configuración; el shell nunca se recompiló.`,
    me: 'Yo', meLead: 'Yo · líder transversal', squad: n => `Squad ${n}`,
    match: n => `<b>${n} de ${n}</b> eventos llegaron igual a las dos herramientas.`, promoted: e => `Desplegado en <b>${e}</b>.`,
    certified: '<b>Certificado en producción.</b> Cada punto de la definición de terminado, revisado.', first: 'Envía primero un evento y luego promueve.',
    step: (a, b) => `Paso ${a} de ${b}: `, size: 'Tamaño del texto', pieces: (a, b) => `${a} de ${b} piezas`, add: 'Agregar una pieza', added: s => `Agregado: ${s}.`, restart: 'Empezar de nuevo'
  }
}[lang];
const disable = (b, on) => (on ? b.setAttribute('aria-disabled', 'true') : b.removeAttribute('aria-disabled'));
const off = b => b.getAttribute('aria-disabled') === 'true';

// Bancolombia · 01: the foundation, one step at a time.
const build = $('.svp-build');
if (build) {
  const steps = $$('.sb-steps button', build), pieces = $$('.sb-board [data-step]', build);
  const n = $('.step-ctl .n', build), [prev, next] = $$('.step-ctl .btn', build);
  let at = 1;
  const go = (i, speak) => {
    at = Math.max(1, Math.min(steps.length, i));
    steps.forEach((b, k) => { if (k + 1 === at) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); b.classList.toggle('done', k + 1 < at); });
    pieces.forEach(p => { const s = +p.dataset.step; p.classList.toggle('on', s <= at); p.classList.toggle('now', s === at); });
    n.textContent = `${at} / ${steps.length}`; disable(prev, at === 1); disable(next, at === steps.length);
    if (speak) say(UI2.step(at, steps.length) + $('b', steps[at - 1]).textContent);
  };
  steps.forEach((b, k) => b.addEventListener('click', () => go(k + 1, true)));
  prev.addEventListener('click', () => { if (!off(prev)) go(at - 1, true); });
  next.addEventListener('click', () => { if (!off(next)) go(at + 1, true); });
  go(1);
}

// Bancolombia · 02: deploy a micro frontend with the shell as registry, or with a runtime configuration.
const shell = $('.shell-lab');
if (shell) {
  const deploy = $('[data-act="sh-deploy"]', shell), state = $('.sh-state', shell), count = $('.sh-count', shell), out = $('.out', shell);
  const mfs = $('.sh-mfs', shell), reg = $('.sh-reg', shell), conf = $('.sh-config code', shell), sh = $('.sh-shell', shell);
  const base = { mfs: mfs.innerHTML, reg: reg.innerHTML, conf: conf.innerHTML, out: out.innerHTML };
  let c = 0, next = 3, busy = false;
  const reset = () => {
    mfs.innerHTML = base.mfs; reg.innerHTML = base.reg; conf.innerHTML = base.conf; out.innerHTML = base.out;
    c = 0; next = 3; count.textContent = '0'; state.textContent = UI2.running; sh.classList.remove('calm'); disable(deploy, false);
  };
  $$('input[name="sh-mode"]', shell).forEach(r => r.addEventListener('change', () => { if (busy) return; shell.dataset.mode = r.value; reset(); }));
  deploy.addEventListener('click', async () => {
    if (busy || off(deploy)) return;
    const name = UI2.mf(next), proposal = shell.dataset.mode === 'proposal';
    busy = true; disable(deploy, true);
    if (proposal) {
      conf.innerHTML = conf.innerHTML.replace(/\n}$/, `,\n  <span class="add">"mf-${next}": "…"</span>\n}`);
      await wait(500); state.textContent = UI2.untouched; sh.classList.add('calm');
      out.innerHTML = UI2.propMsg(next);
    } else {
      shell.dataset.busy = ''; state.textContent = UI2.busy; await wait(1600); delete shell.dataset.busy;
      c++; count.textContent = c; reg.insertAdjacentHTML('beforeend', `<li>mf-${next}</li>`); state.textContent = UI2.redeployed;
      out.innerHTML = UI2.typicalMsg(c);
    }
    mfs.insertAdjacentHTML('beforeend', `<li class="new">${name}</li>`);
    say(out.textContent); next++; busy = false; disable(deploy, next > 7);
  });
}

// Bancolombia · 03: from one engineer to five squads. Dots are illustrative.
const team = $('.team-lab');
if (team) {
  const svg = $('.team-svg', team), out = $('.out', team), NS = 'http://www.w3.org/2000/svg', C = [320, 190];
  const el = (tag, attrs) => { const e = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v)); svg.append(e); return e; };
  const centers = [0, 1, 2, 3, 4].map(s => { const a = (-90 + s * 72) * Math.PI / 180; return [C[0] + 200 * Math.cos(a), C[1] + 140 * Math.sin(a)]; });
  const rings = centers.map(([x, y]) => el('circle', { class: 'ring', cx: x, cy: y, r: 38 }));
  const labels = centers.map(([x, y], s) => Object.assign(el('text', { x, y: y + 56 }), { textContent: UI2.squad(s + 1) }));
  const people = [];
  centers.forEach((_, s) => [0, 1, 2, 3].forEach(k => people.push({ s, k, c: el('circle', { r: k ? 6 : 8, class: k ? '' : 'lead' }) })));
  const me = el('circle', { r: 11, class: 'me' }), meText = el('text', { x: C[0], y: C[1] + 30 });
  const place = (p, x, y, o = 1) => { p.style.transform = `translate(${x}px, ${y}px)`; p.style.opacity = o; };
  const stage = st => {
    place(me, ...C); meText.textContent = st === '3' ? UI2.meLead : UI2.me;
    [...rings, ...labels].forEach(e => (e.style.opacity = st === '3' ? 1 : 0));
    people.forEach((p, i) => {
      if (st === '3') { const a = (p.k * 90 - 45) * Math.PI / 180, [x, y] = centers[p.s]; place(p.c, x + (p.k ? 22 * Math.cos(a) : 0), y + (p.k ? 22 * Math.sin(a) : 0)); }
      else if (st === '2' && i < 9) { const a = i * 40 * Math.PI / 180, r = 58 + (i % 3) * 16; place(p.c, C[0] + r * Math.cos(a), C[1] + r * Math.sin(a)); }
      else place(p.c, ...C, 0);
    });
    out.textContent = out.dataset['s' + st];
  };
  $$('input[name="team-stage"]', team).forEach(r => r.addEventListener('change', () => { stage(r.value); say(out.textContent); }));
  stage($('input[name="team-stage"]:checked', team).value);
}

// GoodRx · 03: the same user action, captured by both SDKs; then promote through the environments.
const streams = $('.streams-lab');
if (streams) {
  const [dd, gc] = $$('.stream ol', streams), match = $('.match', streams), out = $('.out', streams);
  const envs = $$('.envs li', streams), promote = $('[data-act="promote"]', streams);
  let sent = 0, env = 0;
  const rowHtml = (b, n) => `<li><span class="t">#${n}</span><span class="k${b.dataset.k === 'error' ? ' err' : ''}">${esc(b.dataset.kind)}</span>${esc(b.dataset.d)}</li>`;
  $$('[data-ev]', streams).forEach(b => b.addEventListener('click', async () => {
    sent++; $$('.streams-empty', streams).forEach(e => e.remove());
    const html = rowHtml(b, sent);
    dd.insertAdjacentHTML('beforeend', html);
    await wait(260); gc.insertAdjacentHTML('beforeend', html); match.insertAdjacentHTML('beforeend', '<li aria-hidden="true">✓</li>');
    [dd, gc, match].forEach(l => { while (l.children.length > 4) l.firstElementChild.remove(); });
    out.innerHTML = UI2.match(sent); say(out.textContent);
  }));
  const paint = () => envs.forEach((li, i) => { li.classList.toggle('done', i < env); li.classList.toggle('now', i === env); });
  promote.addEventListener('click', () => {
    if (off(promote)) return;
    if (!sent) { out.innerHTML = UI2.first; say(UI2.first); return; }
    env = Math.min(envs.length - 1, env + 1); paint();
    out.innerHTML = env === envs.length - 1 ? UI2.certified : UI2.promoted(envs[env].textContent);
    disable(promote, env === envs.length - 1); say(out.textContent);
  });
  paint();
}

// Desktop/Mobile frame shared by the brand-platform playgrounds; phones always get the mobile frame.
function frameSite(lab, name) {
  const site = $('.petys', lab), narrow = matchMedia('(max-width: 719px)');
  const fit = () => { site.dataset.device = narrow.matches ? 'mobile' : $(`input[name="${name}"]:checked`, lab).value; };
  $$(`input[name="${name}"]`, lab).forEach(r => r.addEventListener('change', fit));
  narrow.addEventListener('change', fit); fit();
  return site;
}

// Brand platforms · Petys: the site in desktop or phone, and a content change travelling from the CMS to the CDN.
const pipe = $('.pipe-lab');
if (pipe) {
  // Each step's explanation is persistent text in the list; only the completion is announced.
  const btn = $('[data-act="publish"]', pipe), nodes = $$('.rail li', pipe), chip = $('.pt-chip', pipe);
  frameSite(pipe, 'pt-device');
  btn.addEventListener('click', async () => {
    if (off(btn)) return;
    disable(btn, true); chip.classList.remove('show'); nodes.forEach(li => li.classList.remove('on', 'now'));
    for (const li of nodes) { li.classList.add('on', 'now'); await wait(650); li.classList.remove('now'); }
    say(pipe.dataset.done); chip.classList.add('show'); disable(btn, false);
  });
}

// Brand platforms · PRAGMA video: one clear Play over the poster; native controls take over once it plays.
// Without JS the video keeps its native controls and the overlay stays hidden.
const reel = $('.reel');
if (reel) {
  const video = $('video', reel), go = $('.reel-go', reel);
  const rest = on => { go.hidden = !on; video.controls = !on; };
  go.addEventListener('click', () => { rest(false); video.focus(); video.play().catch(() => { if (video.paused && !video.currentTime) rest(true); }); });
  video.addEventListener('play', () => rest(false));
  video.addEventListener('ended', () => { rest(true); go.focus(); });
  rest(true);
  // Fullscreen keeps the portrait frame (letterboxed, never cropped); phones that allow it stay in portrait.
  const lock = () => { const full = document.fullscreenElement || document.webkitFullscreenElement; try { if (full) screen.orientation?.lock?.('portrait').catch(() => {}); else screen.orientation?.unlock?.(); } catch {} };
  ['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, lock));
}

// Brand platforms · TENA: registration (user type, details, A-/A+) and Academy formats.
const tena = $('.tena');
if (tena) {
  const lab = tena.closest('.lab'), reg = $('.tn-reg', tena), acad = $('.tn-acad', tena), hint = $('.tn-hint', tena);
  const showHint = t => { hint.textContent = t; hint.classList.add('on'); clearTimeout(hint._t); hint._t = setTimeout(() => hint.classList.remove('on'), 2200); say(t); };
  $$('input[name="tn-view"]', lab).forEach(r => r.addEventListener('change', () => { reg.hidden = r.value !== 'reg'; acad.hidden = r.value !== 'acad'; }));
  const s1 = $('.tn-s1', tena), s2 = $('.tn-s2', tena);
  $$('.tn-type', tena).forEach(b => b.addEventListener('click', () => { s1.hidden = true; s2.hidden = false; $('[data-tn="back"]', tena).focus(); }));
  $('[data-tn="back"]', tena).addEventListener('click', () => { s2.hidden = true; s1.hidden = false; $('.tn-type', tena).focus(); });
  $('[data-tn="next"]', tena).addEventListener('click', () => showHint(tena.dataset.hint));
  $('.tn-help', tena).addEventListener('click', () => showHint(tena.dataset.hint));
  let tz = 1;
  const [minus, plus] = $$('.tn-az button', tena);
  const size = d => { tz = Math.round(Math.max(1, Math.min(1.3, tz + d)) * 100) / 100; tena.style.setProperty('--tz', tz); minus.disabled = tz <= 1; plus.disabled = tz >= 1.3; say(`${UI2.size}: ${Math.round(tz * 100)}%`); };
  minus.addEventListener('click', () => size(-.15)); plus.addEventListener('click', () => size(.15));
  minus.disabled = true;
  const list = $('.tn-body', tena), views = $$('.tn-view', tena);
  let opener = null;
  $$('[data-open]', tena).forEach(b => b.addEventListener('click', () => {
    const card = b.closest('.tn-card'), v = views.find(x => x.dataset.fmt === b.dataset.open);
    if (v.dataset.fmt === 'article') {
      $('img', v).src = $('.ph img', card).src;
      $('.tn-cat', v).textContent = $('.tn-cat', card).textContent;
      $('.tn-art-hero p', v).textContent = $('.ttl', card).textContent;
      $('.tn-date', v).textContent = card.dataset.date;
    }
    opener = b; list.hidden = true; v.hidden = false; $('.tn-back', v).focus();
  }));
  views.forEach(v => $('.tn-back', v).addEventListener('click', () => { v.hidden = true; list.hidden = false; opener?.focus(); }));
}

// CAPS+: each click lays the next piece; the legacy portal fades as the new one grows.
const scene = $('.caps-scene');
if (scene) {
  const pieces = $$('.piece', scene), legacy = $$('.legacy [data-l]', scene), hook = $('.hook', scene);
  const n = $('.caps-meter .n', scene.parentElement), msg = $('.caps-meter .msg', scene.parentElement);
  let k = 0;
  const paint = () => {
    pieces.forEach((p, i) => p.classList.toggle('on', i < k));
    const retired = pieces.slice(0, k).filter(p => p.dataset.retires).length;
    legacy.forEach((l, i) => l.classList.toggle('gone', i < retired));
    hook.style.transform = `translateY(${k < pieces.length ? +pieces[k].dataset.y : 0}px)`;
    const done = k === pieces.length;
    if (done) scene.dataset.done = ''; else delete scene.dataset.done;
    n.textContent = UI2.pieces(k, pieces.length);
    scene.setAttribute('aria-label', done ? `${UI2.restart}. ${n.textContent}` : `${UI2.add}. ${n.textContent}`);
    return done;
  };
  scene.addEventListener('click', () => {
    if (k === pieces.length) { k = 0; paint(); msg.textContent = scene.dataset.start; say(msg.textContent); return; }
    k++;
    msg.textContent = paint() ? scene.dataset.doneMsg : UI2.added(pieces[k - 1].dataset.name);
    say(msg.textContent);
  });
  paint();
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

// Proposal B: ?frame=yellow previews the yellow frame.
const introPhoto = $('.intro-photo');
if (introPhoto && new URLSearchParams(location.search).get('frame') === 'yellow') introPhoto.dataset.frame = 'yellow';
