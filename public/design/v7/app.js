import { DeskCamera, setupPageScroll } from './canvas.js';

const IMG={"talk": "/design/assets/talk.jpg", "moto": "/design/assets/moto.jpg", "frame": "/design/assets/frame.jpg", "pole": "/design/assets/pole.jpg", "meli": "/design/assets/meli.jpg", "bco": "/design/v7/assets/bancolombia-devices.png"};
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

const WORK=[
  {t:"Mercado Libre · Prize roulette",m:"2024 · First gamification game for Brazil · Node, Express, React, BFF",d:"A playful acquisition surface that had to stay fast on low-end phones. Server-rendered with Express behind a Backend-for-Frontend, with coupon rewards tied to purchases.",img:null},
  {t:"Mercado Libre · Favorites & Gift Lists",m:"2023 – 25 · Retention surface used by millions · React, SSR",d:"Save, organize and share products across the app. The team went from no automated tests to more than 80% coverage with WebDriverIO.",img:"meli"},
  {t:"Bancolombia · Micro frontends",m:"2021 – 23 · Tech lead at PRAGMA · Angular, Module Federation, Spring Boot",d:"Micro frontends with Module Federation and Clean Architecture, integrated with Java Spring Boot microservices, plus onboarding and guidelines for enterprise teams.",img:"bco"},
  {t:"Cast & Crew · CAPS+ migration",m:"2026 · Legacy .NET portal to React · monorepo, design system",d:"Moving production-accounting workflows to a modern React application with shared packages and client-side micro frontends.",img:null},
  {t:"Ekou Personal Nexus",m:"Personal · React Native, Expo, AI",d:"A transaction-driven personal-finance app with an AI capture layer: voice, OCR, Apple Pay shortcuts and a bilingual assistant.",img:null}
];
const NOTES=[
  {slug:"qa-taught-me-architecture",t:"What QA taught me about frontend architecture",d:"2026-10-12",li:"https://www.linkedin.com/in/jouler-talaigua",body:"<p>I spent my first years in software breaking other people's code. That habit stayed: when I design a frontend today, I start from how it fails.</p><h2>Three habits I kept</h2><ul><li>Write the empty, loading and error states before the happy path.</li><li>Name things after what the user sees, not after the API.</li><li>Make every bug reproducible in one command.</li></ul><p>None of this is new. It just sticks better when you learned it by finding the bugs yourself.</p>"},
  {slug:"a-game-inside-ecommerce",t:"Shipping a game inside an e-commerce app",d:"2026-09-03",li:null,body:"<p>A prize roulette sounds like a toy. Inside a marketplace with millions of users, on low-end phones, it is a performance problem with a fun skin.</p><p>We rendered on the server, kept the client tiny and let the Backend-for-Frontend own the rules.</p>"},
  {slug:"psychology-as-an-engineer",t:"Why I'm studying psychology as an engineer",d:"2025-08-20",li:null,body:"<p>Teams are systems too. The bugs are just harder to reproduce.</p><p>I'm studying psychology to get better at the part of engineering that isn't code: feedback, conflict and helping people grow.</p>"}
];
const fmtDate=d=>new Date(d+"T12:00:00").toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});
const shortDate=d=>new Date(d+"T12:00:00").toLocaleDateString("en-US",{year:"numeric",month:"short"});
const ROADMAP=[
  {s:"done",w:"2019",b:"QA Tester at PRAGMA",p:"Where it started: finding what breaks, and why."},
  {s:"done",w:"2019 – 23",b:"Semi-Senior → Senior → Tech Lead",p:"Frontend for banking and marketing products; led a Bancolombia micro-frontend platform, onboarding and guidelines."},
  {s:"done",w:"2023 – 25",b:"Senior Software Engineer, Mercado Libre",p:"Full-stack product work at scale: gamification, Favorites & Gift Lists, test culture across a 20-engineer team."},
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
const state=Object.assign({scale:"compact",theme:"system"},store.get("jota-v7",{}));
const pos=store.get("jota-v7-pos",{});
const deskPos={desktop:store.get("jota-v7-desk-pos-desktop",{}),mobile:store.get("jota-v7-desk-pos-mobile",{})};

const isDark=()=>state.theme==="dark"||(state.theme==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);
function applyPrefs(){root.dataset.scale=state.scale;if(state.theme==="system")delete root.dataset.theme;else root.dataset.theme=state.theme;const tb=$("#themeBtn");if(tb)tb.setAttribute("aria-pressed",String(isDark()));
  $$(".seg").forEach(s=>s.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.v===state[s.dataset.k]))));store.set("jota-v7",state)}
