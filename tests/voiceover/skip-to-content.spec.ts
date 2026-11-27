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
    const skip = page.locator(".skip-link");
    await skip.waitFor({ state: "attached" });
    await voiceOver.navigateToWebContent();
    await voiceOver.clearSpokenPhraseLog();

    // Keyboard focus on Skip to content (VoiceOver follows it), then VoiceOver itself activates it (VO + Space).
    await skip.focus();
    await expect.poll(() => voiceOver.itemText()).toContain("Skip to content");
    await voiceOver.act();
    for (let i = 0; i < 5; i++) await voiceOver.next(); // VO + →

    const said = await voiceOver.spokenPhraseLog();
    console.log(`\n${path}\n  ${said.join("\n  ")}`);
    expect(new URL(page.url()).pathname).toBe(path); // still on the page: nothing else was activated
    // After Skip, VoiceOver reads the page's own content: its heading comes up, the language switch does not.
    const read = said.join(" ");
    expect(read).toContain(`heading level 1 ${heading}`);
    expect(read).not.toContain("Language navigation");
  });
}
