import { setupPageScroll } from './canvas.js';
import { BoardExperience } from './experience.js';

const IMG={"talk": "/design/assets/talk.jpg", "moto": "/design/assets/moto.jpg", "frame": "/design/assets/frame.jpg", "pole": "/design/assets/pole.jpg", "meli": "/design/assets/meli.jpg", "bco": "/design/v11/assets/bancolombia-devices.png", "meliLists": "/design/v11/assets/meli-lists-grid.webp", "goodrx": "/design/v11/assets/goodrx-cards.webp", "petys": "/design/v11/assets/petys-home.webp"};
const ROCKET='<svg viewBox="0 0 46 62" aria-hidden="true"><g class="ship"><path d="M23 2c8 7 11 17 10 30H13C12 19 15 9 23 2Z" fill="var(--surface)" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="23" cy="20" r="4.5" fill="var(--fill)"/><path d="M13 26 6 36v6l8-5M33 26l7 10v6l-8-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M17 38h12l-2 6H19Z" fill="currentColor"/><path class="flame" d="M19 46c1 6 3 10 4 12 1-2 3-6 4-12Z" fill="#FF8A3D"/></g></svg>';
const FLAG='<span class="flag" aria-hidden="true"><i></i><i></i><i></i></span>';
// objects: id, type, default board placement (null = explore only), name, front html, back html
const OBJS=[
 {id:"moto",t:"print",b:{side:"l",gx:150,y:16,r:-8},name:"Photo: on a motorbike trip in the Colombian mountains",front:`<img alt="Jouler in riding gear next to his motorbike on a wet mountain road" src="${'${IMG.moto}'}" draggable="false"><span class="cap">Road trip · Colombia</span>`,back:"<b>Two wheels, long roads.</b>Riding is how I reset. Rain included."},
 {id:"teach",t:"print",b:{side:"l",gx:48,y:6,r:4},name:"Photo: giving a talk at a university",front:`<img alt="Jouler giving a talk in a university classroom" src="${'${IMG.talk}'}" draggable="false"><span class="cap">Teaching · 2025</span>`,back:"<b>I teach what I learn.</b>Guest lectures at universities and a semester teaching at SENA."},
 {id:"envelope",t:"envelope",b:null,name:"A letter for you. Opens the letter",front:'<span class="flapc"></span><span class="seal"></span><span class="to">for you</span>',back:null,go:"letter"},
 {id:"rocket",t:"rocket",b:{side:"r",gx:70,y:44,r:3},name:"Rocket: my roadmap from senior to staff. Opens the roadmap",front:ROCKET+'<b>Roadmap</b><small>Senior → Staff, step by step</small>',back:null,go:"roadmap"},
 {id:"ticket",t:"ticket",b:{side:"l",gx:40,y:74,r:3},name:"Ticket from Colombia to Madrid",front:`<div><div class="code">COL</div><div class="city">Colombia</div></div><span class="plane" aria-hidden="true">✈</span><div style="text-align:right"><div class="code" style="justify-content:flex-end">MAD</div><div class="city">Madrid</div></div><div class="row"><span>One way</span><span>6+ yrs exp.</span></div>`,back:"<b>From Colombia to Spain.</b>Working remotely across Latin America and Europe, on CET."},
 {id:"portrait",t:"print",b:{side:"r",gx:60,y:5,r:4},name:"Photo: Jouler framing the camera with his hands",front:`<img alt="Jouler smiling, framing the camera with his hands" src="${'${IMG.frame}'}" draggable="false"><span class="cap">That's me</span>`,back:"<b>Hi, I'm Jouler.</b>Started in QA, now a senior engineer. Still curious."},
 {id:"vinyl",t:"vinyl",b:null,name:"Record: on repeat, Unicornio by Nanpa Básico",front:'<span class="tag">On repeat · Nanpa Básico</span>',back:"<b>On repeat: Unicornio.</b>Nanpa Básico, 2020. I play it start to finish."},
 {id:"naruto",t:"cardobj",b:null,name:"Card: favorite anime, Naruto",front:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M5 18h30c0 9-7 15-15 15S5 27 5 18Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M14 6l3 10M22 4l1 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 18c2-3 5-4 8-3m4 0c3-2 7-1 10 3" fill="none" stroke="var(--fill)" stroke-width="2" stroke-linecap="round"/></svg><b>Favorite anime</b><small>Naruto. Shippuden is my favorite era.</small>',back:"<b>Favorite character: Naruto.</b>Favorite era: Shippuden."},
 {id:"lol",t:"cardobj",b:null,name:"Card: League of Legends",front:'<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="5" y="9" width="30" height="22" rx="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13 16v8M9 20h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="26" cy="18" r="2" fill="var(--fill)"/><circle cx="30" cy="22" r="2" fill="currentColor"/></svg><b>League of Legends</b><small>ADC main. Lucian or Camille.</small>',back:"<b>Team fights, not solo queue.</b>Favorite champions: Lucian and Camille."},
 {id:"pole",t:"cardobj",b:{side:"r",gx:84,y:74,r:-3},name:"Card: pole sport. Flip to see a photo",front:'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3v34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="13" r="3" fill="var(--fill)"/><path d="M14 16l6 4m-6-4-4 8 8 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><b>Pole sport</b><small>Strength, patience and a lot of falling. Flip it.</small>',back:`<img alt="Jouler holding a horizontal pole sport figure in a studio" src="${'${IMG.pole}'}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;position:absolute;inset:0" draggable="false">`,backFull:true}
];
OBJS.forEach(o=>{o.front=o.front.replace(/\$\{IMG\.(\w+)\}/g,(m,k)=>IMG[k]);if(o.back)o.back=o.back.replace(/\$\{IMG\.(\w+)\}/g,(m,k)=>IMG[k])});

// Listing copy from docs/content/projects (approved 2026-10-26). Personal Nexus is deferred and not listed.
const WORK=[
  {slug:"mercado-libre-lists",co:"Mercado Libre",t:"Lists & Gift Registry",y:"2023 – 25",f:"Product engineering · Test strategy · Web views in native apps",img:"meliLists"},
  {slug:"bancolombia-svp",co:"Bancolombia · via PRAGMA",t:"Sucursal Virtual Personas",y:"",f:"Frontend architecture · Micro frontends · Team building",img:"bco"},
  {slug:"goodrx-observability",co:"GoodRx · via EPAM",t:"Datadog to groundcover",y:"2025 – 26",f:"Observability · Real User Monitoring · CI/CD",img:"goodrx"},
  {slug:"brand-platforms",co:"Grupo Familia brands · via PRAGMA",t:"Brand platforms",y:"",f:"Frontend architecture · Gatsby + Contentful · Gamification",img:"petys"},
  {slug:"caps-plus",co:"Cast & Crew · via Remoti",t:"CAPS+",y:"2026",f:"Rebuilding a production-accounting platform, one piece at a time.",img:null,status:"Under construction"}
];
const NOTES=[
  {slug:"qa-taught-me-architecture",t:"What QA taught me about frontend architecture",d:"2026-10-12",li:"https://www.linkedin.com/in/jouler-talaigua",body:"<p>I spent my first years in software breaking other people's code. That habit stayed: when I design a frontend today, I start from how it fails.</p><h2>Three habits I kept</h2><ul><li>Write the empty, loading and error states before the happy path.</li><li>Name things after what the user sees, not after the API.</li><li>Make every bug reproducible in one command.</li></ul><p>None of this is new. It just sticks better when you learned it by finding the bugs yourself.</p>"},
  {slug:"why-we-stopped-at-80",t:"Why we stopped at 80% coverage",d:"2026-09-03",li:null,body:"<p>Chasing 100% makes every change a fight with a number, and people start writing tests that protect nothing.</p><p>An 80% bar plus end-to-end tests on the flows that matter to the business protected more than any percentage.</p>"},
  {slug:"psychology-as-an-engineer",t:"Why I'm studying psychology as an engineer",d:"2025-08-20",li:null,body:"<p>Teams are systems too. The bugs are just harder to reproduce.</p><p>I'm studying psychology to get better at the part of engineering that isn't code: feedback, conflict and helping people grow.</p>"}
];
const fmtDate=d=>new Date(d+"T12:00:00").toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
const shortDate=d=>new Date(d+"T12:00:00").toLocaleDateString("en-US",{year:"numeric",month:"short"});
const ROADMAP=[
  {s:"done",w:"2019",b:"QA Tester at PRAGMA",p:"Where it started: finding what breaks, and why."},
  {s:"done",w:"2019 – 23",b:"Semi-Senior → Senior → Tech Lead",p:"Frontend for banking and marketing products; led a Bancolombia micro-frontend platform, onboarding and guidelines."},
  {s:"done",w:"2023 – 25",b:"Senior Software Engineer, Mercado Libre",p:"Full-stack product work at scale: Lists & Gift Registry, test strategy and app navigation."},
  {s:"done",w:"2025 – 26",b:"Architecture & enablement, EPAM",p:"Guidelines, design-system patterns and observability across product squads."},
  {s:"now",w:"2026",b:"Senior Software Engineer, Cast & Crew",p:"Legacy-to-React migration, monorepos and shared design systems."},
  {s:"now",w:"Learning",b:"Backend depth: Java & Spring Boot",p:"Concurrency, PostgreSQL and system design, studied in the open."},
  {s:"next",w:"Next",b:"TODO(verify): your first Staff-level goal",p:"For example: own a cross-team architecture initiative end to end."},
  {s:"next",w:"Next",b:"TODO(verify): your second Staff-level goal",p:"For example: publish one note a month and mentor two engineers."}
];

const root=document.documentElement,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const live=$("#live"),say=t=>{live.textContent="";setTimeout(()=>live.textContent=t,30)};
const toast=t=>{const e=$("#toast");e.textContent=t;e.classList.add("on");clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove("on"),1600)};
const reduce=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;
const go=fn=>{if(document.startViewTransition&&!reduce()){const t=document.startViewTransition(fn);t.ready.catch(()=>{});t.finished.catch(()=>{})}else fn()};
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const state=Object.assign({scale:"compact",theme:"system"},store.get("jota-v11",{}));


