import { announce, wait } from "@/components/projects/case/ExampleFrame/frame";
import { products, listsCopy, type Product } from "../ListsPlayground/lists.config";
import { navigationCopy } from "./navigation.config";
import { ICON, iosTop, iosBar, iosChrome } from "../phone";
import { required as $, all as $$, reduce, esc } from "../dom";
for (const demo of document.querySelectorAll<HTMLElement>("[data-navigation]")) {
  const lang = demo.dataset.lang === "es" ? "es" : "en";
  const T = navigationCopy[lang],
    U = listsCopy[lang];
  const images = JSON.parse(demo.dataset.images ?? "{}") as Record<string, string>;
  const say = (text: string) => announce($(".example-frame", demo), text);
  const BATCH = 12,
    TOTAL = 48,
    TARGET = 14;
  const NAV_IDS = Object.keys(products);
  const phoneHTML = () => `<div class="screen list-screen">
    ${iosTop(`<span class="n-arrow" aria-hidden="true">${ICON.back}</span><span class="count" aria-hidden="true"></span>`)}
    <div class="n-tabs" aria-hidden="true"><span class="on">${T.tabs[0]}</span><span>${T.tabs[1]}</span></div>
    <div class="scroller"><ul></ul><p class="loader"><i aria-hidden="true"></i><span class="sr"></span></p></div>
    ${iosBar(T.bar)}
    <div class="n-loading" aria-hidden="true"><i></i></div>
  </div>
  <div class="screen detail">
    ${iosTop(`<button class="in-back" type="button" aria-label="${T.back}">${ICON.back}</button><span class="n-search" aria-hidden="true">${T.search}</span>`)}
    <div class="body"><span class="d-new">${T.newItem}</span><h3></h3><img class="d-img" alt=""><p class="d-price"></p><p class="d-q"></p><span class="d-buy" aria-hidden="true">${T.buy}</span><span class="d-cart" aria-hidden="true">${T.cart}</span></div>
  </div>${iosChrome}`;
  class Phone {
    col: HTMLElement;
    mode: string;
    el: HTMLElement;
    list: HTMLUListElement;
    scroller: HTMLElement;
    loader: HTMLElement;
    count: HTMLElement;
    title: HTMLElement;
    stack: HTMLElement;
    result: HTMLElement;
    backBtn: HTMLButtonElement;
    loaded = 0;
    rover = 1;
    stuck = false;
    loading = false;
    saved = 0;
    opened: number | null = null;
    private loadTimer: ReturnType<typeof setTimeout> | undefined;
    private generation = 0;

    constructor(col: HTMLElement) {
      this.col = col;
      this.mode = col.dataset.mode ?? "after";
      this.el = $(".navigation-playground__phone", col);
      this.el.innerHTML = phoneHTML();
      this.list = $<HTMLUListElement>("ul", col);
      this.scroller = $(".scroller", col);
      this.loader = $(".loader", col);
      this.count = $(".count", col);
      this.title = $(".detail h3", col);
      this.stack = $(".navigation-playground__stack", col);
      this.result = $(".navigation-playground__result", col);
      this.backBtn = $<HTMLButtonElement>(".detail .in-back", col);
      this.scroller.addEventListener("scroll", () => this.maybeLoad());
      this.list.addEventListener("click", (e) => {
        const b = e.target instanceof Element ? e.target.closest<HTMLElement>("button[data-i]") : null;
        if (b) this.open(Number(b.dataset.i), true);
      });
      this.list.addEventListener("keydown", (e) => this.rove(e));
      this.list.addEventListener("focusin", (e) => {
        const b = e.target instanceof Element ? e.target.closest<HTMLElement>("button[data-i]") : null;
        if (b) this.setRover(Number(b.dataset.i));
      });
      this.backBtn.addEventListener("click", () => this.back({ user: true }));
      this.reset();
    }
    product(i: number): Product {
      const id = NAV_IDS[(i - 1) % NAV_IDS.length];
      const p = id ? (products as Record<string, Product>)[id] : undefined;
      if (!p) throw new Error(`Unknown navigation product: ${i}`);
      return p;
    }
    label(i: number) {
      return `${T.item} ${String(i).padStart(2, "0")}`;
    }
    name(i: number) {
      return `${this.label(i)} · ${this.product(i).t[lang]}`;
    }
    row(i: number) {
      const p = this.product(i),
        li = document.createElement("li"),
        b = document.createElement("button");
      b.type = "button";
      b.dataset.i = String(i);
      b.tabIndex = -1;
      b.innerHTML = `<img src="${images[p.img]}" alt=""><span class="n-info"><span class="n-t">${esc(p.t[lang])}</span><span class="n-p">$ ${p.price}</span>${p.paused ? "" : `<span class="n-s">${T.free}</span>`}</span><span class="n-i" aria-hidden="true">${String(i).padStart(2, "0")}</span>`;
      li.append(b);
      return li;
    }
    item(i: number) {
      return this.list.querySelector<HTMLButtonElement>(`button[data-i="${i}"]`);
    }
    // One tab stop per list (roving tabindex); arrows move between items.
    setRover(i: number) {
      $$<HTMLButtonElement>("button[data-i]", this.list).forEach((b) => (b.tabIndex = -1));
      const b = this.item(i);
      if (b) b.tabIndex = 0;
      this.rover = i;
    }
    rove(e: KeyboardEvent) {
      const keys: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, Home: -Infinity, End: Infinity };
      if (!(e.key in keys)) return;
      e.preventDefault();
      const d = keys[e.key];
      if (d === undefined) return;
      const next =
        d === -Infinity
          ? 1
          : d === Infinity
            ? this.loaded
            : Math.min(this.loaded, Math.max(1, this.rover + d));
      this.setRover(next);
      this.item(next)?.focus({ preventScroll: false });
      this.maybeLoad();
    }
    append(n: number) {
      const from = this.loaded + 1,
        to = Math.min(TOTAL, this.loaded + n);
      for (let i = from; i <= to; i++) this.list.append(this.row(i));
      this.loaded = to;
      this.updateCount();
      this.setRover(this.rover && this.rover <= to ? this.rover : 1);
    }
    updateCount() {
      this.count.textContent = `${this.loaded} ${T.of} ${TOTAL}`;
      this.loader.hidden = this.loaded >= TOTAL && !this.stuck;
    }
    setLoader(stuck: boolean) {
      $(".sr", this.loader).textContent = stuck ? T.stuck : T.loading;
      this.loader.classList.toggle("stuck", stuck);
    }
    reset() {
      this.generation++;
      clearTimeout(this.loadTimer);
      this.list.replaceChildren();
      this.loaded = 0;
      this.rover = 1;
      this.stuck = false;
      this.loading = false;
      this.saved = 0;
      this.opened = null;
      delete this.el.dataset.loading;
      this.append(BATCH);
      this.scroller.scrollTop = 0;
      this.setScreen("list");
      this.setLoader(false);
      this.setStack(T.stackList);
      this.result.textContent = "";
      delete this.result.dataset.tone;
    }
    setStack(t: string) {
      this.stack.textContent = t;
    }
    setScreen(name: "list" | "detail") {
      this.el.dataset.screen = name;
      $(".list-screen", this.el).inert = name !== "list";
      $(".detail", this.el).inert = name !== "detail";
    }
    async maybeLoad() {
      if (this.loading) {
        await wait(450);
        return;
      }
      if (this.loaded >= TOTAL) return;
      const s = this.scroller;
      const nearEnd = s.scrollTop + s.clientHeight >= s.scrollHeight - 80 || this.rover >= this.loaded - 1;
      if (!nearEnd) return;
      if (this.stuck) {
        this.setLoader(true);
        return;
      }
      this.loading = true;
      const generation = this.generation;
      await wait(450);
      if (generation !== this.generation) return;
      this.append(BATCH);
      this.loading = false;
    }
    async scrollTo(i: number) {
      while (this.loaded < i) {
        this.rover = this.loaded;
        this.scroller.scrollTop = this.scroller.scrollHeight;
        await this.maybeLoad();
      }
      const b = this.item(i);
      if (!b) return;
      const top = b.offsetTop - this.scroller.clientHeight / 2 + 40;
      this.scroller.scrollTo({ top, behavior: reduce() ? "auto" : "smooth" });
      await wait(650);
    }
    open(i: number, user = false) {
      const p = this.product(i);
      this.opened = i;
      this.saved = this.scroller.scrollTop;
      this.setRover(i);
      $$("li", this.list).forEach((li) => delete li.dataset.hit);
      this.title.textContent = p.t[lang];
      const image = $<HTMLImageElement>(".d-img", this.el);
      image.src = images[p.img] ?? "";
      image.alt = p.t[lang];
      $(".d-price", this.el).textContent = `$ ${p.price}`;
      $(".d-q", this.el).textContent = p.q ? U.q(...p.q) : "";
      this.setScreen("detail");
      this.setStack(this.mode === "after" ? T.kept(this.label(i)) : T.discarded(this.label(i)));
      if (user) this.backBtn.focus({ preventScroll: true });
    }
    back({ user = false, silent = false } = {}) {
      if (this.el.dataset.screen !== "detail") return;
      const i = this.opened ?? 1;
      this.setScreen("list");
      if (this.mode === "after") {
        this.scroller.scrollTop = this.saved;
        const li = this.item(i)?.parentElement;
        if (li) li.dataset.hit = "true";
        this.setStack(T.restored);
        this.result.innerHTML = T.goodResult(i);
        this.result.dataset.tone = "good";
        if (user) this.item(i)?.focus({ preventScroll: true });
      } else {
        // The app shows its loading screen while the page reloads, then the list starts again from the top.
        this.el.dataset.loading = "true";
        clearTimeout(this.loadTimer);
        this.loadTimer = setTimeout(() => delete this.el.dataset.loading, reduce() ? 500 : 1000);
        this.generation++;
        this.loading = false;
        this.list.replaceChildren();
        this.loaded = 0;
        this.rover = 1;
        this.stuck = true;
        this.append(BATCH);
        this.setLoader(true);
        this.scroller.scrollTop = 0;
        this.setStack(T.rebuilt);
        this.result.innerHTML = T.badResult;
        this.result.dataset.tone = "bad";
        if (user) this.item(1)?.focus({ preventScroll: true });
      }
      if (!silent) say(`${this.mode === "after" ? T.after : T.before}: ${this.result.textContent}`);
    }
  }

  const phones = $$(".navigation-playground__col", demo).map((c) => new Phone(c));
  const wrap = $(".navigation-playground__phones", demo),
    play = $(".example-frame__actions button", demo),
    resetBtn = $('[data-action="reset"] button', demo);
  const radios = $$<HTMLInputElement>('input[name="meli-demo-mode"]', demo);
  radios.forEach((r) =>
    r.addEventListener("change", () => {
      wrap.dataset.show = r.value;
    }),
  );
  let running = false;
  const lock = (on: boolean) => {
    running = on;
    [play, resetBtn].forEach((b) => b.setAttribute("aria-disabled", String(on)));
    radios.forEach((r) => (r.disabled = on));
    phones.forEach((p) => (p.el.inert = on));
    if (on) demo.setAttribute("aria-busy", "true");
    else demo.removeAttribute("aria-busy");
  };
  play.addEventListener("click", async () => {
    if (running) return;
    lock(true);
    // Both phones always run, so switching view or resizing never shows a half-finished comparison.
    phones.forEach((p) => p.reset());
    say(T.playingAnnouncement);
    await wait(300);
    await Promise.all(phones.map((p) => p.scrollTo(TARGET)));
    phones.forEach((p) => {
      const li = p.item(TARGET)?.parentElement;
      if (li) li.dataset.hit = "true";
    });
    await wait(500);
    phones.forEach((p) => p.open(TARGET));
    await wait(1100);
    phones.forEach((p) => p.back({ silent: true }));
    say(T.doneAnnouncement);
    play.textContent = T.playAgain;
    lock(false);
    play.focus({ preventScroll: true });
  });
  resetBtn.addEventListener("click", () => {
    if (running) return;
    phones.forEach((p) => p.reset());
    play.textContent = T.play;
    say(T.resetDone);
  });
}