$$(".seg").forEach(s=>s.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{state[s.dataset.k]=b.dataset.v;applyPrefs()})));
applyPrefs();
$("#themeBtn").addEventListener("click",()=>{state.theme=isDark()?"light":"dark";applyPrefs();say(isDark()?"Dark theme on":"Light theme on")});

// copy
document.addEventListener("click",async e=>{const b=e.target.closest("[data-copy]");if(!b)return;
  try{await navigator.clipboard.writeText(b.dataset.copy);toast("Email copied");say("Email copied")}catch(err){const r=document.createRange();r.selectNodeContents(b.parentElement);getSelection().removeAllRanges();getSelection().addRange(r);toast("Selected — press ⌘C");say("Email selected, copy it with your keyboard")}});
// contact
function toContact(){const f=$("#contact");f.scrollIntoView({behavior:reduce()?"auto":"smooth",block:"start"});setTimeout(()=>f.focus({preventScroll:true}),reduce()?0:450)}
document.addEventListener("click",e=>{if(!e.target.closest("[data-contact]"))return;e.preventDefault();if($("#explore").open)$("#explore").close();toContact()});
document.addEventListener("click",e=>{const a=e.target.closest("[data-todo]");if(!a)return;e.preventDefault();toast("Coming soon: "+a.dataset.todo)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.activeElement?.hasAttribute?.("data-tip"))document.activeElement.classList.add("tip-off")});
document.addEventListener("focusout",e=>e.target.classList?.remove("tip-off"));

// build objects
function makeObj(o,inDesk){
  const b=document.createElement("button");b.type="button";b.className="obj "+o.t;b.dataset.id=o.id;
  b.setAttribute("aria-label",o.name);
  if(!o.go)b.setAttribute("aria-pressed","false");
  if(!inDesk&&o.b){b.dataset.side=o.b.side;b.style.setProperty("--gx",o.b.gx+"px");b.style.setProperty("--y",o.b.y+"%");b.style.setProperty("--r",o.b.r+"deg");
    const p=pos[o.id];if(p){b.style.setProperty("--dx",p[0]+"px");b.style.setProperty("--dy",p[1]+"px")}}
  else b.style.setProperty("--r",((o.id.length%5)-2)*1.5+"deg");
  const flip=document.createElement("div");flip.className="flip";
  const f=document.createElement("div");f.className="face";f.innerHTML=o.front;flip.append(f);
  if(o.back){const bk=document.createElement("div");bk.className="back";bk.innerHTML=o.back;bk.setAttribute("aria-hidden","true");flip.append(bk);
    const d=document.createElement("span");d.className="sr";d.id="desc-"+o.id+(inDesk?"-d":"");d.textContent=bk.textContent||"";b.append(d);if(d.textContent)b.setAttribute("aria-describedby",d.id);b.setAttribute("aria-label",o.name+". Press to flip.")}
  b.prepend(flip);
  if(o.t==="rocket"&&!inDesk&&!reduce()){b.classList.add("intro")}
  return b;
}
const objBox=$("#objects");
OBJS.filter(o=>o.b).forEach(o=>objBox.append(makeObj(o,false)));
const desk=$("#desk");
const deskCard=$("#card").cloneNode(true);deskCard.id="deskCard";desk.append(deskCard);
const desktopPlacements={moto:[145,185],teach:[225,530],envelope:[780,1040],rocket:[1320,500],ticket:[170,940],portrait:[1340,140],vinyl:[1270,970],naruto:[280,1180],lol:[1490,1160],pole:[1340,750]};
const mobilePlacements={moto:[280,330],teach:[475,125],envelope:[550,950],rocket:[900,580],ticket:[250,820],portrait:[820,280],vinyl:[900,1040],naruto:[170,1160],lol:[990,1250],pole:[530,1280]};
OBJS.forEach(o=>desk.append(makeObj(o,true)));
const mobile=()=>matchMedia("(max-width:900px)").matches;
function layoutDesk(){const positions=mobile()?mobilePlacements:desktopPlacements;desk.querySelectorAll('.obj').forEach(b=>{const p=positions[b.dataset.id];b.style.setProperty('--x',p[0]+'px');b.style.setProperty('--y',p[1]+'px');const saved=deskPos[mobile()?'mobile':'desktop'][b.dataset.id]||[0,0];setD(b,...saved)})}
layoutDesk();
deskCard.querySelector('[data-mobile-explore]').textContent='A letter for you';
const camera=new DeskCamera($('#deskViewport'),desk,deskCard);