const isDark=()=>state.theme==="dark"||(state.theme==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);
function applyPrefs(){root.dataset.scale=state.scale;if(state.theme==="system")delete root.dataset.theme;else root.dataset.theme=state.theme;const tb=$("#themeBtn");if(tb)tb.setAttribute("aria-pressed",String(isDark()));
  $$(".seg").forEach(s=>s.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.v===state[s.dataset.k]))));store.set("jota-v11",state)}
$$(".seg").forEach(s=>s.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{state[s.dataset.k]=b.dataset.v;applyPrefs()})));
applyPrefs();
$("#themeBtn").addEventListener("click",()=>{state.theme=isDark()?"light":"dark";applyPrefs();say(isDark()?"Dark theme on":"Light theme on")});

// copy
document.addEventListener("click",async e=>{const b=e.target.closest("[data-copy]");if(!b)return;
  try{await navigator.clipboard.writeText(b.dataset.copy);toast("Email copied");say("Email copied")}catch(err){const r=document.createRange();r.selectNodeContents(b.parentElement);getSelection().removeAllRanges();getSelection().addRange(r);toast("Selected — press ⌘C");say("Email selected, copy it with your keyboard")}});
// contact
function toContact(){experience.close({animate:false,restoreFocus:false});experience.leaveBoard();const f=$("#contact");f.scrollIntoView({behavior:reduce()?"auto":"smooth",block:"start"});setTimeout(()=>f.focus({preventScroll:true}),reduce()?0:450)}
document.addEventListener("click",e=>{if(!e.target.closest("[data-contact]"))return;e.preventDefault();toContact()});
document.addEventListener("click",e=>{const a=e.target.closest("[data-todo]");if(!a)return;e.preventDefault();toast("Coming soon: "+a.dataset.todo)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.activeElement?.hasAttribute?.("data-tip"))document.activeElement.classList.add("tip-off")});
document.addEventListener("focusout",e=>e.target.classList?.remove("tip-off"));

