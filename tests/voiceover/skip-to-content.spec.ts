// What the real VoiceOver says after Skip to content, then reading on with VO + → (HU-13). Prints the transcript.
import { voiceOverTest as test } from "@guidepup/playwright";
import { expect } from "@playwright/test";

const pages = [
  ["/", "Jouler Talaigua"],
  ["/work/", "Selected projects"],
  ["/more-about-me/", "More about me"],
] as const;

for (const [path, heading] of pages) {
  test(`VoiceOver: Skip to content on ${path}`, async ({ page, voiceOver }) => {
    await page.goto(path, { waitUntil: "load" });
    await page.locator(".skip-link").waitFor({ state: "attached" });
    await voiceOver.navigateToWebContent();
    await voiceOver.clearSpokenPhraseLog();

    await voiceOver.press("Tab"); // Skip to content
    await voiceOver.press("Enter"); // into main
    for (let i = 0; i < 5; i++) await voiceOver.next(); // VO + →

    const said = await voiceOver.spokenPhraseLog();
    console.log(`\n${path}\n  ${said.join("\n  ")}`);
    expect(said.join(" ")).toContain(`${heading} main`);
  });
}