function activate(b){const o=OBJS.find(x=>x.id===b.dataset.id);
  if(o.go){if(o.go==="roadmap"&&!reduce()){b.classList.add("launch");setTimeout(()=>{b.classList.remove("launch");nav(o.go)},360)}else nav(o.go);return}
  b.setAttribute("aria-pressed",String(b.getAttribute("aria-pressed")!=="true"))}

// drag + locked card zone
const desktop=()=>matchMedia("(min-width:901px)").matches;
const board=$("#board"),card=$("#card");
function getD(b){return [parseFloat(b.style.getPropertyValue("--dx"))||0,parseFloat(b.style.getPropertyValue("--dy"))||0]}
function setD(b,x,y){b.style.setProperty("--dx",x+"px");b.style.setProperty("--dy",y+"px")}
function settle(b,announce){
  const expanded=b.parentElement===desk,container=expanded?desk:board,locked=expanded?deskCard:card;
  const m=20,c=locked.getBoundingClientRect(),bd=container.getBoundingClientRect(),r=b.getBoundingClientRect();
  let [x,y]=getD(b);const L=bd.left+12,R=bd.right-12,T=bd.top+12,B=bd.bottom-(expanded?12:66);
  const clamp=(dx,dy)=>[Math.max(L-r.left,Math.min(R-r.right,dx)),Math.max(T-r.top,Math.min(B-r.bottom,dy))];
  const hits=(dx,dy)=>r.right+dx>c.left-m&&r.left+dx<c.right+m&&r.bottom+dy>c.top-m&&r.top+dy<c.bottom+m;
  let [dx,dy]=clamp(0,0),pushed=false;
  if(hits(dx,dy)){
    const options=[[c.left-m-r.right,dy],[c.right+m-r.left,dy],[dx,c.top-m-r.bottom],[dx,c.bottom+m-r.top]]
      .map(([a,z])=>clamp(a,z)).filter(([a,z])=>!hits(a,z)).sort((a,z)=>Math.hypot(...a)-Math.hypot(...z));
    if(options.length){[dx,dy]=options[0];pushed=true}
  }
  setD(b,x+dx/(expanded?camera.scale:1),y+dy/(expanded?camera.scale:1));const positions=expanded?deskPos[mobile()?"mobile":"desktop"]:pos;positions[b.dataset.id]=getD(b);
  store.set(expanded?"jota-v7-desk-pos-"+(mobile()?"mobile":"desktop"):"jota-v7-pos",positions);
  if(announce)say(b.getAttribute("aria-label").split(".")[0]+(pushed?": moved off the card":": placed"));
}
$$("#objects .obj,#desk .obj").forEach(b=>{
  const expanded=b.parentElement===desk,locked=expanded?deskCard:card;
  let sx=0,sy=0,bx=0,by=0,moved=false,down=false,id=null;
  b.addEventListener("pointerdown",e=>{if((!expanded&&!desktop())||e.button!==0)return;down=true;moved=false;id=e.pointerId;sx=e.clientX;sy=e.clientY;[bx,by]=getD(b)});
  b.addEventListener("pointermove",e=>{if(!down||e.pointerId!==id)return;const dx=e.clientX-sx,dy=e.clientY-sy;
    if(!moved&&Math.hypot(dx,dy)>5){moved=true;b.setPointerCapture(id);b.classList.add("dragging");locked.classList.add("guard")}
    if(moved){const scale=expanded?camera.scale:1;setD(b,bx+dx/scale,by+dy/scale)}});
  const end=()=>{if(!down)return;down=false;if(moved){b.classList.remove("dragging");locked.classList.remove("guard");settle(b,false);b.dataset.jd="1";setTimeout(()=>delete b.dataset.jd,0)}};
  b.addEventListener("pointerup",end);b.addEventListener("pointercancel",end);
  b.addEventListener("click",()=>{if(b.dataset.jd||b.classList.contains("moving"))return;const o=OBJS.find(x=>x.id===b.dataset.id);if(expanded&&o.go){openDeskPanel(o.go);return}if(expanded&&camera.scale<.75){camera.focusObject(b);return}activate(b)});
  b.addEventListener("keydown",e=>{
    if(!expanded&&!desktop())return;
    if(e.key.toLowerCase()==="m"){e.preventDefault();const on=!b.classList.contains("moving");b.classList.toggle("moving",on);locked.classList.toggle("guard",on);if(on)say("Move mode. Arrow keys to move; Enter or Escape to drop.");else settle(b,true);return}
    if(!b.classList.contains("moving"))return;
    const k={ArrowLeft:[-16,0],ArrowRight:[16,0],ArrowUp:[0,-16],ArrowDown:[0,16]}[e.key];
    if(k){e.preventDefault();const [x,y]=getD(b);setD(b,x+k[0],y+k[1])}
    else if(e.key==="Enter"||e.key==="Escape"){e.preventDefault();e.stopPropagation();b.classList.remove("moving");locked.classList.remove("guard");settle(b,true)}
  });
});