// build objects
function makeObj(o,inDesk){
  const b=document.createElement("button");b.type="button";b.className="obj "+o.t;b.dataset.id=o.id;
  b.setAttribute("aria-label",o.name);
  if(!o.go)b.setAttribute("aria-pressed","false");
  b.style.setProperty('--r',((o.id.length%5)-2)*1.5+'deg');
  const flip=document.createElement("div");flip.className="flip";
  const f=document.createElement("div");f.className="face";f.innerHTML=o.front;flip.append(f);
  if(o.back){const bk=document.createElement("div");bk.className="back";bk.innerHTML=o.back;bk.setAttribute("aria-hidden","true");flip.append(bk);
    const d=document.createElement("span");d.className="sr";d.id="desc-"+o.id+(inDesk?"-d":"");d.textContent=bk.textContent||"";b.append(d);if(d.textContent)b.setAttribute("aria-describedby",d.id);b.setAttribute("aria-label",o.name+". Press to flip.")}
  b.prepend(flip);
  if(o.t==="rocket"&&!inDesk&&!reduce()){b.classList.add("intro")}
  return b;
}
const card = $('#card');
const experience = new BoardExperience({
  board: $('#board'), profile: card, dialog: $('#explore'),
  objects: OBJS, createObject: object => makeObj(object, true),
  getView: view => V[view], store, say
});

