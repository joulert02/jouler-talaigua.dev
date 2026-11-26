import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

/** What a shared link shows (HU-11): one card per page type, light and typographic (option A, for comparison
 * with the dark option C in #48). */
export type OgCard = {
  /** The small mono label above the title: the company of a case, the section of a page. */
  kicker: string;
  title: string;
  /** One or two lines under the title. */
  summary?: string | undefined;
  /** The footer line: the name and the role. */
  byline: string;
};

const WIDTH = 1200;
const HEIGHT = 630;
const HOST = "jouler-talaigua.dev";

// Light tokens from src/styles/tokens.css. A share image is fetched once by each platform's crawler, with no theme, so
// it cannot follow the visitor's theme.
const color = { bg: "#F6F7F9", ink: "#141517", muted: "#5B616A", accent: "#6E44F0" };

// Resolved from the project root: bundled chunks move, cwd does not (static build only).
const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));
let fonts: Promise<[Buffer, Buffer, Buffer]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    font("onest", "onest-latin-400-normal.woff"),
    font("onest", "onest-latin-600-normal.woff"),
    font("geist-mono", "geist-mono-latin-400-normal.woff"),
  ]));

/** Renders a 1200×630 PNG for one page. */
export async function renderOg(card: OgCard): Promise<Uint8Array<ArrayBuffer>> {
  const [regular, semibold, mono] = await loadFonts();
  const svg = await satori(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: color.bg,
        color: color.ink,
        fontFamily: "Onest",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, background: color.accent }} />
        <div style={{ fontFamily: "Geist Mono", fontSize: 24, color: color.muted }}>{card.kicker}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: card.title.length > 28 ? 60 : 76,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -1.5,
          }}
        >
          {card.title}
        </div>
        {card.summary && (
          <div style={{ fontSize: 30, lineHeight: 1.4, color: color.muted, display: "block", lineClamp: 2 }}>
            {card.summary}
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 24 }}>
        <div style={{ display: "flex" }}>{card.byline}</div>
        <div style={{ fontFamily: "Geist Mono", fontSize: 22, color: color.muted }}>{HOST}</div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Onest", data: regular, weight: 400 },
        { name: "Onest", data: semibold, weight: 600 },
        { name: "Geist Mono", data: mono, weight: 400 },
      ],
    },
  );
  return new Uint8Array(new Resvg(svg, { fitTo: { mode: "width", value: WIDTH } }).render().asPng());
}
