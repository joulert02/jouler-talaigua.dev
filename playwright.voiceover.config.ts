import { devices } from "@playwright/test";
import { withGuidepup } from "@guidepup/playwright";

// The real VoiceOver (Guidepup), macOS only and run by hand: `npm run test:voiceover`. CI keeps the accessibility-tree
// guard in tests/a11y. Against production by default; VOICEOVER_URL points it elsewhere (a preview, a local build).
// Setup and permissions: docs/audits/hu-13-quality.md.
export default withGuidepup({
  testDir: "tests/voiceover",
  timeout: 3 * 60 * 1000,
  // One retry for a dropped connection to the site; VoiceOver itself is not flaky here.
  retries: 1,
  reporter: "list",
  use: { baseURL: process.env.VOICEOVER_URL ?? "https://jouler-talaigua.dev" },
  projects: [
    {
      name: "chrome",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
        // Chrome's "Translate this page?" bubble would take VoiceOver's attention.
        launchOptions: { args: ["--disable-features=Translate"] },
      },
    },
  ],
});