// The same desk becomes a pannable world; the card stays its visual anchor.
const dlg=$("#explore"),exBtn=$("#exploreBtn"),deskPanel=$("#deskPanel");
let exploreReturn=exBtn,exploreOrigin="#home",panelReturn=null;
function openExplore(trigger=exBtn,push=true){
  if(dlg.open)return;
  exploreReturn=mobile()&&trigger===exBtn?$('#card [data-mobile-explore]'):trigger;exploreOrigin=location.hash.startsWith('#explore')?'#home':(location.hash||'#home');
  dlg.showModal();layoutDesk();camera.center();
  if(push&&!location.hash.startsWith('#explore'))history.pushState(null,'','#explore');
  $('#deskViewport').focus({preventScroll:true});
}
function closeDeskPanel(update=true){deskPanel.hidden=true;deskPanel.replaceChildren();$('#deskViewport').inert=false;dlg.classList.remove('is-reading');if(update)history.replaceState(null,'','#explore');if(panelReturn)panelReturn.focus({preventScroll:true})}
function openDeskPanel(view,update=true){
  if(!['letter','roadmap'].includes(view))return;
  panelReturn=document.activeElement;
  const content=V[view].cloneNode(true);content.removeAttribute('id');content.hidden=false;content.className='panel-content';
  content.querySelector('.back-link')?.remove();content.querySelectorAll('[id]').forEach(e=>e.removeAttribute('id'));content.querySelectorAll('[style]').forEach(e=>e.style.removeProperty('view-transition-name'));
  const title=document.createElement('h2');title.id='deskPanelTitle';title.className='sr';title.textContent=view==='letter'?'A letter for you':'My roadmap';
  const back=document.createElement('button');back.type='button';back.className='btn ghost sm';back.textContent='← Back to desk';back.addEventListener('click',()=>closeDeskPanel());
  deskPanel.replaceChildren(title,back,content);deskPanel.hidden=false;deskPanel.scrollTop=0;$('#deskViewport').inert=true;dlg.classList.add('is-reading');
  if(update)history.replaceState(null,'','#explore-'+view);deskPanel.focus({preventScroll:true});
}
exBtn.addEventListener('click',()=>openExplore(exBtn));
$('#exClose').addEventListener('click',()=>dlg.close());
dlg.addEventListener('cancel',e=>{if(!deskPanel.hidden){e.preventDefault();closeDeskPanel()}});
dlg.addEventListener('close',()=>{
  camera.stop();desk.querySelectorAll('.moving').forEach(b=>{b.classList.remove('moving');settle(b,false)});deskCard.classList.remove('guard');
  deskPanel.hidden=true;$('#deskViewport').inert=false;dlg.classList.remove('is-reading');
  if(location.hash.startsWith('#explore'))history.replaceState(null,'',exploreOrigin);
  if(exploreReturn?.isConnected)exploreReturn.focus({preventScroll:true});
});
const breakpoint=matchMedia('(max-width:900px)');
function syncMobileEntry(){const entry=$('#card [data-mobile-explore]');entry.href=mobile()?'#explore':'#letter';if(mobile())entry.setAttribute('aria-haspopup','dialog');else entry.removeAttribute('aria-haspopup');if(dlg.open){layoutDesk();camera.center()}}
breakpoint.addEventListener('change',syncMobileEntry);syncMobileEntry();
window.addEventListener('resize',()=>{if(dlg.open){layoutDesk();camera.center()}});