// work
const BASE="/design/v11/";
const list=$("#workList"),area=$("#workArea"),preview=$("#preview"),wsec=$("#work");
function showPreview(i){const w=WORK[i];preview.replaceChildren();$("#previewCaption").textContent=w.co+" · "+w.t;
  if(w.img){const im=document.createElement("img");im.alt="";im.src=IMG[w.img];preview.append(im)}
  else{const d=document.createElement("div");d.className="empty status-tile";const b=document.createElement("b");b.textContent=w.t;const st=document.createElement("span");st.className="label";st.textContent=w.status;d.append(st,b);preview.append(d)}
  list.querySelectorAll("a").forEach((b,j)=>b.dataset.active=String(j===i))}
function renderList(){wsec.dataset.mode="list";area.replaceChildren(list);if(list.childElementCount)return;
  WORK.forEach((w,i)=>{const li=document.createElement("li"),b=document.createElement("a");b.href=BASE+"work/"+w.slug+"/";b.id="row-"+w.slug;
    const th=document.createElement(w.img?"img":"span");th.className="thumb";if(w.img){th.src=IMG[w.img];th.alt=""}else{th.classList.add("thumb-status");th.textContent=w.status}
    const company=document.createElement("span");company.className="company";company.textContent=w.co;
    const st=document.createElement("strong");st.textContent=w.t;st.style.viewTransitionName="case-title-"+w.slug;
    const a=document.createElement("span");a.className="arrow";a.setAttribute("aria-hidden","true");a.textContent="→";
    const m=document.createElement("span");m.className="meta";m.textContent=(w.y?w.y+" · ":"")+w.f;
    if(w.status){const tag=document.createElement("span");tag.className="status-tag";tag.textContent=w.status;st.append(" ",tag)}
    b.append(th,company,st,a,m);
    b.addEventListener("mouseenter",()=>showPreview(i));b.addEventListener("focus",()=>showPreview(i));
    li.append(b);list.append(li)})}
renderList();showPreview(0);

// notes
const NOTE_URL=location.origin+BASE+"#note-";
function noteRow(n){const li=document.createElement("li"),a=document.createElement("a");a.href="#note-"+n.slug;const b=document.createElement("b");b.textContent=n.t;const t=document.createElement("time");t.dateTime=n.d;t.textContent=shortDate(n.d);a.append(b,t);li.append(a);return li}
const homeNotes=NOTES.slice().sort((a,b)=>b.d.localeCompare(a.d));

