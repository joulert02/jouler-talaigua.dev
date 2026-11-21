// The aerial silks figure: a jointed rig drawn into six SVG layers, one frame at a time. Poses are lists of joint
// angles; the component blends from one key pose to the next and calls draw() on every frame.
// Plain JavaScript on purpose: it is drawing code ported from the design prototype
// (docs/design/board-proposals/board-v4.html), where it was tuned by eye against photos.

const RIG = [150, 16];
const SKIN = "#c98d5e";
const SILK = "#6e44f0";
const SILK_LIGHT = "#a58bff";
const SILK_DARK = "#4a25c4";
// Bone lengths of the figure, in SVG units.
const LEN = { spine1: 26, spine2: 31, neck: 18, upper: 29, fore: 27, thigh: 45, shin: 44, foot: 13 };

// Angles: 0 points down, 90 left, 180 up, 270 right. Every pose lists the same keys so they can be blended.
const POSES = [
  // 0 · Rest: nobody on the silk, the fabric hangs gathered.
  {
    alpha: 0,
    px: 222,
    py: 309,
    spine1: 178,
    spine2: 176,
    head: 180,
    back: 0,
    armN: [110, 150],
    armF: [60, 110],
    legN: [0, 0],
    legF: [0, 0],
    a1: [148, 250],
    b1: [152, 250],
    a2: [146, 372],
    b2: [154, 372],
    endA: [128, 394],
    endB: [170, 394],
    c: [0, 10, 0, 16],
    knot: 0,
  },
  // 1 · Gather (photo: standing at the fabric, both hands on it).
  {
    alpha: 1,
    px: 184,
    py: 309,
    spine1: 178,
    spine2: 174,
    head: 176,
    back: 0,
    armN: [112, 152],
    armF: [62, 112],
    legN: [4, 0],
    legF: [-6, 0],
    a1: "handN",
    b1: "handF",
    a2: [144, 372],
    b2: [152, 372],
    endA: [124, 394],
    endB: [172, 394],
    c: [0, 10, 0, 16],
    knot: 0,
  },
  // 2 · Open (photo: back to the camera, arms up, one tail in each hand).
  {
    alpha: 1,
    px: 156,
    py: 309,
    spine1: 180,
    spine2: 180,
    head: 180,
    back: 1,
    armN: [122, 158],
    armF: [238, 202],
    legN: [9, 0],
    legF: [-11, 0],
    a1: "handN",
    b1: "handF",
    a2: [104, 372],
    b2: [212, 372],
    endA: [84, 394],
    endB: [230, 394],
    c: [0, 10, 0, 16],
    knot: 0,
  },
  // 3 · Pose (photo: arched back, foot locked low, free leg bent high, arm open, tail curving to the floor).
  {
    alpha: 1,
    px: 176,
    py: 178,
    spine1: 114,
    spine2: 100,
    head: 84,
    back: 0,
    armN: [58, 50],
    armF: [84, 64],
    legN: [-14, -12],
    legF: [-152, -24],
    a1: "kneeF",
    b1: "hip",
    a2: "footN",
    b2: "footN",
    endA: [44, 393],
    endB: [56, 395],
    c: [30, 60, 70, -4],
    knot: 1,
  },
];

const dir = (deg, len) => [-Math.sin((deg * Math.PI) / 180) * len, Math.cos((deg * Math.PI) / 180) * len];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mix = (a, b, t) => a + (b - a) * t;
const fmt = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Forward kinematics: every joint position of one numeric pose. */
function skeleton(p) {
  const hip = [p.px, p.py];
  const waist = add(hip, dir(p.spine1, LEN.spine1));
  const neck = add(waist, dir(p.spine2, LEN.spine2));
  const head = add(neck, dir(p.head, LEN.neck));
  const limb = (from, [a, b], l1, l2) => {
    const mid = add(from, dir(a, l1));
    return [mid, add(mid, dir(b, l2))];
  };
  const [elbowN, handN] = limb(neck, p.armN, LEN.upper, LEN.fore);
  const [elbowF, handF] = limb(neck, p.armF, LEN.upper, LEN.fore);
  const [kneeN, footN] = limb(hip, p.legN, LEN.thigh, LEN.shin);
  const [kneeF, footF] = limb(hip, p.legF, LEN.thigh, LEN.shin);
  return {
    hip,
    waist,
    neck,
    head,
    elbowN,
    handN,
    elbowF,
    handF,
    kneeN,
    footN,
    kneeF,
    footF,
    toeN: add(footN, dir(p.legN[1] + 70, LEN.foot)),
    toeF: add(footF, dir(p.legF[1] + 70, LEN.foot)),
  };
}
/** A pose with its named silk anchors ("handN") resolved to points. */
function resolve(pose) {
  const joints = skeleton(pose);
  const point = (value) => (typeof value === "string" ? joints[value] : value);
  return { ...pose, a1: point(pose.a1), b1: point(pose.b1), a2: point(pose.a2), b2: point(pose.b2) };
}
function blend(from, to, t) {
  const out = {};
  for (const key in from)
    out[key] = Array.isArray(from[key])
      ? from[key].map((v, i) => mix(v, to[key][i], t))
      : mix(from[key], to[key], t);
  return out;
}