// work
const SLUGS=["prize-roulette","favorites-gift-lists","bancolombia-micro-frontends","caps-migration","personal-nexus"];
const BASE="/design/v7/";
const list=$("#workList"),area=$("#workArea"),preview=$("#preview"),wsec=$("#work");
function showPreview(i){const w=WORK[i];preview.replaceChildren();$("#previewCaption").textContent=w.t;
  if(w.img){const im=document.createElement("img");im.alt="";im.src=IMG[w.img];im.style.viewTransitionName="shot";preview.append(im)}
  else{const d=document.createElement("div");d.className="empty";const b=document.createElement("b");b.textContent=w.t.split(" · ")[1]||w.t;const s=document.createElement("span");s.textContent="Image coming soon";d.append(b,s);preview.append(d)}
  list.querySelectorAll("a").forEach((b,j)=>b.dataset.active=String(j===i))}
function renderList(){wsec.dataset.mode="list";area.replaceChildren(list);if(list.childElementCount)return;
  WORK.forEach((w,i)=>{const li=document.createElement("li"),b=document.createElement("a");b.href=BASE+"work/"+SLUGS[i]+"/";
    const th=document.createElement(w.img?"img":"span");th.className="thumb";if(w.img){th.src=IMG[w.img];th.alt=""}
    const company=document.createElement("span");company.className="company";company.textContent=w.t.includes(" · ")?w.t.split(" · ")[0]:"Independent project";
    const number=document.createElement("span");number.className="work-number";number.textContent=String(i+1).padStart(2,"0");number.setAttribute("aria-hidden","true");
    const st=document.createElement("strong");st.textContent=w.t.split(" · ").slice(1).join(" · ")||w.t;st.style.viewTransitionName="t"+i;
    const a=document.createElement("span");a.className="arrow";a.setAttribute("aria-hidden","true");a.textContent="→";
    const m=document.createElement("span");m.className="meta";m.textContent=w.m.split(" · ").slice(0,2).join(" · ");b.append(th,number,company,st,a,m);
    b.addEventListener("mouseenter",()=>showPreview(i));b.addEventListener("focus",()=>showPreview(i));
    b.addEventListener("click",()=>showPreview(i));li.append(b);list.append(li)})}
renderList();showPreview(2);

// notes
const NOTE_URL=location.origin+BASE+"#note-";
function noteRow(n){const li=document.createElement("li"),a=document.createElement("a");a.href="#note-"+n.slug;const b=document.createElement("b");b.textContent=n.t;const t=document.createElement("time");t.dateTime=n.d;t.textContent=shortDate(n.d);a.append(b,t);li.append(a);return li}
const homeNotes=NOTES.slice().sort((a,b)=>b.d.localeCompare(a.d));
if(homeNotes.length>=3)homeNotes.slice(0,3).forEach(n=>$("#notesHomeList").append(noteRow(n)));else $("#notesHome").hidden=true;

