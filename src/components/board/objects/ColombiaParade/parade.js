// The Colombia parade: jointed SVG characters built as markup, a slow skyline behind them, confetti, and one
// original music loop per scene synthesised with the Web Audio API (no recordings, no samples).
// Plain JavaScript on purpose: it is drawing and sound code ported from the design prototype
// (docs/design/board-proposals/board-v4.html), where it was tuned by eye and ear.

/* global AudioContext, clearInterval, performance, requestAnimationFrame, setInterval, setTimeout */

/** Every class in the generated markup gets the component's prefix, so its styles cannot touch anything else. */
const prefixed = (markup) =>
  markup.replace(
    /class="([^"]*)"/g,
    (_, names) =>
      `class="${names
        .split(/\s+/)
        .filter(Boolean)
        .map((name) => `colombia-parade__${name}`)
        .join(" ")}"`,
  );

/**
 * Builds the parade inside `root` and wires the flag and the sound button.
 * @param {HTMLElement} root the <colombia-parade> element; it carries `data-on` while the parade runs
 * @param {{ line: SVGElement, back: SVGElement, confetti: HTMLElement, scene: HTMLElement, flag: HTMLElement, sound: HTMLElement }} parts
 * @param {string[]} scenes the five scene names, in order
 * @param {{ soundOn: string, soundOff: string }} labels
 * @returns {() => void} stops the parade and its music
 */