const bone = (a, b, width, color) =>
  `<path d="M${fmt(a)}L${fmt(b)}" stroke="${color}" stroke-width="${width}" />`;
function tail(p1, p2, end, c, width, sway) {
  const top = [RIG[0] + sway * 0.2, RIG[1]];
  const d = `M${fmt(top)}L${fmt(p1)}L${fmt(p2)}C${fmt([p2[0] + c[0], p2[1] + c[1]])} ${fmt([end[0] + c[2], end[1] + c[3]])} ${fmt(end)}`;
  return `<path d="${d}" stroke="${SILK}" stroke-width="${width * 2}" opacity=".3" /><path d="${d}" stroke="${SILK_DARK}" stroke-width="${width + 2}" /><path d="${d}" stroke="${SILK}" stroke-width="${width}" /><path d="${d}" stroke="${SILK_LIGHT}" stroke-width="${width * 0.28}" opacity=".75" transform="translate(-2 0)" />`;
}

function draw(layers, pose, time) {
  // After the last pose settles, everything hangs from the rig and swings a little.
  const swing = Math.sin(time / 900) * 1.6 * pose.knot;
  const idle = Math.sin(time / 1300) * 3 * (1 - pose.alpha);
  const p = { ...pose, a1: [pose.a1[0] + idle, pose.a1[1]], b1: [pose.b1[0] + idle, pose.b1[1]] };
  const j = skeleton(pose);
  const cloth = "var(--_cloth)";
  const clothFar = "var(--_cloth-far)";
  const skinFar = "#b07a4f";
  const headAngle = pose.head - 180;

  layers.pool.innerHTML = [p.endA, p.endB]
    .map(
      ([x, y], i) =>
        `<path d="M${x - 26} ${y + 2}q8-9 18-4 8-8 18-2 10-5 16 4-10 6-26 5t-26-3Z" fill="${i ? SILK : SILK_DARK}" />`,
    )
    .join("");
  layers.far.innerHTML = `<g opacity="${pose.alpha}" transform="rotate(${swing} ${RIG[0]} ${RIG[1]})">
  ${bone(j.hip, j.kneeF, 15.5, clothFar)}${bone(j.kneeF, j.footF, 13, clothFar)}${bone(j.footF, j.toeF, 8, skinFar)}
  ${bone(j.neck, j.elbowF, 11, clothFar)}${bone(j.elbowF, j.handF, 9.5, clothFar)}
</g>`;
  layers.silkBack.innerHTML = `<g transform="rotate(${swing} ${RIG[0]} ${RIG[1]})">${tail(p.b1, p.b2, p.endB, p.c, 11, idle)}</g>`;
  layers.near.innerHTML = `<g opacity="${pose.alpha}" transform="rotate(${swing} ${RIG[0]} ${RIG[1]})">
  ${bone(j.hip, j.kneeN, 17, cloth)}${bone(j.kneeN, j.footN, 14, cloth)}${bone(j.footN, j.toeN, 9, SKIN)}
  ${bone(j.hip, j.waist, 27, cloth)}${bone(j.waist, j.neck, 29, cloth)}
  ${bone(j.neck, add(j.neck, dir(pose.head, 9)), 9.5, SKIN)}
  <g transform="translate(${fmt(j.head)}) rotate(${headAngle}) scale(1.2)">
    <circle r="10.5" fill="${SKIN}" />
    <path d="M-11 -1c-3-15 22-19 23-2-3-5-8-7-12-6s-9 3-11 8Z" fill="#1c1e22" /><path d="M6 -8c8 0 9 12 4 17-1-6-2-10-4-17Z" fill="#1c1e22" />
    <circle r="11" fill="#1c1e22" opacity="${pose.back}" />
  </g>
  ${bone(j.neck, j.elbowN, 12, cloth)}${bone(j.elbowN, j.handN, 10, cloth)}
</g>`;
  // The near tail hangs behind the figure.
  layers.silkFront.innerHTML = `<g transform="rotate(${swing} ${RIG[0]} ${RIG[1]})">${tail(p.a1, p.a2, p.endA, p.c, 12, idle)}</g>`;
  // Over the body: the hip wrap, the foot lock and both hands gripping the fabric.
  layers.silkTop.innerHTML = `<g transform="rotate(${swing} ${RIG[0]} ${RIG[1]})">
  <g opacity="${pose.knot}"><path d="M${fmt(add(j.hip, [-12, -5]))}L${fmt(add(j.hip, [13, 4]))}" stroke="${SILK}" stroke-width="10" />
  <ellipse cx="${j.footN[0]}" cy="${j.footN[1] + 2}" rx="9" ry="11" fill="${SILK}" stroke="${SILK_DARK}" stroke-width="1.5" /><path d="M${fmt(add(j.footN, [-6, -4]))}q6 6 12 2" stroke="${SILK_LIGHT}" stroke-width="2" /></g>
  <g opacity="${pose.alpha}"><circle cx="${j.handF[0]}" cy="${j.handF[1]}" r="6" fill="${skinFar}" /><circle cx="${j.handN[0]}" cy="${j.handN[1]}" r="6.2" fill="${SKIN}" /></g></g>`;
}

/** The key poses with their silk anchors resolved: rest, gather, open, pose. */
export const KEYS = POSES.map(resolve);
export { blend, draw, ease };