// views
const V={home:$("#v-home"),roadmap:$("#v-roadmap"),letter:$("#v-letter"),notes:$("#v-notes"),note:$("#v-note")};
function buildRoadmap(){V.roadmap.innerHTML=`<a class="back-link" href="#home">← Home</a><div class="rm-head">${ROCKET}<div><span class="label">Roadmap</span><h1>Growing from Senior toward Staff</h1></div></div><p class="lead">Where I come from, where I am, and what I'm working towards. Updated as I go.</p><ol class="timeline" id="tl"></ol><p class="draft-note">Draft roadmap · next goals to be defined by Jouler.</p>`;
  const tl=V.roadmap.querySelector("#tl");let nextShown=false;
  ROADMAP.forEach(r=>{if(r.s==="next"&&!nextShown){const h=document.createElement("li");h.className="next-h";h.style.padding="0 0 14px 36px";h.textContent="What's next";tl.append(h);nextShown=true}
    const li=document.createElement("li");li.dataset.s=r.s;li.innerHTML=`<span class="when"><span></span><span class="status ${r.s==="now"?"now":""}">${{done:"Done",now:"In progress",next:"Next"}[r.s]}</span></span><b></b><p></p>`;
    li.querySelector(".when span").textContent=r.w;li.querySelector("b").textContent=r.b;li.querySelector("p").textContent=r.p;tl.append(li)});
  V.roadmap.querySelector(".rm-head svg").style.viewTransitionName="rocket"}
function buildLetter(){V.letter.innerHTML=`<a class="back-link" href="#home">← Home</a><article class="letter" style="view-transition-name:letter"><p class="hi">Hi, curious one,</p><p>If you opened this, you're the kind of person I like working with: someone who looks a little further than the first screen.</p><p>I started testing other people's code in Medellín and ended up leading teams, teaching at universities and moving to Madrid. Along the way I learned that the details users feel and the way teams treat each other matter about the same.</p><p>If something here made you think of a project, a question or just a coffee, write to me. I answer.</p><p class="sign">— Jouler</p></article><p class="draft-note">Sample letter · final text to be written by Jouler.</p>`}
function buildNotes(){V.notes.innerHTML=`<a class="back-pill" href="#home"><span class="chev" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Home<small>Portfolio</small></span></a><div class="notes-index"><span class="label">Notes</span><h1 style="margin-top:6px">Notes</h1><p class="lead">Short things I learned, wrote down, and wanted to keep. Not a blog.</p><div id="byYear"></div><p class="draft-note" style="margin-left:0">Sample notes · final writing by Jouler will replace these.</p></div>`;
  const by={};homeNotes.forEach(n=>{(by[n.d.slice(0,4)]??=[]).push(n)});
  Object.keys(by).sort().reverse().forEach(y=>{const h=document.createElement("h2");h.textContent=y;const ol=document.createElement("ol");ol.className="nlist";by[y].forEach(n=>ol.append(noteRow(n)));V.notes.querySelector("#byYear").append(h,ol)})}
function buildNote(slug){const n=NOTES.find(x=>x.slug===slug);if(!n){V.note.innerHTML='<a class="back-pill" href="#notes"><span class="chev" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>All notes<small>Written along the way</small></span></a><p>Note not found.</p>';return}
  V.note.innerHTML=`<article class="note-page"><a class="back-pill" href="#notes"><span class="chev" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>All notes<small>Written along the way</small></span></a><h1></h1><p class="date"><time></time></p><div class="body">${n.body}</div><div class="note-acts">${n.li?'<a target="_blank" rel="noopener" class="disc">Discuss on LinkedIn</a>':""}<button class="copy" type="button">Copy link</button></div><p class="draft-note" style="margin-left:0">Sample note · final writing by Jouler will replace this.</p></article>`;
  V.note.querySelector("h1").textContent=n.t;const tm=V.note.querySelector("time");tm.dateTime=n.d;tm.textContent=fmtDate(n.d);
  const d=V.note.querySelector(".disc");if(d)d.href=n.li;V.note.querySelector(".copy").dataset.copy=NOTE_URL+n.slug}
buildRoadmap();buildLetter();buildNotes();