// views
const V={home:$("#v-home"),roadmap:$("#v-roadmap"),letter:$("#v-letter"),notes:$("#v-notes"),note:$("#v-note")};
function buildRoadmap(){V.roadmap.innerHTML=`<a class="back-link" href="#home">← Home</a><div class="rm-head">${ROCKET}<div><span class="label">Roadmap</span><h1>Growing from Senior toward Staff</h1></div></div><p class="lead">Where I come from, where I am, and what I'm working towards. Updated as I go.</p><ol class="timeline" id="tl"></ol><p class="draft-note">Draft roadmap · next goals to be defined by Jouler.</p>`;
  const tl=V.roadmap.querySelector("#tl");let nextShown=false;
  ROADMAP.forEach(r=>{if(r.s==="next"&&!nextShown){const h=document.createElement("li");h.className="next-h";h.style.padding="0 0 14px 36px";h.textContent="What's next";tl.append(h);nextShown=true}
    const li=document.createElement("li");li.dataset.s=r.s;li.innerHTML=`<span class="when"><span></span><span class="status ${r.s==="now"?"now":""}">${{done:"Done",now:"In progress",next:"Next"}[r.s]}</span></span><b></b><p></p>`;
    li.querySelector(".when span").textContent=r.w;li.querySelector("b").textContent=r.b;li.querySelector("p").textContent=r.p;tl.append(li)});
  V.roadmap.querySelector(".rm-head svg").style.viewTransitionName="rocket"}
function buildLetter(){V.letter.innerHTML=`<a class="back-link" href="#home">← Home</a><article class="letter" style="view-transition-name:letter"><p class="hi">Hi, curious one,</p><p>If you opened this, you're the kind of person I like working with: someone who looks a little further than the first screen.</p><p>I started testing other people's code in Medellín and ended up leading teams, teaching at universities and moving to Madrid. Along the way I learned that the details users feel and the way teams treat each other matter about the same.</p><p>If something here made you think of a project, a question or just a coffee, write to me. I answer.</p><p class="sign">— Jouler</p></article><p class="draft-note">Sample letter · final text to be written by Jouler.</p>`}
function buildNotes(){V.notes.innerHTML=`<a class="back-link" href="#home">← Home</a><div class="notes-index"><span class="label">Notes</span><h1 style="margin-top:6px">Notes</h1><p class="lead">Short things I learned, wrote down, and wanted to keep. Not a blog.</p><div id="byYear"></div><p class="draft-note" style="margin-left:0">Sample notes · final writing by Jouler will replace these.</p></div>`;
  const by={};homeNotes.forEach(n=>{(by[n.d.slice(0,4)]??=[]).push(n)});
  Object.keys(by).sort().reverse().forEach(y=>{const h=document.createElement("h2");h.textContent=y;const ol=document.createElement("ol");ol.className="nlist";by[y].forEach(n=>ol.append(noteRow(n)));V.notes.querySelector("#byYear").append(h,ol)})}
function buildNote(slug){const n=NOTES.find(x=>x.slug===slug);if(!n){V.note.innerHTML='<a class="pill-back" href="#notes">↰ Notes</a><p>Note not found.</p>';return}
  V.note.innerHTML=`<article class="note-page"><a class="pill-back" href="#notes">↰ Notes</a><h1></h1><p class="date"><time></time></p><div class="body">${n.body}</div><div class="note-acts">${n.li?'<a target="_blank" rel="noopener" class="disc">Discuss on LinkedIn</a>':""}<button class="copy" type="button">Copy link</button></div><p class="draft-note" style="margin-left:0">Sample note · final writing by Jouler will replace this.</p></article>`;
  V.note.querySelector("h1").textContent=n.t;const tm=V.note.querySelector("time");tm.dateTime=n.d;tm.textContent=fmtDate(n.d);
  const d=V.note.querySelector(".disc");if(d)d.href=n.li;V.note.querySelector(".copy").dataset.copy=NOTE_URL+n.slug}
buildRoadmap();buildLetter();buildNotes();

