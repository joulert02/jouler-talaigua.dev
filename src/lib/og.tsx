import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// Resolved from the project root: bundled chunks move, cwd does not (static build only).
const fontDir = join(process.cwd(), "node_modules/@fontsource/inter/files");
let fonts: Promise<[Buffer, Buffer]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    readFile(join(fontDir, "inter-latin-400-normal.woff")),
    readFile(join(fontDir, "inter-latin-700-normal.woff")),
  ]));

/** Renders a 1200×630 PNG. Visual design is placeholder until Épica 4. */
export async function renderOg({
  title,
  kicker,
}: {
  title: string;
  kicker: string;
}): Promise<Uint8Array<ArrayBuffer>> {
  const [regular, bold] = await loadFonts();
  const svg = await satori(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0c0a09",
        color: "#fafaf9",
        fontFamily: "Inter",
      }}
    >
      <div style={{ fontSize: 28, color: "#a8a29e" }}>{kicker}</div>
      <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 28 }}>JOTA · Jouler Talaigua</div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: regular, weight: 400 },
        { name: "Inter", data: bold, weight: 700 },
      ],
    },
  );
  return new Uint8Array(new Resvg(svg).render().asPng());
}
