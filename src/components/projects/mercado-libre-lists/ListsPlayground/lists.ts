import { announce, wait } from "@/components/projects/case/ExampleFrame/frame";
import { listsCopy, products, initialLists, type Product } from "./lists.config";
import { navigationCopy } from "../NavigationPlayground/navigation.config";
import { ICON, iosTop, iosBar, iosChrome } from "../phone";
import { required as $, all as $$, reduce, esc } from "../dom";
interface ProductList {
  id: string;
  name: string;
  items: string[];
}
type Modal =
  | { type: "create"; opener: string }
  | { type: "rename"; opener: string; id: string }
  | { type: "add"; opener: string; pid: string; checked: Set<string>; creating: boolean };
interface State {
  mode: string;
  view: string;
  favs: string[];
  lists: ProductList[];
  legacy: string[];
  sel: Set<string>;
  modal: Modal | null;
  menu: string | null;
  renaming: string | null;
  fresh: string | null;
  focus: string | null;
}
// 01 · Lists: a recreation of the shipped Favorites and Lists screens, rebuilt from the owner's captures.
// Prices follow the captures; localized product titles are generic and images are our own drawings.
for (const lab of document.querySelectorAll<HTMLElement>("[data-meli-lab]")) {
  const meli = $(".meli", lab);
  const lang = lab.dataset.lang === "es" ? "es" : "en";
  const U = listsCopy[lang];
  const product = (id: string): Product => {
    const p = (products as Record<string, Product>)[id];
    if (!p) throw new Error(`Unknown demo product: ${id}`);
    return p;
  };
  const images = JSON.parse(lab.dataset.images ?? "{}") as Record<string, string>;
  const say = (text: string) => announce($(".example-frame", lab), text);
  const fresh = (): State => ({
    mode: "after",
    view: "favs",
    favs: ["camera", "drybag"],
    lists: initialLists.map(([id, name, items]) => ({ id, name, items: [...items] })),
    legacy: Object.keys(products),
    sel: new Set(),
    modal: null,
    menu: null,
    renaming: null,
    fresh: null,
    focus: null,
  });
  let S = fresh();
  const win = $(".meli-win", meli),
    mtoast = $(".m-toast", meli);
  const svgPlus =
    '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6"/></svg>';
  const svgHeart =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="currentColor"/></svg>';
  const svgBolt =
    '<svg viewBox="0 0 9 12" aria-hidden="true"><path d="M5.5 0 0 7h3.5L3 12l6-7.5H5.5Z" fill="currentColor"/></svg>';
  const svgPen =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m10.5 2.5 3 3L5 14H2v-3Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>';
  const svgSearch =
    '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 5 5" stroke="currentColor" stroke-width="1.5"/></svg>';
  const list = (id: string): ProductList => {
    const l = S.lists.find((l) => l.id === id);
    if (!l) throw new Error(`Unknown demo list: ${id}`);
    return l;
  };
  const isMobile = () => meli.dataset.device === "mobile";
  const img = (id: string, cover = false) => images[(cover && product(id).cover) || product(id).img];
  let toastTimer: ReturnType<typeof setTimeout> | undefined;
  const say3 = (t: string) => {
    mtoast.textContent = t;
    mtoast.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => mtoast.classList.remove("on"), 2000);
    say(t);
  };

  const info = (id: string) => {
    const p = product(id);
    return (
      `<p class="m-title">${esc(p.t[lang])}</p>${p.by ? `<span class="m-by">${U.by(p.by)}</span>` : ""}${p.old ? `<s class="m-old">$ ${p.old}</s>` : ""}` +
      `<span class="m-price">$ ${p.price}${p.off ? `<span class="m-off">${p.off}${U.off}</span>` : ""}</span>${p.q ? `<span class="m-q">${U.q(...p.q)}</span>` : ""}` +
      (p.paused
        ? `<span class="m-paused">${U.paused}</span>`
        : `<span class="m-ship">${U.free}${p.full ? ` <span class="m-full">${svgBolt}${U.full}</span>` : ""}</span>`)
    );
  };
  const row = (id: string, acts: string) =>
    `<li class="m-row"><img src="${img(id)}" alt="${esc(product(id).t[lang])}"><div class="m-info">${info(id)}<div class="m-acts">${acts}</div></div></li>`;
  const menu = (l: ProductList) =>
    `<div class="m-menu" role="menu"><button type="button" role="menuitem" data-a="rename" data-id="${l.id}" data-k="mi-rename">${U.editName}</button><button type="button" role="menuitem" data-a="del-list" data-id="${l.id}" data-k="mi-del">${U.deleteList}</button></div>`;
  const kebab = (l: ProductList, k: string) =>
    `<button type="button" class="m-kebab" data-a="menu" data-id="${l.id}" data-k="${k}" aria-haspopup="menu" aria-expanded="${S.menu === l.id}" aria-label="${U.more}: ${esc(l.name)}">⋮</button>`;
  const renameForm = (l: ProductList) =>
    `<form class="m-rename" data-submit="rename-save" data-id="${l.id}"><label class="m-sr" for="rn-${l.id}">${U.listName}</label><input class="m-input" id="rn-${l.id}" data-k="rn" value="${esc(l.name)}" maxlength="30" autocomplete="off"><button class="m-link" type="submit">${U.save}</button></form>`;

  const header = () => `<p class="m-crumb">${U.crumbs[0]}<span aria-hidden="true">›</span>${U.crumbs[1]}</p>`;
  function legacy() {
    const all = S.legacy.length && S.legacy.every((id) => S.sel.has(id));
    return `${isMobile() ? "" : header() + `<div class="m-headrow"><p class="m-h1">${U.favorites}</p></div>`}
      <div class="m-rows"><div class="m-selall"><input type="checkbox" data-a="sel-all" data-k="sel-all" aria-label="${U.selectAll}"${all ? " checked" : ""}><button type="button" class="m-link" data-a="del-sel" data-k="del-sel"${S.sel.size ? "" : " disabled"}>${U.deleteSel}</button></div>
      <ul class="m-rows" style="box-shadow:none">${S.legacy.map((id) => `<li class="m-row legacy"><input type="checkbox" data-a="sel" data-id="${id}" data-k="sel-${id}" aria-label="${esc(U.select(product(id).t[lang]))}"${S.sel.has(id) ? " checked" : ""}><img src="${img(id)}" alt="${esc(product(id).t[lang])}"><div class="m-info">${info(id)}<div class="m-acts"><button type="button" class="m-link" data-a="legacy-rm" data-id="${id}" data-k="lrm-${id}">${U.remove}</button></div></div></li>`).join("") || `<li class="m-empty">${U.emptyFavs}</li>`}</ul></div>`;
  }
  function home() {
    const tab = (v: string, label: string) =>
      `<button type="button" role="tab" id="ml-tab-${v}" aria-controls="ml-panel" tabindex="${S.view === v ? 0 : -1}" aria-selected="${S.view === v}" data-a="tab" data-v="${v}" data-k="tab-${v}">${label}</button>`;
    const body =
      S.view === "favs"
        ? `<ul class="m-rows">${S.favs.map((id) => row(id, `<button type="button" class="m-link" data-a="add" data-id="${id}" data-k="add-${id}">${U.addToList}</button><button type="button" class="m-link" data-a="unfav" data-id="${id}" data-k="unfav-${id}">${U.remove}</button>`)).join("") || `<li class="m-empty">${U.emptyFavs}</li>`}</ul>`
        : `<ul class="m-grid">${S.lists
            .map(
              (l) => `<li class="m-card${l.id === S.fresh ? " fresh" : ""}">
          <button type="button" class="m-cover" data-a="open" data-id="${l.id}" data-k="open-${l.id}" aria-label="${esc(U.opens(l.name))}">${l.items[0] ? `<img src="${img(l.items[0], true)}" alt="">` : `<span class="m-ph">${svgHeart}</span>`}${
            l.items.length > 1
              ? `<span class="m-coll">${l.items
                  .slice(0, l.items.length > 3 ? 3 : l.items.length)
                  .map((x) => `<img src="${img(x)}" alt="">`)
                  .join("")}${l.items.length > 3 ? `<b>+${l.items.length - 3}</b>` : ""}</span>`
              : ""
          }</button>
          <div class="m-cinfo">${S.renaming === l.id ? renameForm(l) : `<button type="button" class="m-cname" data-a="open" data-id="${l.id}" tabindex="-1">${esc(l.name)}</button>`}
            <p class="m-csub">${U.listOf}</p><p class="m-csub">${U.products(l.items.length)}</p>${kebab(l, "menu-" + l.id)}${S.menu === l.id ? menu(l) : ""}</div></li>`,
            )
            .join("")}</ul>`;
    return `${isMobile() ? "" : header() + `<div class="m-headrow"><p class="m-h1">${U.favorites}</p><button type="button" class="m-btn" data-a="create" data-k="create">${svgPlus}${U.createList}</button></div>`}
      <div class="m-tabs" role="tablist">${tab("favs", U.myFavs)}${tab("lists", U.lists(S.lists.length))}</div><div id="ml-panel" role="tabpanel" aria-labelledby="ml-tab-${S.view}">${body}</div>`;
  }
  const emptyList = () =>
    `<div class="m-emptyn"><span class="m-heartc">${ICON.heart}</span><p class="m-et">${U.emptyTitle}</p><p class="m-es">${U.emptySub}</p><button type="button" class="m-link" data-a="tab" data-v="favs" data-k="tab-favs">${U.addFavs}</button></div>`;
  function detail() {
    const l = list(S.view.slice(5));
    if (isMobile())
      return `<div class="m-dhead"><p class="m-h1">${esc(l.name)}</p><button type="button" class="m-pen" data-a="menu" data-id="${l.id}" data-k="dmenu" aria-haspopup="menu" aria-expanded="${S.menu === l.id}" aria-label="${U.more}">${ICON.pencil}</button>${S.menu === l.id ? menu(l) : ""}</div>
      ${l.items.length ? `<ul class="m-rows">${l.items.map((id) => row(id, `<button type="button" class="m-link" data-a="rm-item" data-id="${id}" data-k="rm-${id}">${U.remove}</button>`)).join("")}</ul>` : emptyList()}`;
    return `<button type="button" class="m-back" data-a="tab" data-v="lists" data-k="back">‹ ${U.back}</button>
      <div class="m-headrow">${S.renaming === l.id ? renameForm(l) : `<p class="m-h1">${esc(l.name)}</p>`}
        <div class="m-dmeta"><span>${U.products(l.items.length)}</span><span class="m-sep" aria-hidden="true"></span><button type="button" class="m-link" data-a="rename" data-id="${l.id}" data-k="drename">${svgPen}${U.editName}</button>${kebab(l, "dmenu")}${S.menu === l.id ? menu(l) : ""}</div></div>
      <ul class="m-rows">${l.items.map((id) => row(id, `<button type="button" class="m-link" data-a="rm-item" data-id="${id}" data-k="rm-${id}">${U.remove}</button>`)).join("") || `<li class="m-empty">${U.empty}</li>`}</ul>`;
  }
  function modal() {
    const M = S.modal;
    if (!M) return "";
    const form = (submit: string) =>
      `<form class="m-newform" data-submit="${submit}"><label class="m-sr" for="m-new">${U.listName}</label><input class="m-input" id="m-new" data-k="m-new" placeholder="${U.listName}" maxlength="30" autocomplete="off"><button type="submit" class="m-btn">${U.create}</button></form>`;
    const opt = (id: string, name: string, thumb: string, sub = "") =>
      `<li><label class="m-opt"><span class="m-thumb">${thumb}</span><span>${esc(name)}${sub}</span><input type="checkbox" data-a="chk" data-id="${id}" data-k="chk-${id}"${M.type === "add" && M.checked.has(id) ? " checked" : ""}></label></li>`;
    const sheet = (submit: string, value: string, btn: string, locked: boolean) =>
      `<form class="m-sheetform" data-submit="${submit}" data-id="${M.type === "rename" ? M.id : ""}">${M.type === "create" ? `<p class="m-hint">${U.createHint}</p>` : ""}<label class="m-sr" for="m-new">${U.listName}</label><input class="m-input" id="m-new" data-k="m-new" data-orig="${esc(value)}" placeholder="${U.listName}" value="${esc(value)}" maxlength="25" autocomplete="off"><span class="m-count" aria-hidden="true">${value.length} / 25</span><button type="submit" class="m-btn m-wide"${locked ? " disabled" : ""}>${btn}</button></form>`;
    const body =
      isMobile() && M.type === "create"
        ? sheet("new-list", "", U.createList, false)
        : isMobile() && M.type === "rename"
          ? sheet("rename-sheet", list(M.id).name, U.confirm, true)
          : M.type === "create"
            ? form("new-list")
            : (M.type === "add" && M.creating
                ? form("new-in-add")
                : `<button type="button" class="m-newrow" data-a="creating" data-k="creating"><span class="m-plus" aria-hidden="true">+</span>${U.createNew}</button>`) +
              `<ul class="m-opts">${opt("favs", U.myFavs, svgHeart, `<small>${U.def}</small>`)}${S.lists.map((l) => opt(l.id, l.name, l.items[0] ? `<img src="${img(l.items[0])}" alt="">` : "")).join("")}</ul>`;
    const foot =
      M.type === "add"
        ? `<div class="m-mfoot"><button type="button" class="m-btn" data-a="confirm" data-k="confirm">${U.confirm}</button><button type="button" class="m-link" data-a="golists" data-k="golists">${U.goLists}</button></div>`
        : "";
    return `<div class="m-scrim" data-a="scrim"><div class="m-modal" role="dialog" aria-modal="true" aria-labelledby="m-mt"><div class="m-mhead"><p class="m-mtitle" id="m-mt">${M.type === "add" ? U.addToList : M.type === "rename" ? U.editList : isMobile() ? U.createTitle : U.createList}</p><button type="button" class="m-x" data-a="close" data-k="close" aria-label="${U.close}">×</button></div><div class="m-mbody">${body}</div>${foot}</div></div>`;
  }
  let lastView = "";
  function render() {
    const inside = win.contains(document.activeElement);
    const k =
      S.focus ||
      (inside
        ? document.activeElement instanceof HTMLElement
          ? document.activeElement.dataset.k
          : null
        : null);
    const sc = win.querySelector<HTMLElement>(".m-scroll"),
      viewKey = S.mode + S.view,
      st = sc && viewKey === lastView ? sc.scrollTop : 0;
    const body = S.mode === "before" ? legacy() : S.view.startsWith("list:") ? detail() : home();
    if (isMobile()) {
      const inList = S.mode !== "before" && S.view.startsWith("list:");
      const head = inList
        ? `<button type="button" class="n-arrow" data-a="tab" data-v="lists" data-k="back" aria-label="${U.back}">${ICON.back}</button><span class="n-arrow n-sr" aria-hidden="true">${ICON.search}</span>`
        : `<span class="n-arrow" aria-hidden="true">${ICON.back}</span>`;
      const fab =
        !inList && S.mode !== "before"
          ? `<button type="button" class="n-fab${st > 24 ? " collapsed" : ""}" data-a="create" data-k="create" aria-label="${U.createList}">${svgPlus}<span>${U.createList}</span></button>`
          : "";
      win.innerHTML =
        iosTop(head) +
        `<div class="m-scroll"><div class="m-page">${body}</div></div>${fab}${iosBar(navigationCopy[lang].bar)}${iosChrome}${modal()}`;
    } else {
      win.innerHTML =
        `<div class="m-top" aria-hidden="true"><div class="m-search"><span>${U.search}</span>${svgSearch}</div></div>` +
        `<div class="m-scroll"><div class="m-page">${body}</div></div>${modal()}`;
    }
    $(".m-scroll", win).scrollTop = st;
    win.toggleAttribute("data-native", isMobile());
    lastView = viewKey;
    if (S.modal) $(".m-scroll", win).inert = true;
    if (k && (S.focus || inside)) {
      const el = win.querySelector<HTMLElement>(`[data-k="${k}"]`);
      el?.focus({ preventScroll: true });
      if (el instanceof HTMLInputElement && k !== "m-new") el.select();
    }
    S.focus = null;
  }
  function closeModal() {
    S.focus = S.modal?.opener || "create";
    S.modal = null;
  }
  function act(a: string, d: { id?: string; v?: string; k?: string } = {}) {
    const id = d.id ?? "";
    switch (a) {
      case "tab":
        Object.assign(S, {
          view: d.v ?? "favs",
          menu: null,
          renaming: null,
          focus: d.k === "back" ? "tab-lists" : "tab-" + (d.v ?? "favs"),
        });
        break;
      case "open":
        Object.assign(S, { view: "list:" + id, menu: null, renaming: null, focus: "back" });
        break;
      case "create":
        S.modal = { type: "create", opener: "create" };
        S.focus = "m-new";
        break;
      case "add":
        S.modal = {
          type: "add",
          pid: id,
          opener: "add-" + id,
          creating: false,
          checked: new Set([
            ...(S.favs.includes(id) ? ["favs"] : []),
            ...S.lists.filter((l) => l.items.includes(id)).map((l) => l.id),
          ]),
        };
        S.focus = "creating";
        break;
      case "unfav":
        S.favs = S.favs.filter((x) => x !== id);
        say3(U.removedFav);
        S.focus = "tab-favs";
        break;
      case "creating":
        if (S.modal?.type !== "add") return;
        S.modal.creating = true;
        S.focus = "m-new";
        break;
      case "new-in-add":
      case "new-list": {
        const name = $<HTMLInputElement>("#m-new", win).value.trim();
        if (!name) {
          say3(U.nameFirst);
          $("#m-new", win).focus();
          return;
        }
        const l: ProductList = { id: "n" + Date.now(), name, items: [] };
        S.lists.unshift(l);
        say3(U.created(name));
        if (a === "new-in-add" && S.modal?.type === "add") {
          S.modal.creating = false;
          S.modal.checked.add(l.id);
          S.focus = "chk-" + l.id;
        } else {
          S.modal = null;
          Object.assign(S, { view: "lists", fresh: l.id, focus: "open-" + l.id });
        }
        break;
      }
      case "close":
      case "scrim":
        closeModal();
        break;
      case "confirm":
      case "golists": {
        if (S.modal?.type !== "add") return;
        const { pid, checked } = S.modal;
        const inFav = S.favs.includes(pid);
        if (checked.has("favs") && !inFav) S.favs.unshift(pid);
        if (!checked.has("favs") && inFav) S.favs = S.favs.filter((x) => x !== pid);
        S.lists.forEach((l) => {
          const has = l.items.includes(pid);
          if (checked.has(l.id) && !has) l.items.unshift(pid);
          if (!checked.has(l.id) && has) l.items = l.items.filter((x) => x !== pid);
        });
        say3(checked.size ? U.savedTo(checked.size) : U.removedFrom);
        closeModal();
        if (a === "golists") Object.assign(S, { view: "lists", focus: "tab-lists", fresh: null });
        break;
      }
      case "menu":
        S.menu = S.menu === id ? null : id;
        S.focus = S.menu ? "mi-rename" : (d.k ?? null);
        break;
      case "rename":
        S.menu = null;
        if (isMobile()) {
          S.modal = { type: "rename", id, opener: S.view.startsWith("list:") ? "dmenu" : "menu-" + id };
          S.focus = "m-new";
        } else {
          S.renaming = id;
          S.focus = "rn";
        }
        break;
      case "rename-sheet": {
        const l = list(id),
          v = $<HTMLInputElement>("#m-new", win).value.trim();
        if (v && v !== l.name) {
          l.name = v;
          say3(U.renamed);
        }
        S.modal = null;
        S.focus = S.view.startsWith("list:") ? "dmenu" : "open-" + id;
        break;
      }
      case "rename-save": {
        const l = list(id),
          v = $<HTMLInputElement>("#rn-" + id, win).value.trim();
        if (v && v !== l.name) {
          l.name = v;
          say3(U.renamed);
        }
        S.renaming = null;
        S.focus = S.view.startsWith("list:") ? "drename" : "open-" + id;
        break;
      }
      case "del-list": {
        const l = list(id);
        S.lists = S.lists.filter((x) => x !== l);
        say3(U.deleted(l.name));
        Object.assign(S, { menu: null, view: "lists", focus: "tab-lists" });
        break;
      }
      case "rm-item": {
        const l = list(S.view.slice(5));
        l.items = l.items.filter((x) => x !== id);
        say3(U.removedItem);
        S.focus = "back";
        break;
      }
      case "legacy-rm":
        S.legacy = S.legacy.filter((x) => x !== id);
        S.sel.delete(id);
        say3(U.removedFav);
        S.focus = "sel-all";
        break;
      case "del-sel": {
        const n = S.sel.size;
        S.legacy = S.legacy.filter((x) => !S.sel.has(x));
        S.sel.clear();
        say3(U.deletedSel(n));
        S.focus = "sel-all";
        break;
      }
    }
    render();
  }

  win.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    if (S.menu && !e.target.closest(".m-menu, .m-kebab")) {
      S.menu = null;
      render();
    }
    const b = e.target.closest<HTMLElement>("[data-a]");
    if (!b || b.tagName === "INPUT" || (b instanceof HTMLButtonElement && b.disabled)) return;
    if (b.dataset.a === "scrim" && e.target !== b) return;
    if (b.dataset.a) act(b.dataset.a, b.dataset);
  });
  win.addEventListener("input", (e) => {
    const i = e.target;
    if (!(i instanceof HTMLInputElement) || !i.matches('.m-input[data-k="m-new"]')) return;
    const c = win.querySelector(".m-count");
    if (c) c.textContent = `${i.value.length} / 25`;
    const b = win.querySelector<HTMLButtonElement>(".m-sheetform .m-btn");
    if (b && "orig" in i.dataset) b.disabled = !i.value.trim() || i.value.trim() === i.dataset.orig;
  });
  win.addEventListener(
    "scroll",
    (e) => {
      if (!(e.target instanceof HTMLElement) || !e.target.matches(".m-scroll")) return;
      win.querySelector(".n-fab")?.classList.toggle("collapsed", e.target.scrollTop > 24);
    },
    true,
  );
  win.addEventListener("change", (e) => {
    const i = e.target;
    if (!(i instanceof HTMLInputElement)) return;
    const a = i.dataset.a;
    if (a === "chk" && S.modal?.type === "add") {
      const c = S.modal.checked;
      if (i.checked) c.add(i.dataset.id ?? "");
      else c.delete(i.dataset.id ?? "");
    }
    if (a === "sel") {
      if (i.checked) S.sel.add(i.dataset.id ?? "");
      else S.sel.delete(i.dataset.id ?? "");
      render();
    }
    if (a === "sel-all") {
      S.sel = new Set(i.checked ? S.legacy : []);
      render();
    }
  });
  win.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement && e.target.dataset.submit)
      act(e.target.dataset.submit, e.target.dataset);
  });
  win.addEventListener("keydown", (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    if (e.target.matches("[role=tab]") && ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      const v = e.key === "Home" ? "favs" : e.key === "End" ? "lists" : S.view === "favs" ? "lists" : "favs";
      S.focus = "tab-" + v;
      act("tab", { v });
    }
    if (e.key === "Escape") {
      if (S.modal) {
        e.preventDefault();
        closeModal();
        render();
      } else if (S.menu) {
        e.preventDefault();
        S.focus = S.view.startsWith("list:") ? "dmenu" : "menu-" + S.menu;
        S.menu = null;
        render();
      } else if (S.renaming) {
        e.preventDefault();
        S.focus = S.view.startsWith("list:") ? "drename" : "open-" + S.renaming;
        S.renaming = null;
        render();
      }
    }
    if (e.key === "Tab" && S.modal) {
      // keep focus inside the dialog
      const f = $$<HTMLInputElement | HTMLButtonElement>("button, input", $(".m-modal", win)).filter(
        (x) => !x.disabled,
      );
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f.at(-1)?.focus();
      } else if (!e.shiftKey && document.activeElement === f.at(-1)) {
        e.preventDefault();
        f[0]?.focus();
      }
    }
  });

  const radiosMode = $$<HTMLInputElement>('input[name="ml-mode"]', lab),
    radiosDev = $$<HTMLInputElement>('input[name="ml-device"]', lab);
  radiosMode.forEach((r) =>
    r.addEventListener("change", () => {
      Object.assign(S, { mode: r.value, modal: null, menu: null, renaming: null });
      meli.dataset.mode = r.value;
      render();
    }),
  );
  // On a phone the recreation is always the mobile version; the device switch is hidden there.
  const narrow = matchMedia("(max-width: 719px)");
  const fitDevice = () => {
    meli.dataset.device = narrow.matches
      ? "mobile"
      : $<HTMLInputElement>('input[name="ml-device"]:checked', lab).value;
  };
  const setDevice = () => {
    fitDevice();
    render();
  };
  radiosDev.forEach((r) => r.addEventListener("change", setDevice));
  narrow.addEventListener("change", setDevice);
  fitDevice();

  // Play: add the camera to a list, then open that list.
  const playBtn = $(".example-frame__actions button", lab);
  let playing = false;
  const lock = (on: boolean) => {
    lab.toggleAttribute("aria-busy", on);
    win.inert = on;
    [...radiosMode, ...radiosDev].forEach((r) => (r.disabled = on));
    $('[data-action="ml-reset"] button', lab).setAttribute("aria-disabled", String(on));
  };
  playBtn.addEventListener("click", async () => {
    if (playing) return;
    playing = true;
    lock(true);
    playBtn.setAttribute("aria-disabled", "true");
    say(U.playing);
    $<HTMLInputElement>('input[name="ml-mode"][value="after"]', lab).checked = true;
    meli.dataset.mode = "after";
    S = fresh();
    render();
    win.scrollIntoView({ block: "nearest", behavior: reduce() ? "auto" : "smooth" });
    await wait(600);
    act("add", { id: "camera" });
    await wait(900);
    if (S.modal?.type === "add") S.modal.checked.add("tech");
    S.focus = "chk-tech";
    render();
    await wait(900);
    act("confirm");
    await wait(1000);
    act("tab", { v: "lists" });
    await wait(1100);
    act("open", { id: "tech" });
    await wait(1600);
    act("tab", { v: "lists", k: "back" });
    lock(false);
    playing = false;
    playBtn.removeAttribute("aria-disabled");
    playBtn.focus({ preventScroll: true });
  });

  // Reset returns the recreation to its first state.
  $('[data-action="ml-reset"] button', lab).addEventListener("click", () => {
    if (playing) return;
    $<HTMLInputElement>('input[name="ml-mode"][value="after"]', lab).checked = true;
    meli.dataset.mode = "after";
    S = fresh();
    render();
    say(U.resetDone);
  });
  render();
}