const dock=$("#dock");
function markDock(v){dock.querySelectorAll("a").forEach(a=>{const on=a.dataset.v===v||(v==="note"&&a.dataset.v==="notes");if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")})}
let current="home";
function show(v,arg){current=v;Object.entries(V).forEach(([k,el])=>el.hidden=k!==v);
  if(v==="note")buildNote(arg);
  const env=$('#objects .obj[data-id="envelope"]'),rk=$('#objects .obj[data-id="rocket"] svg');
  if(env)env.style.viewTransitionName=v==="home"?"letter":"";if(rk)rk.style.viewTransitionName=v==="home"?"rocket":"";
  markDock(v==="home"&&workInView?"work":v);
  if(v!=="home")window.scrollTo(0,0)}
function parse(h){h=h.replace(/^#/,"");if(h.startsWith("note-"))return["note",h.slice(5)];if(["roadmap","letter","notes"].includes(h))return[h];return["home"]}
function nav(hash){const [v,arg]=parse(hash);
  const rk=$('#objects .obj[data-id="rocket"] svg');if(v==="roadmap"&&rk)rk.style.viewTransitionName="rocket";
  history.pushState(null,"","#"+(v==="note"?"note-"+arg:v));go(()=>show(v,arg));if(v==="home")window.scrollTo(0,0);
  const t=V[v].querySelector("h1,.hi");if(t){t.tabIndex=-1;t.focus({preventScroll:true})}}
function fromHash(){const h=location.hash.slice(1);if(h.startsWith("explore")){show("home");openExplore(exBtn,false);const panel=h.slice(8);if(panel)openDeskPanel(panel,false);else if(!deskPanel.hidden)closeDeskPanel(false);return}
  if(dlg.open)dlg.close();
  const [v,arg]=parse(h);if(v==="home"&&current==="home")return;go(()=>show(v,arg))}
window.addEventListener("hashchange",fromHash);
document.addEventListener("click",e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.hasAttribute("data-contact")||a.hasAttribute("data-todo")||a.classList.contains("skip"))return;const h=a.getAttribute("href").slice(1);
  if(document.body.hasAttribute("data-case")){e.preventDefault();location.href=BASE+"#"+h;return}
  if(h==='explore'){e.preventDefault();openExplore(a);return}
  if(a.closest('#deskCard')&&h==='letter'){e.preventDefault();openDeskPanel('letter');return}
  if(h==="work"){e.preventDefault();if(dlg.open)dlg.close();const scroll=()=>$("#work").scrollIntoView({behavior:reduce()?"auto":"smooth"});if(current!=="home"){nav("home");setTimeout(scroll,350)}else scroll();return}
  if(document.body.hasAttribute("data-case")){e.preventDefault();location.href=BASE+"#"+h;return}
  if(h==="contact")return;
  e.preventDefault();if(dlg.open)dlg.close();nav(h)});
// dock: mark Work while the work section is in view; hide when the footer is visible
let workInView=false;
new IntersectionObserver(es=>{es.forEach(en=>{workInView=en.isIntersecting});if(current==="home")markDock(workInView?"work":"home")},{rootMargin:"-40% 0px -40% 0px"}).observe($("#work"));
new IntersectionObserver(es=>es.forEach(en=>dock.classList.toggle("away",en.isIntersecting)),{threshold:.15}).observe($("#contact"));
fromHash();markDock(current);


// Dedicated case pages use the inherited sample text; no final claims are authored here.
if(document.body.hasAttribute("data-case")){
  const i=Number(document.body.dataset.case),w=WORK[i],page=$("#v-case");
  Object.values(V).forEach(v=>v.hidden=true);page.hidden=false;
  const signature=card.querySelector(".mark").cloneNode(true);signature.href=BASE;page.append(signature);
  const back=document.createElement("a");back.href=BASE+"#work";back.className="back-link";back.textContent="← Selected work";back.style.display="flex";page.append(back);
  const label=document.createElement("span");label.className="label";label.textContent="Selected work · design preview";
  const title=document.createElement("h1");title.textContent=w.t;title.style.viewTransitionName="t"+i;
  const meta=document.createElement("p");meta.className="case-meta";meta.textContent=w.m;
  const text=document.createElement("p");text.className="case-summary";text.textContent=w.d;page.append(label,title,meta,text);
  if(w.img){const figure=document.createElement("figure");figure.className="case-image";const image=document.createElement("img");image.src=IMG[w.img];image.alt="Screenshot of "+w.t;image.style.viewTransitionName="shot";figure.append(image);page.append(figure)}
  const note=document.createElement("p");note.className="sample-caption";note.textContent="This page tests the project navigation and visual layout. Text is inherited sample content; final context, responsibilities, decisions and outcomes will be prepared by Jouler.";page.append(note);
  dock.querySelectorAll('a[href^="#"]').forEach(a=>a.href=BASE+a.getAttribute("href"));
  document.querySelectorAll("#contact .f-cols > div:first-child a").forEach(a=>a.href=BASE+a.getAttribute("href"));
  document.title=w.t+" — Jouler Talaigua";current="case";markDock("work");
}

setupPageScroll();