const dock = $('#dock');
let current = 'home', workInView = false;
function markDock(view) {
  dock.querySelectorAll('a').forEach(link => {
    const on = link.dataset.v === view || (view === 'note' && link.dataset.v === 'notes');
    if (on) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  });
}
function show(view, arg) {
  current = view;
  Object.entries(V).forEach(([key,element]) => element.hidden = key !== view);
  experience.setHomeVisible(view === 'home');
  if (view === 'note') buildNote(arg);
  markDock(view === 'home' && workInView ? 'work' : view);
  if (view !== 'home') window.scrollTo(0,0);
}
function parse(hash) {
  hash = hash.replace(/^#/,'');
  if (hash.startsWith('note-')) return ['note',hash.slice(5)];
  return ['roadmap','letter','notes'].includes(hash) ? [hash] : ['home'];
}
function nav(hash) {
  experience.close({animate:false,restoreFocus:false});
  const [view,arg] = parse(hash);
  history.pushState(null,'','#' + (view === 'note' ? 'note-' + arg : view));
  go(() => {
    show(view,arg);
    if (view === 'home') { window.scrollTo(0,0); experience.home(); }
    const heading = V[view].querySelector('h1,.hi');
    if (heading && view !== 'home') { heading.tabIndex = -1; heading.focus({preventScroll:true}); }
  });
}
function visitWork(push = true, smooth = true) {
  experience.close({animate:false,restoreFocus:false});
  if (current !== 'home') show('home');
  experience.leaveBoard();
  if (push) history.pushState(null,'','#work');
  requestAnimationFrame(() => {
    $('#work').scrollIntoView({behavior: smooth && !reduce() ? 'smooth' : 'instant', block:'start'});
    const heading = $('#h-work'); heading.tabIndex = -1; heading.focus({preventScroll:true});
    markDock('work');
  });
}
function returnToRow(slug) {
  experience.close({animate:false,restoreFocus:false});
  experience.leaveBoard();
  const row = document.getElementById('row-' + slug);
  if (!row) { visitWork(false,false); return; }
  requestAnimationFrame(() => {
    row.scrollIntoView({behavior:'instant', block:'center'});
    row.focus({preventScroll:true});
    showPreview(WORK.findIndex(w => w.slug === slug));
    markDock('work');
  });
}
function fromHash() {
  const hash = location.hash.slice(1);
  if (hash === 'work') {
    show('home');
    // Browser Back from a case page returns to that case's row.
    let last = null; try { last = sessionStorage.getItem('jota-v11-last-case'); } catch {}
    const backNav = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
    if (last && backNav && document.getElementById('row-' + last)) { returnToRow(last); return; }
    visitWork(false,false); return;
  }
  if (hash.startsWith('work-')) { show('home'); returnToRow(hash.slice(5)); return; }
  if (hash === 'contact') { show('home'); toContact(); return; }
  if (hash.startsWith('explore')) {
    show('home'); experience.open($('#card [data-mobile-explore]'),false);
    const panel = hash.slice(8);
    if (panel) experience.openPanel(panel,false);
    else if (!experience.panel.hidden) experience.closePanel(false);
    return;
  }
  experience.close({animate:false,restoreFocus:false});
  const [view,arg] = parse(hash);
  show(view,arg);
  if (view === 'home') { window.scrollTo(0,0); experience.home(); }
}
document.addEventListener('jota:visit-work',() => visitWork());
window.addEventListener('hashchange',fromHash);
window.addEventListener('popstate',fromHash);
document.addEventListener('click',event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.hasAttribute('data-contact') || link.hasAttribute('data-todo')) return;
  const hash = link.getAttribute('href').slice(1);
  if (link.classList.contains('skip')) { experience.leaveBoard(); return; }
  if (hash === 'contact') { experience.leaveBoard(); return; }
  event.preventDefault();
  if (hash === 'explore') { experience.open(link); return; }
  if (hash === 'work') { visitWork(); return; }
  nav(hash);
});
new IntersectionObserver(entries => {
  entries.forEach(entry => workInView = entry.isIntersecting);
  if (current === 'home') markDock(workInView ? 'work' : 'home');
}, {rootMargin:'-40% 0px -40% 0px'}).observe($('#work'));
new IntersectionObserver(entries => entries.forEach(entry => dock.classList.toggle('away',entry.isIntersecting)), {threshold:.15}).observe($('#contact'));
fromHash(); markDock(current);

setupPageScroll();