export function mountParade(root, parts, scenes, labels) {
  const INK = "#141517";
  let seed = 11;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const pick = (list) => list[Math.floor(rand() * list.length)];
  const SKINS = ["#c98d5e", "#a86f45", "#e0ac7e", "#8a5a3a", "#d39a6a"];
  const BRIGHT = ["#fcd116", "#e23d8b", "#ff8a3d", "#d9453a", "#9a7bff", "#3aa0d9", "#ffffff"];
  const GROUND = 314;
  const shade = (hex, k) =>
    "#" +
    [1, 3, 5]
      .map((i) =>
        Math.max(0, Math.min(255, Math.round(parseInt(hex.slice(i, i + 2), 16) * k)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("");

  // ---------- Character rig ----------
  const bone = (len, width, color) =>
    `<path d="M0 0V${len}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" />`;
  const joint = (x, y, cls, style, inner, angle) =>
    `<g transform="translate(${x} ${y})"><g class="${cls || ""}" style="${style || ""}${angle != null ? `transform: rotate(${angle}deg);` : ""}">${inner}</g></g>`;

  function leg(o, delay, far) {
    const cloth = far ? shade(o.bottom, 0.8) : o.bottom;
    const shoe = `<path d="M-9 33h13a4 4 0 0 1 0 8h-15a3 3 0 0 1-2-5Z" fill="${o.shoes || INK}" />`;
    const shin = bone(31, 10, o.bare ? (far ? shade(o.skin, 0.85) : o.skin) : cloth) + shoe;
    const moving = o.legs !== "still";
    return joint(
      far ? 3 : -3,
      0,
      moving ? "thigh" : "",
      `animation-delay: ${delay}s;`,
      bone(34, 13, o.bare ? (far ? shade(o.skin, 0.85) : o.skin) : cloth) +
        joint(0, 34, moving ? "shin" : "", `animation-delay: ${delay}s;`, shin),
      moving ? null : far ? -4 : 5,
    );
  }
  function arm(o, pose, delay, far) {
    const sleeve = far ? shade(o.sleeve || o.top, 0.82) : o.sleeve || o.top;
    const skin = far ? shade(o.skin, 0.85) : o.skin;
    const hand = `<circle cx="0" cy="22" r="5" fill="${o.gloves || skin}" />${pose.hold || ""}`;
    const fore = bone(20, 8, o.shortSleeve ? skin : sleeve) + hand;
    const swing = pose === "swing";
    return joint(
      far ? 9 : -9,
      -40,
      swing ? "swing" : pose.cls || "",
      `animation-delay: ${delay}s;`,
      bone(21, 9.5, sleeve) + joint(0, 21, pose.foreCls || "", "", fore, swing ? 14 : pose.fore),
      swing ? null : pose.upper,
    );
  }
  const HAIR = {
    short: (c) => `<path d="M-12 -2c-2-16 26-18 24-1-2-6-8-9-12-8s-10 3-12 9Z" fill="${c}" />`,
    curly: (c) =>
      `<path d="M-12 0c-5-8 0-17 8-15 3-5 12-4 13 1 6 0 7 9 3 13-2-7-6-9-12-9s-10 3-12 10Z" fill="${c}" />`,
    long: (c) => `<path d="M-12 -2c-2-16 26-18 24-1-2-6-8-9-12-8s-10 3-12 9Z" fill="${c}" />`,
    bun: (c) =>
      `<circle cx="9" cy="-13" r="6.5" fill="${c}" /><path d="M-12 -2c-2-16 26-18 24-1-2-6-8-9-12-8s-10 3-12 9Z" fill="${c}" />`,
    none: () => "",
  };
  const HAIR_BACK = {
    long: (c) => `<path d="M-2 -12c16-2 16 12 14 34h-13Z" fill="${c}" />`,
    braids: (c) =>
      `<path d="M6 -6c7 6 5 22 3 34" stroke="${c}" stroke-width="6" stroke-linecap="round" fill="none" /><circle cx="9" cy="30" r="3.4" fill="#d9453a" />`,
  };
  function head(o) {
    const hair = o.hairColor || "#1c1e22";
    const face = o.mask
      ? o.mask
      : `<ellipse rx="11" ry="12.5" fill="${o.skin}" /><ellipse cx="10" cy="1" rx="2.6" ry="3.6" fill="${shade(o.skin, 0.86)}" />
       <path d="M-10.5 0q-4 2-1 5" fill="${o.skin}" stroke="${shade(o.skin, 0.8)}" stroke-width=".8" />
       <circle cx="-5.5" cy="-1.5" r="1.7" fill="${INK}" /><circle cx="2.5" cy="-1.5" r="1.7" fill="${INK}" />
       <circle cx="-7" cy="4" r="2.6" fill="#e2725b" opacity=".35" /><circle cx="5" cy="4" r="2.6" fill="#e2725b" opacity=".35" />
       ${o.mustache ? `<path d="M-9 4.5q4-3 8 0" stroke="${hair}" stroke-width="2.6" stroke-linecap="round" fill="none" />` : ""}
       <path d="M-6.5 ${o.mustache ? 7.5 : 6}q3.5 3.5 7.5 0" stroke="${INK}" stroke-width="1.5" stroke-linecap="round" fill="none" />
       ${(HAIR[o.hair] || HAIR.short)(hair)}`;
    return `<g transform="translate(0 -61)"><g class="${o.headCls || ""}">${(HAIR_BACK[o.hairBack || o.hair] || (() => ""))(hair)}${face}${o.hat || ""}</g></g>`;
  }
  /** One jointed character facing left. `o` is its costume: colors, hair, hat, arm poses, extras. */
  function person(x, o) {
    o = {
      skin: pick(SKINS),
      top: "#f4f1ea",
      bottom: "#2b2e34",
      armNear: "swing",
      armFar: "swing",
      scale: 1,
      ...o,
    };
    const cycle = -(rand() * 0.9).toFixed(2);
    const torso = `<path d="M-13 -46q13-6 26 0l2 ${o.longTop ? 58 : 47}h-30Z" fill="${o.top}" />${o.torso || ""}`;
    const lean = o.lean ? `transform: rotate(${o.lean}deg);` : "";
    return `<g transform="translate(${x} ${GROUND - 71 * o.scale}) scale(${o.scale})"><g class="${o.move || "bob"}" style="animation-delay: ${cycle}s; transform-origin: 0 71px;">
    <g class="${o.legs === "step" ? "step" : ""}">${leg(o, cycle - 0.45, true)}</g>
    <g style="${lean}">${o.back || ""}${arm(o, o.armFar, cycle, true)}</g>
    <g class="${o.legs === "step" ? "step" : ""}">${leg(o, cycle, false)}</g>
    ${o.skirt || ""}
    <g style="${lean}">${torso}<rect x="-3.5" y="-52" width="7" height="8" fill="${shade(o.skin, 0.9)}" />${head(o)}${arm(o, o.armNear, cycle - 0.45, false)}${o.front || ""}</g>
  </g></g>`;
  }

  // ---------- Props ----------
  const flower = (cx, cy, r, color) => {
    let petals = "";
    for (let i = 0; i < 6; i++)
      petals += `<circle cx="${(cx + Math.cos(i * 1.047) * r * 0.62).toFixed(1)}" cy="${(cy + Math.sin(i * 1.047) * r * 0.62).toFixed(1)}" r="${(r * 0.5).toFixed(1)}" fill="${color}" />`;
    return (
      petals +
      `<circle cx="${cx}" cy="${cy}" r="${(r * 0.36).toFixed(1)}" fill="${color === "#fcd116" ? "#ff8a3d" : "#fcd116"}" />`
    );
  };
  const wheel = (x, y, r) =>
    `<g transform="translate(${x} ${y})"><g class="wheel"><circle r="${r}" fill="#23262b" /><circle r="${r * 0.55}" fill="#9aa0a9" /><path d="M0 ${-r * 0.55}V${r * 0.55}M${-r * 0.55} 0H${r * 0.55}" stroke="#23262b" stroke-width="2.5" /></g></g>`;
  const note = (x, y, color, delay) =>
    `<text class="note" x="${x}" y="${y}" fill="${color}" style="animation-delay: ${delay}s">♪</text>`;
  const banner = (x, text, width, color) => {
    const carrier = {
      top: color,
      bottom: "#f4f1ea",
      shoes: "#7a5a3c",
      armNear: { upper: 160, fore: 14 },
      armFar: { upper: 160, fore: 14 },
    };
    let scallops = "";
    for (let i = 0; i < width / 20; i++) scallops += `q10 14 20 0`;
    return (
      person(x + 12, { ...carrier, hair: "long", hairBack: "long" }) +
      person(x + width - 12, { ...carrier, mustache: true }) +
      `<path d="M${x + 12} 150V236M${x + width - 12} 150V236" stroke="#7a5a3c" stroke-width="4" stroke-linecap="round" />
     <path d="M${x} 118h${width}v42${scallops.replace(/q10 14 20 0/g, "q-10 14-20 0")}Z" fill="${color}" />
     <path d="M${x} 118h${width}v8H${x}Z" fill="${shade(color, 0.8)}" />
     <rect x="${x + 10}" y="131" width="${width - 20}" height="26" rx="5" fill="#fffdf6" />
     <text class="sign" x="${x + width / 2}" y="150" text-anchor="middle">${text}</text>`
    );
  };

  // ---------- Medellín · Feria de las Flores ----------
  const aguadeno = `<ellipse cx="0" cy="-9" rx="18" ry="4" fill="#fbf7ea" stroke="#bdb39a" /><path d="M-10 -10q10-17 20 0Z" fill="#fbf7ea" stroke="#bdb39a" /><path d="M-10 -11h20" stroke="${INK}" stroke-width="3" />`;
  function silleta(size) {
    const w = 74 * size;
    const h = 84 * size;
    let flowers = "";
    for (let i = 0; i < 28; i++)
      flowers += flower(
        +(18 + (rand() - 0.5) * (w - 16)).toFixed(1),
        +(-96 * size + 30 + (rand() - 0.5) * (h - 16)).toFixed(1),
        6 + rand() * 5,
        pick(BRIGHT),
      );
    return `<path d="M10 -40V4M22 -40V4M10 0h14" stroke="#8a6238" stroke-width="4" stroke-linecap="round" fill="none" />
    <rect x="${18 - w / 2}" y="${-96 * size + 30 - h / 2}" width="${w}" height="${h}" rx="${22 * size}" fill="#2f6f4f" />
    <path d="M${18 - w / 2 + 6} ${-96 * size + 30 + h / 2 - 8}q${w / 2 - 6} 16 ${w - 12} 0" stroke="#3f8a5c" stroke-width="7" stroke-linecap="round" fill="none" />${flowers}`;
  }
  const poncho = `<path d="M-14 -46q14-7 28 0l-6 24h-16Z" fill="#fbf7ea" /><path d="M-10 -34h20M-8 -28h16" stroke="#b3261e" stroke-width="2.5" />`;
  const carriel = `<path d="M-12 -44 12 -8" stroke="#5a3d22" stroke-width="2.5" /><rect x="4" y="-12" width="15" height="13" rx="3" fill="#5a3d22" /><path d="M4 -7h15" stroke="#fcd116" stroke-width="1.5" />`;
  const hold = { upper: 30, fore: 118 };
  const silletero = (x) =>
    person(x, {
      mustache: true,
      hat: aguadeno,
      lean: -9,
      back: silleta(1),
      torso: poncho,
      front: carriel,
      armNear: hold,
      armFar: hold,
      shoes: "#c9a46a",
    });
  const silletera = (x) =>
    person(x, {
      hair: "long",
      hairBack: "braids",
      top: "#fffdf6",
      bare: true,
      lean: -7,
      back: silleta(0.82),
      armNear: hold,
      armFar: hold,
      shoes: "#c9a46a",
      hat: flower(-6, -13, 5, "#e23d8b") + flower(3, -15, 5, "#fcd116"),
      torso: `<path d="M-13 -46q13 8 26 0" stroke="#d9453a" stroke-width="3" fill="none" />`,
      skirt: `<path d="M-14 -2h28l12 56q-26 8-52 0Z" fill="#d9453a" /><path d="M-24 44q26 8 48 0M-22 34q24 7 44 0" stroke="#fcd116" stroke-width="3" fill="none" />`,
    });
  const kid = (x, color) =>
    person(x, {
      scale: 0.66,
      hair: "curly",
      top: color,
      bottom: "#3d5a73",
      back: silleta(0.6),
      armNear: hold,
      armFar: hold,
      lean: -6,
    });
  function chiva(x) {
    let riders = "";
    for (let i = 0; i < 4; i++) {
      const skin = pick(SKINS);
      riders += `<g transform="translate(${46 + i * 44} 196)"><rect x="-13" y="6" width="26" height="22" rx="6" fill="${pick(BRIGHT)}" /><circle r="11" fill="${skin}" /><path d="M-11 -2a11 11 0 0 1 22 0q-11-8-22 0Z" fill="#1c1e22" /><circle cx="-5" cy="0" r="1.6" fill="${INK}" /><circle cx="2" cy="0" r="1.6" fill="${INK}" /><path d="M-6 5q4 3 8 0" stroke="${INK}" stroke-width="1.4" fill="none" stroke-linecap="round" /></g>`;
    }
    let roof = "";
    for (let i = 0; i < 9; i++) roof += flower(30 + i * 20, 158 + (i % 2) * 5, 8, BRIGHT[i % 6]);
    let diamonds = "";
    for (let i = 0; i < 9; i++)
      diamonds += `<path d="M${22 + i * 22} 250l8-9 8 9-8 9Z" fill="${i % 2 ? "#fcd116" : "#fffdf6"}" />`;
    return `<g transform="translate(${x} 0)"><g class="bob" style="animation-duration: .3s">
    <path d="M8 172h204v-8H8Z" fill="#8a6238" />${roof}
    <path d="M70 152q8-12 22-6M120 150q10-14 26-4" stroke="#fcd116" stroke-width="7" stroke-linecap="round" fill="none" />
    <rect x="6" y="172" width="208" height="112" rx="10" fill="#d9453a" />
    <rect x="6" y="172" width="208" height="10" rx="5" fill="#003893" />
    <rect x="16" y="186" width="188" height="42" rx="6" fill="#fffdf6" />
    <path d="M60 186v42M104 186v42M148 186v42" stroke="#d9453a" stroke-width="5" />${riders}
    <rect x="6" y="232" width="208" height="10" fill="#fcd116" /><rect x="6" y="258" width="208" height="8" fill="#003893" />${diamonds}
    <path d="M-22 214h28v70h-34q-8 0-6-10l8-52q2-8 4-8Z" fill="#d9453a" /><path d="M-18 222h20v22h-24Z" fill="#bfe0f7" />
    <circle cx="-30" cy="268" r="6" fill="#fcd116" stroke="${INK}" />
    <path d="M214 180h10v100" stroke="#8a6238" stroke-width="4" fill="none" /><path d="M214 200h10M214 222h10M214 244h10" stroke="#8a6238" stroke-width="3" />
  </g>${wheel(14, 290, 24)}${wheel(170, 290, 24)}</g>`;
  }

  // ---------- Cali · Feria de Cali ----------
  const fedora = (c) =>
    `<path d="M-16 -8h32" stroke="${c}" stroke-width="3.5" stroke-linecap="round" /><path d="M-10 -8v-9q10-5 20 0v9Z" fill="${c}" /><path d="M-10 -10h20" stroke="#d9453a" stroke-width="2.5" />`;
  const fringe = (color) => {
    let d = "";
    for (let i = 0; i < 9; i++) d += `M${-22 + i * 5.5} 26v${8 + (i % 2) * 4}`;
    return `<g class="flare" style="transform-origin: 0 -2px"><path d="M-12 -4h24l12 30q-24 8-48 0Z" fill="${color}" /><path d="${d}" stroke="${shade(color, 0.8)}" stroke-width="3" stroke-linecap="round" /><path d="M-18 12q18 6 36 0" stroke="#fffdf6" stroke-width="2" fill="none" opacity=".7" /></g>`;
  };
  const salsera = (x, color) =>
    person(x, {
      move: "sway",
      legs: "step",
      skin: "#c98d5e",
      hair: "long",
      hairBack: "long",
      top: color,
      shortSleeve: true,
      sleeve: "#c98d5e",
      bare: true,
      shoes: color,
      skirt: fringe(color),
      headCls: "spin",
      armNear: { upper: 150, fore: 30, cls: "wave" },
      armFar: { upper: 60, fore: 40 },
      hat: flower(-9, -9, 4.5, "#fffdf6"),
    });
  const salsero = (x, color) =>
    person(x, {
      move: "sway",
      legs: "step",
      top: color,
      bottom: INK,
      shoes: "#fffdf6",
      hat: fedora(INK),
      mustache: true,
      armNear: { upper: 70, fore: 60 },
      armFar: { upper: 140, fore: 20, cls: "wave" },
      torso: `<path d="M-2 -46l2 10 2-10" stroke="#fffdf6" stroke-width="2" fill="none" />`,
    });
  function orchestra(x) {
    const trumpet = `<path d="M-2 20h-30l-9-7v18l-9-7" transform="rotate(-100 0 22)" fill="#f2c230" stroke="${INK}" stroke-linejoin="round" />`;
    const player = (px, o) => `<g transform="translate(${px} -66)">${person(0, { legs: "still", ...o })}</g>`;
    let fringeLine = "";
    for (let i = 0; i < 26; i++)
      fringeLine += `<path d="M${6 + i * 10} 268v${10 + (i % 2) * 5}" stroke="${BRIGHT[i % 6]}" stroke-width="5" stroke-linecap="round" />`;
    return `<g transform="translate(${x} 0)">
    ${player(50, { top: "#e23d8b", hat: fedora("#fffdf6"), armNear: { upper: 96, fore: 62, hold: trumpet }, armFar: { upper: 80, fore: 70 } })}
    ${player(126, { top: "#fcd116", hair: "curly", mustache: true, armNear: { upper: 40, fore: 60, foreCls: "drum" }, armFar: { upper: 30, fore: 70, foreCls: "drum" }, front: `<path d="M-34 -22h24l-3 34h-18Z" fill="#b5653a" stroke="${INK}" /><ellipse cx="-22" cy="-22" rx="12" ry="3.5" fill="#f0e2bd" stroke="${INK}" />` })}
    ${player(206, { top: "#3aa0d9", hair: "bun", armNear: { upper: 150, fore: 20, cls: "wave", hold: `<path d="M-4 18l-4 12h8Z" fill="#f2c230" /><circle cx="-4" cy="32" r="5" fill="#d9453a" />` }, armFar: { upper: 140, fore: 30, cls: "wave" } })}
    ${note(20, 150, "#e23d8b", 0)}${note(0, 170, "#6e44f0", 0.6)}${note(96, 140, "#3aa0d9", 1.1)}
    <rect x="0" y="246" width="268" height="26" rx="6" fill="#6e44f0" /><path d="M0 252h268" stroke="#fcd116" stroke-width="4" />${fringeLine}
    <rect x="228" y="196" width="34" height="50" rx="4" fill="#23262b" /><circle cx="245" cy="212" r="7" fill="#9aa0a9" /><circle cx="245" cy="232" r="9" fill="#9aa0a9" />
    ${wheel(44, 296, 16)}${wheel(224, 296, 16)}
  </g>`;
  }

  // ---------- Barranquilla · Carnaval ----------
  function marimonda(x, hood, vest, pants) {
    let dots = "";
    for (let i = 0; i < 5; i++)
      dots += `<circle cx="${(i % 2) * 3 - 1.5}" cy="${-38 + i * 7}" r="1.6" fill="#d9453a" />`;
    return person(x, {
      move: "hop",
      legs: "step",
      top: vest,
      bottom: pants,
      sleeve: hood,
      gloves: "#fffdf6",
      shoes: hood,
      skin: hood,
      armNear: { upper: 150, fore: -30, cls: "wave" },
      armFar: { upper: -150, fore: 30, cls: "wave" },
      mask: `<ellipse rx="12" ry="13.5" fill="${hood}" /><circle cx="-15" cy="-3" r="8" fill="${vest}" stroke="${INK}" /><circle cx="15" cy="-3" r="8" fill="${vest}" stroke="${INK}" />
      <circle cx="-5" cy="-2" r="4.6" fill="#fffdf6" stroke="${INK}" /><circle cx="5" cy="-2" r="4.6" fill="#fffdf6" stroke="${INK}" /><circle cx="-5" cy="-2" r="1.6" fill="${INK}" /><circle cx="5" cy="-2" r="1.6" fill="${INK}" />
      <path d="M0 3q-2 16-9 26" stroke="${shade(hood, 0.86)}" stroke-width="7.5" stroke-linecap="round" fill="none" />`,
      torso: `<path d="M-13 -46l13 12 13-12" fill="${shade(vest, 0.8)}" /><path d="M0 -42l-5 26 5 8 5-8Z" fill="#fcd116" stroke="${INK}" stroke-width=".8" />${dots}`,
    });
  }
  const vueltiao = `<ellipse cx="0" cy="-9" rx="20" ry="4.5" fill="#f0e2bd" stroke="${INK}" /><path d="M-11 -10q11-17 22 0Z" fill="#f0e2bd" stroke="${INK}" /><path d="M-10 -13h20M-8 -17h16M-16 -8h32" stroke="${INK}" stroke-width="1.5" />`;
  const scarf = `<path d="M-9 -47h18l-4 9h-10Z" fill="#d9453a" />`;
  const candles = `<g transform="translate(0 22)"><path d="M-5 0v-22M0 0v-25M5 0v-22" stroke="#fffdf6" stroke-width="3.5" stroke-linecap="round" /><path class="flame" d="M-5 -24q-3-5 0-9 3 4 0 9M0 -27q-3-5 0-9 3 4 0 9M5 -24q-3-5 0-9 3 4 0 9" fill="#ff8a3d" /></g>`;
  const pollera = `<g class="flare" style="transform-origin: 0 -2px"><path d="M-12 -4h24l40 74q-52 12-104 0Z" fill="#fffdf6" /><path d="M-34 38q34 9 68 0M-44 56q44 10 88 0" stroke="#d9453a" stroke-width="5" fill="none" /><path d="M-24 20q24 7 48 0" stroke="#fcd116" stroke-width="4" fill="none" /><path d="M-52 70q52 12 104 0" stroke="#003893" stroke-width="5" fill="none" /></g>`;
  const cumbiambera = (x) =>
    person(x, {
      move: "sway",
      legs: "still",
      skin: "#a86f45",
      hair: "bun",
      top: "#fffdf6",
      shortSleeve: true,
      sleeve: "#fffdf6",
      skirt: pollera,
      hat: flower(-8, -10, 5.5, "#d9453a"),
      torso: `<path d="M-13 -46q13 9 26 0" stroke="#d9453a" stroke-width="3" fill="none" />`,
      armNear: { upper: 160, fore: 10, hold: candles },
      armFar: { upper: -64, fore: -20 },
    });
  const cumbiambero = (x) =>
    person(x, {
      move: "sway",
      legs: "step",
      top: "#fffdf6",
      bottom: "#fffdf6",
      shoes: "#c9a46a",
      mustache: true,
      hair: "short",
      torso: scarf,
      armNear: {
        upper: 150,
        fore: 20,
        cls: "wave",
        hold: `<g transform="translate(0 30)">${vueltiao}</g>`,
      },
      armFar: { upper: -30, fore: -60 },
    });
  const drummer = (x) =>
    person(x, {
      top: "#fffdf6",
      bottom: "#fffdf6",
      shoes: "#c9a46a",
      hat: vueltiao,
      torso: scarf,
      armNear: { upper: 34, fore: 62, foreCls: "drum" },
      armFar: { upper: 24, fore: 74, foreCls: "drum" },
      front: `<path d="M-14 -44 10 -8" stroke="#d9453a" stroke-width="2.5" /><rect x="-34" y="-20" width="26" height="30" rx="5" fill="#b5653a" stroke="${INK}" /><path d="M-34 -12l26 16M-34 4l26-16" stroke="#f0e2bd" stroke-width="1.6" />`,
    });
  const flautist = (x) =>
    person(x, {
      top: "#fffdf6",
      bottom: "#fffdf6",
      shoes: "#c9a46a",
      hat: vueltiao,
      torso: scarf,
      armNear: { upper: 110, fore: 66 },
      armFar: { upper: 100, fore: 80 },
      front: `<path d="M-10 -56l-26 6" stroke="#8a6238" stroke-width="3.5" stroke-linecap="round" />`,
    });
  function congo(x) {
    let jewels = "";
    for (let i = 0; i < 7; i++) jewels += flower(-5 + (i % 2) * 10, -18 - i * 6.5, 4.6, BRIGHT[i % 6]);
    return person(x, {
      move: "hop",
      top: "#d9453a",
      bottom: "#fcd116",
      shoes: INK,
      skin: "#8a5a3a",
      hair: "none",
      hat: `<path d="M10 -40q30 20 22 92" stroke="#e23d8b" stroke-width="7" stroke-linecap="round" fill="none" class="ribbon" /><path d="M-11 -9l2-56q9-8 18 0l2 56Z" fill="#3aa0d9" stroke="${INK}" />${jewels}<path d="M-12 -9h24" stroke="#fcd116" stroke-width="4" />`,
      torso: `<path d="M-13 -46q13 12 26 0l1 16q-14 10-28 0Z" fill="#3f8a5c" /><circle cx="-5" cy="-32" r="2" fill="#fffdf6" /><circle cx="5" cy="-32" r="2" fill="#fffdf6" /><circle cx="0" cy="-26" r="2" fill="#fffdf6" />`,
      front: `<circle cx="-6" cy="-57" r="3" fill="#fffdf6" opacity=".9" /><circle cx="4" cy="-57" r="3" fill="#fffdf6" opacity=".9" />`,
      armNear: {
        upper: 140,
        fore: 30,
        cls: "wave",
        hold: `<path d="M0 22l-4 34h8Z" fill="#c9a46a" stroke="${INK}" stroke-width=".8" />`,
      },
      armFar: "swing",
    });
  }
  const torito = (x) =>
    person(x, {
      move: "hop",
      legs: "step",
      top: "#e23d8b",
      bottom: "#3aa0d9",
      shoes: INK,
      mask: `<path d="M-13 -8q-16-6-14-20 8 12 18 12M13 -8q16-6 14-20-8 12-18 12" fill="#fffdf6" stroke="${INK}" /><path d="M-13 -12h26l-3 20q-10 10-20 0Z" fill="#1c1e22" /><path d="M-3 -12l3 12 3-12" fill="#fffdf6" /><circle cx="-6" cy="-3" r="2.4" fill="#fcd116" /><circle cx="6" cy="-3" r="2.4" fill="#fcd116" /><path d="M-5 9h10" stroke="#e23d8b" stroke-width="3" stroke-linecap="round" />`,
      back: `<path class="ribbon" d="M8 -44q26 10 22 66l-26-20Z" fill="#fcd116" stroke="${INK}" stroke-width=".8" />`,
      armNear: { upper: 150, fore: -20, cls: "wave" },
      armFar: { upper: -150, fore: 20, cls: "wave" },
    });

  // ---------- Sierra Nevada de Santa Marta ----------
  const palm = (
    x,
    y,
  ) => `<path d="M${x} ${y}q5-34-2-62" stroke="#8a6238" stroke-width="6" fill="none" stroke-linecap="round" />
  <path d="M${x - 2} ${y - 62}q-28-14-42 6M${x - 2} ${y - 62}q-12-28-38-22M${x - 2} ${y - 62}q10-28 38-20M${x - 2} ${y - 62}q28-12 42 10M${x - 2} ${y - 62}q2-26-10-38" stroke="#2f6f4f" stroke-width="6" fill="none" stroke-linecap="round" />`;
  const bird = (x, y, body, beak) =>
    `<g transform="translate(${x} ${y})"><g class="float"><path class="flap" d="M-2 -2q12-22 26-12-12 2-16 14Z" fill="${shade(body, 0.8)}" style="transform-origin: 6px 0" /><ellipse rx="14" ry="8" fill="${body}" /><circle cx="-12" cy="-6" r="7" fill="${body}" /><path d="M-18 -8h-22q-6 4 0 8l22-2Z" fill="${beak}" /><circle cx="-14" cy="-8" r="1.6" fill="#fff" /><path d="M12 0l18 4-16 6Z" fill="${body}" /></g></g>`;
  function sierra(x) {
    let butterflies = "";
    for (let i = 0; i < 9; i++)
      butterflies += `<g transform="translate(${30 + rand() * 520} ${30 + rand() * 110})"><g class="float" style="animation-delay: ${-rand() * 2}s"><path class="flap" d="M0 0q-9-10-11 0 2 8 11 0M0 0q9-10 11 0-2 8-11 0" fill="#fcd116" stroke="#e0a800" stroke-width=".6" style="animation-delay: ${-rand()}s" /></g></g>`;
    let waves = "M0 258";
    for (let i = 0; i < 28; i++) waves += "q10-9 20 0";
    return `<g transform="translate(${x} 0)">
    <circle cx="470" cy="74" r="24" fill="#fcd116" />
    <path d="M20 250 110 118l46 44 78-110 82 96 50-46 84 96 70 52Z" fill="#3d5a73" />
    <path d="M234 52l-34 48 18-9 16 15 17-17 22 20Z" fill="#fff" /><path d="M110 118l-22 32 13-6 11 10 12-12 12 8Z" fill="#fff" /><path d="M366 102l-18 16 12-3 8 9 11-10 9 8Z" fill="#fff" />
    <path d="M150 160q30 20 20 50M300 150q-20 30-6 60" stroke="#fff" stroke-width="2" opacity=".35" fill="none" />
    <path d="M0 254q90-78 190-34 96-56 200-10 90-36 170 44Z" fill="#3f8a5c" /><path d="M60 250q80-50 150-22M300 236q70-30 150 6" stroke="#2f6f4f" stroke-width="4" fill="none" />
    ${palm(64, 252)}${palm(512, 252)}
    <path d="${waves}v14H0Z" fill="#3aa0d9" /><rect x="0" y="266" width="560" height="22" rx="6" fill="#2b7fb5" />
    ${bird(330, 60, "#1c1e22", "#ff8a3d")}${bird(140, 86, "#3f8a5c", "#d9453a")}${butterflies}
    ${wheel(90, 296, 16)}${wheel(470, 296, 16)}
  </g>`;
  }
  const tutusoma = `<path d="M-12 -8q12-26 24 0q-12 5-24 0Z" fill="#fffdf6" stroke="#bdb39a" />`;
  const mochila = `<path d="M-12 -44 14 -4" stroke="#8a6238" stroke-width="2.5" /><path d="M4 -8h20v20q-10 6-20 0Z" fill="#f0e2bd" stroke="#8a6238" /><path d="M4 -2h20M4 5h20" stroke="#8a6238" stroke-width="2" />`;
  const sierraWalker = (x, long) =>
    person(x, {
      skin: "#a86f45",
      top: "#fffdf6",
      bottom: "#fffdf6",
      shoes: "#c9a46a",
      longTop: true,
      hair: "long",
      hairBack: long ? "long" : "",
      hat: tutusoma,
      front: mochila,
    });
  const flagKid = (x, color) =>
    person(x, {
      scale: 0.7,
      hair: "curly",
      top: color,
      bottom: "#3d5a73",
      armNear: {
        upper: 160,
        fore: 10,
        cls: "wave",
        hold: `<path d="M0 22v-44" stroke="#8a6238" stroke-width="2.5" /><path d="M0 -22h30v10h-30Z" fill="#fcd116" /><path d="M0 -12h30v5h-30Z" fill="#003893" /><path d="M0 -7h30v5h-30Z" fill="#ce1126" />`,
      },
      armFar: "swing",
    });

  // ---------- The line ----------
  const SCENES = [
    [0, scenes[0]],
    [1500, scenes[1]],
    [2900, scenes[2]],
    [4400, scenes[3]],
    [5450, scenes[4]],
  ];
  let line = banner(60, scenes[0], 310, "#3f8a5c");
  line +=
    silletero(470) +
    kid(560, "#fcd116") +
    silletera(650) +
    silletero(770) +
    silletera(890) +
    kid(970, "#e23d8b") +
    silletero(1060) +
    chiva(1200);
  line += banner(1520, scenes[1], 200, "#d9453a") + orchestra(1800);
  ["#d9453a", "#fcd116", "#e23d8b", "#3aa0d9"].forEach(
    (color, i) =>
      (line +=
        salsero(2220 + i * 150, ["#fffdf6", "#3aa0d9", "#fffdf6", "#fcd116"][i]) +
        salsera(2168 + i * 150, color) +
        note(2190 + i * 150, 190, color, i * 0.4)),
  );
  line += banner(2920, scenes[2], 280, "#e23d8b");
  line +=
    marimonda(3290, "#fcd116", "#e23d8b", "#3aa0d9") +
    congo(3390) +
    cumbiambero(3500) +
    cumbiambera(3600) +
    drummer(3740) +
    flautist(3820) +
    torito(3920) +
    marimonda(4020, "#3aa0d9", "#ff8a3d", "#e23d8b") +
    cumbiambero(4130) +
    cumbiambera(4230) +
    marimonda(4350, "#e23d8b", "#3f8a5c", "#fcd116");
  line +=
    banner(4440, scenes[3], 310, "#3aa0d9") +
    sierraWalker(4830, true) +
    sierraWalker(4900, false) +
    sierra(4960);
  line +=
    flagKid(5590, "#fcd116") +
    flagKid(5650, "#3aa0d9") +
    banner(5700, `${scenes[4]} ♥`, 250, "#fcd116") +
    flagKid(6010, "#d9453a");
  const LENGTH = 6100;
  parts.line.innerHTML = prefixed(line);

  // ---------- Slow background: one skyline per region ----------
  const PARALLAX = 0.55;
  const hill = (x, w, h) => `<path class="far" d="M${x} 300q${w / 2}-${h * 2} ${w} 0Z" />`;
  let back = "";
  // Medellín: valley hills, towers and the Coltejer needle.
  back += hill(0, 520, 110) + hill(360, 600, 150) + hill(820, 500, 100);
  for (let i = 0; i < 9; i++)
    back += `<rect class="far" x="${250 + i * 46}" y="${220 - (i % 3) * 26}" width="30" height="${80 + (i % 3) * 26}" opacity=".8" />`;
  back += `<path class="far" d="M470 300V170l14-56 14 56v130Z" />`;
  // Cali: three crosses and Cristo Rey over the hills.
  back += hill(1150, 560, 130) + hill(1560, 520, 110);
  back += `<path class="far" d="M1400 176v-34M1388 152h24M1372 184v-24M1364 168h16M1428 184v-24M1420 168h16" stroke="var(--_far)" stroke-width="5" fill="none" /><path class="far" d="M1810 196v-52M1786 156h48" stroke="var(--_far)" stroke-width="7" fill="none" /><circle class="far" cx="1810" cy="136" r="7" />`;
  // Barranquilla: a row of Caribbean fronts.
  for (let i = 0; i < 12; i++)
    back += `<path class="far" d="M${2080 + i * 62} 300v-${70 + (i % 4) * 16}l28-18 28 18v${70 + (i % 4) * 16}Z" opacity="${0.6 + (i % 3) * 0.15}" />`;
  // Santa Marta: far peaks and the sea line.
  back += `<path class="far" d="M2960 300l150-150 70 60 90-110 110 120 120-80 140 160Z" /><path class="far" d="M2940 300h760v-12q-380-14-760 0Z" opacity=".6" />`;
  parts.back.innerHTML = prefixed(back);

  let confetti = "";
  for (let i = 0; i < 46; i++)
    confetti += `<i class="colombia-parade__bit" style="left: ${(rand() * 100).toFixed(1)}%; background: ${pick(BRIGHT)}; animation-duration: ${(3 + rand() * 3).toFixed(2)}s; animation-delay: ${(-rand() * 6).toFixed(2)}s"></i>`;
  parts.confetti.innerHTML = confetti;

  // ---------- Music: original loops synthesised in the browser, one per scene (no recordings, no samples) ----------
  const music = (() => {
    let ctx, out, bus, noise, timer;
    let scene = 0;
    let step = 0;
    let next = 0;
    const hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
    function tone(
      midi,
      t,
      dur,
      { type = "triangle", gain = 0.18, attack = 0.006, slide = 0, vibrato = 0 } = {},
    ) {
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(hz(midi), t);
      if (slide) osc.frequency.exponentialRampToValueAtTime(hz(midi + slide), t + dur);
      if (vibrato) {
        const lfo = ctx.createOscillator();
        const depth = ctx.createGain();
        lfo.frequency.value = 5.5;
        depth.gain.value = vibrato;
        lfo.connect(depth).connect(osc.frequency);
        lfo.start(t);
        lfo.stop(t + dur + 0.1);
      }
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(gain, t + attack);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(amp).connect(bus);
      osc.start(t);
      osc.stop(t + dur + 0.1);
    }
    function hiss(t, dur, gain, { freq = 6000, kind = "highpass", attack = 0.004 } = {}) {
      const src = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      const amp = ctx.createGain();
      src.buffer = noise;
      src.loop = true;
      filter.type = kind;
      filter.frequency.value = freq;
      amp.gain.setValueAtTime(0.0001, t);
      amp.gain.exponentialRampToValueAtTime(gain, t + attack);
      amp.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(filter).connect(amp).connect(bus);
      src.start(t);
      src.stop(t + dur + 0.1);
    }
    const drum = (midi, t, gain = 0.3, dur = 0.2) =>
      tone(midi, t, dur, { type: "sine", gain, slide: -10, attack: 0.002 });
    const chord = (notes, t, dur, options) => notes.forEach((midi) => tone(midi, t, dur, options));

    const SONGS = [
      // Medellín: a pasillo-style waltz in G, plucked strings. 3/4 counted in eighths.
      {
        bpm: 138,
        div: 2,
        len: 24,
        play(s, t, d) {
          const bar = Math.floor(s / 6);
          const i = s % 6;
          const [bass, ...triad] = [
            [43, 59, 62, 67],
            [50, 57, 62, 66],
            [45, 57, 60, 64],
            [50, 57, 60, 66],
          ][bar];
          if (i === 0) tone(bass, t, d * 3, { gain: 0.26 });
          if (i === 2 || i === 4) chord(triad, t, d * 1.4, { gain: 0.07 });
          const melody = [
            74, 0, 71, 74, 79, 0, 78, 0, 74, 69, 74, 0, 72, 0, 69, 72, 76, 0, 74, 72, 69, 66, 67, 0,
          ][s];
          if (melody) {
            tone(melody, t, d * 1.8, { gain: 0.16 });
            tone(melody + 12, t, d, { gain: 0.04 });
          }
        },
      },
      // Cali: salsa. 2-3 clave, piano montuno, bass tumbao, cowbell and a brass riff.
      {
        bpm: 184,
        div: 2,
        len: 32,
        play(s, t, d) {
          const bar = Math.floor(s / 8);
          const i = s % 8;
          const [root, third, fifth, seventh] = [
            [50, 53, 57, 60],
            [43, 47, 50, 53],
            [48, 52, 55, 59],
            [45, 49, 52, 55],
          ][bar];
          if ([2, 4, 8, 11, 14].includes(s % 16)) tone(86, t, 0.04, { type: "square", gain: 0.07 });
          if (i % 2 === 0) tone(79, t, 0.06, { type: "square", gain: i === 0 ? 0.05 : 0.03 });
          if ([0, 2, 3, 5, 6, 7].includes(i))
            chord(i % 2 ? [third + 12, fifth + 12, seventh + 12] : [root + 12, root + 24], t, d * 0.8, {
              gain: 0.08,
            });
          if (i === 3) tone(fifth - 12, t, d * 2.4, { type: "sine", gain: 0.3 });
          if (i === 6) tone([43, 48, 45, 50][bar] - 12, t, d * 2.4, { type: "sine", gain: 0.3 });
          if (i === 2) hiss(t, 0.05, 0.12, { freq: 1800, kind: "bandpass" });
          if (i === 6 || i === 7) drum(57, t, 0.18, 0.16);
          const riff = bar % 2 === 0 && [77, 0, 0, 76, 0, 74, 0, 0][i];
          if (riff) chord([riff, riff - 5], t, d * 1.2, { type: "sawtooth", gain: 0.035, attack: 0.02 });
        },
      },
      // Barranquilla: cumbia in A minor. Guacharaca, llamador, tambora and a millo-style flute line.
      {
        bpm: 94,
        div: 4,
        len: 32,
        play(s, t, d) {
          const bar = Math.floor(s / 16);
          const i = s % 16;
          hiss(t, i % 4 === 2 ? 0.09 : 0.035, i % 4 === 2 ? 0.1 : 0.045, { freq: 5200 });
          if (i % 8 === 4) tone(74, t, 0.07, { type: "sine", gain: 0.2, slide: -4 });
          if ([0, 6, 8, 14].includes(i)) drum(48, t, 0.34, 0.24);
          if (i % 4 === 0)
            tone((bar ? [40, 47] : [45, 52])[(i / 4) % 2], t, d * 3, { type: "sine", gain: 0.3 });
          if (i % 4 === 2)
            chord(bar ? [56, 59, 62] : [57, 60, 64], t, d * 1.2, { type: "square", gain: 0.022 });
          const flute = [
            76, 0, 0, 76, 74, 0, 72, 0, 71, 0, 72, 0, 74, 0, 0, 0, 71, 0, 0, 71, 74, 0, 76, 0, 80, 0, 76, 0,
            71, 0, 0, 0,
          ][s];
          if (flute) tone(flute, t, d * 2.2, { type: "sine", gain: 0.15, attack: 0.03, vibrato: 7 });
        },
      },
      // Sierra Nevada: slow and open. A drone, a sparse pentatonic flute and the sea.
      {
        bpm: 60,
        div: 2,
        len: 16,
        play(s, t, d) {
          if (s === 0) chord([45, 52, 57], t, d * 16, { type: "sine", gain: 0.07, attack: 1.2 });
          if (s % 8 === 0) hiss(t, d * 7, 0.07, { freq: 700, kind: "lowpass", attack: 1.6 });
          if (s % 4 === 2) hiss(t, 0.12, 0.03, { freq: 7000 });
          const flute = [69, 0, 0, 72, 0, 0, 74, 0, 76, 0, 0, 74, 0, 69, 0, 0][s];
          if (flute) tone(flute, t, d * 3, { type: "sine", gain: 0.14, attack: 0.12, vibrato: 5 });
        },
      },
      // Finale: a bright major fanfare.
      {
        bpm: 126,
        div: 2,
        len: 32,
        play(s, t, d) {
          const bar = Math.floor(s / 8);
          const i = s % 8;
          const [root, third, fifth] = [
            [48, 52, 55],
            [53, 57, 60],
            [55, 59, 62],
            [48, 52, 55],
          ][bar];
          if (i % 4 === 0) drum(45, t, 0.3);
          if (i % 4 === 2) hiss(t, 0.06, 0.08, { freq: 4000 });
          if (i % 2 === 0) tone(root - 12, t, d * 1.6, { type: "sine", gain: 0.26 });
          tone([root, third, fifth, root + 12, fifth, third, fifth, root + 12][i] + 12, t, d * 1.1, {
            gain: 0.12,
          });
          if (i === 0)
            chord([root + 12, third + 12, fifth + 12], t, d * 6, {
              type: "sawtooth",
              gain: 0.025,
              attack: 0.04,
            });
        },
      },
    ];

    function newBus() {
      if (bus) {
        const old = bus;
        old.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.12);
        setTimeout(() => old.disconnect(), 1500);
      }
      bus = ctx.createGain();
      bus.gain.setValueAtTime(0.0001, ctx.currentTime);
      bus.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 0.4);
      bus.connect(out);
      step = 0;
      next = ctx.currentTime + 0.1;
    }
    function schedule() {
      const song = SONGS[scene];
      const duration = 60 / song.bpm / song.div;
      while (next < ctx.currentTime + 0.14) {
        song.play(step % song.len, next, duration);
        next += duration;
        step++;
      }
    }
    return {
      get on() {
        return !!timer;
      },
      start() {
        if (!ctx) {
          ctx = new AudioContext();
          const limiter = ctx.createDynamicsCompressor();
          out = ctx.createGain();
          out.gain.value = 0.6;
          out.connect(limiter).connect(ctx.destination);
          noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
          const data = noise.getChannelData(0);
          for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        }
        ctx.resume();
        newBus();
        timer = setInterval(schedule, 30);
      },
      stop() {
        clearInterval(timer);
        timer = null;
        ctx?.suspend();
      },
      scene(index) {
        if (index === scene) return;
        scene = index;
        if (timer) newBus();
      },
    };
  })();
  let wantSound = false;
  parts.sound.addEventListener("click", () => {
    wantSound = !music.on;
    if (wantSound && playing) music.start();
    else music.stop();
    parts.sound.textContent = wantSound ? labels.soundOn : labels.soundOff;
    parts.sound.setAttribute("aria-pressed", String(wantSound));
  });

  const flag = parts.flag;
  const WIDTH = 1000;
  const SPEED = 92;
  let travelled = 0;
  let playing = false;
  let last = 0;
  /** The scene whose name is showing; it is a live region, so it is written only when it changes. */
  let shown = -1;
  function close() {
    playing = false;
    root.removeAttribute("data-on");
    flag.setAttribute("aria-pressed", "false");
    music.stop();
  }
  function frame(now) {
    if (!playing) return;
    travelled += (Math.min(60, now - last) / 1000) * SPEED;
    last = now;
    if (travelled > LENGTH + WIDTH) return close();
    parts.line.style.transform = `translateX(${WIDTH - travelled}px)`;
    parts.back.style.transform = `translateX(${WIDTH * 0.5 - travelled * PARALLAX}px)`;
    const at = travelled - WIDTH / 2;
    const index = Math.max(0, SCENES.filter(([start]) => at >= start).length - 1);
    if (index !== shown) {
      shown = index;
      parts.scene.textContent = SCENES[index][1];
    }
    music.scene(index);
    requestAnimationFrame(frame);
  }
  flag.addEventListener("click", () => {
    if (playing) return close();
    playing = true;
    shown = -1;
    travelled = 0;
    last = performance.now();
    root.setAttribute("data-on", "");
    flag.setAttribute("aria-pressed", "true");
    if (wantSound) music.start();
    requestAnimationFrame(frame);
  });
  return close;
}
