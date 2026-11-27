// Manual audit with the real VoiceOver (HU-13, macOS only): opens Chrome on the key pages, presses Skip to content,
// reads on with VO+→ and tabs on, and writes everything VoiceOver says to voiceover-transcript.txt.
// usage: npm run audit:voiceover -- [base URL, default production]
// One-time setup: VoiceOver Utility › General › "Allow VoiceOver to be controlled with AppleScript". It speaks aloud and
// takes the screen for about two minutes. Not for CI: the guard there is tests/a11y.
import { chromium } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
const base = process.argv[2] ?? "https://jouler-talaigua.dev";
const vo = (s) =>
  execFileSync("osascript", ["-e", `tell application "VoiceOver" to ${s}`], { encoding: "utf8" }).trim();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const plan = [
  ["/", [["skip"], ["next", 6], ["tab", 3]]],
  ["/work/", [["skip"], ["next", 5], ["tab", 2]]],
  ["/more-about-me/", [["skip"], ["next", 3], ["tab", 1]]],
  ["/work/bancolombia-svp/", [["skip"], ["next", 5], ["tab", 3]]],
  ["/es/", [["skip"], ["next", 3]]],
];
const ensureVo = async () => {
  try {
    execFileSync("pgrep", ["-x", "VoiceOver"]);
  } catch {
    execFileSync("open", ["-a", "/System/Library/CoreServices/VoiceOver.app"]);
    await wait(4000);
  }
};
const browser = await chromium.launch({
  channel: "chrome",
  headless: false,
  args: ["--force-renderer-accessibility", "--window-size=1400,900", "--window-position=0,0"],
});
const page = await (await browser.newContext({ viewport: null })).newPage();
let prev = "";
const out = [`VoiceOver transcript · ${base} · ${new Date().toISOString()}`];
try {
  for (const [url, steps] of plan) {
    await ensureVo();
    await page.goto(base + url, { waitUntil: "networkidle" });
    await page.bringToFront();
    execFileSync("osascript", ["-e", 'tell application "Google Chrome" to activate']);
    await wait(2500);
    out.push(`\n== ${url}\n  (page)   ${vo("return content of last phrase")}`);
    const said = async (label) => {
      // Collect every phrase VoiceOver says while it settles, not only the last one (the hint replaces the name).
      const heard = [];
      for (let t = 0; t < 14; t++) {
        let p = "";
        try {
          p = vo("return content of last phrase").replace(/\s+/g, " ");
        } catch {
          // VoiceOver is between phrases; try again on the next tick.
        }
        if (p && p !== "missing value" && heard.at(-1) !== p && !(t === 0 && p === prev)) heard.push(p);
        await wait(110);
      }
      prev = heard.at(-1) ?? prev;
      out.push(`  ${label.padEnd(8)} ${heard.join("  ⟶  ")}`);
    };
    for (const [kind, n = 1] of steps) {
      if (kind === "skip") {
        await page.evaluate(() => {
          const a = globalThis.document.querySelector(".skip-link");
          a.focus();
          a.click();
        });
        await said("Skip ⏎");
      } else if (kind === "tab")
        for (let i = 0; i < n; i++) {
          await page.keyboard.press("Tab");
          await said("Tab");
        }
      else
        for (let i = 0; i < n; i++) {
          vo("tell vo cursor to move right");
          await said("VO+→");
        }
    }
  }
} finally {
  await browser.close();
  writeFileSync("voiceover-transcript.txt", out.join("\n"));
  console.log(out.join("\n"));
}
