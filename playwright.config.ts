import { defineConfig, devices } from "@playwright/test";

// Screen reader guard (HU-13): runs against the production build in `dist/`, so `npm run build` comes first.
export default defineConfig({
  testDir: "tests/a11y",
  snapshotPathTemplate: "{testDir}/__snapshots__/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: "http://localhost:4329", ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
  webServer: {
    command: "npx astro preview --port 4329",
    url: "http://localhost:4329",
    reuseExistingServer: !process.env.CI,
  },
});
