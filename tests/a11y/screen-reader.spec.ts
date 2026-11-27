// What a screen reader gets on the pages that matter, read from Chrome's accessibility tree (what VoiceOver reads).
// Audited with the real VoiceOver in HU-13 (docs/audits/hu-13-quality.md); these keep it from regressing.
// After an intended change to copy or structure: `npm run test:a11y -- --update-snapshots`, then review the diff.
import { expect, test, type Page } from "@playwright/test";

/** Role and name of the focused element, as a screen reader announces it. */
async function focused(page: Page) {
  const snapshot = await page.locator("*:focus").ariaSnapshot();
  return snapshot.split("\n")[0]?.replace(/^- /, "").replace(/:$/, "") ?? "";
}

/** Presses Skip to content the way a keyboard user does: the first Tab, then Enter. */
async function skipToContent(page: Page) {
  await page.keyboard.press("Tab");
  expect(await focused(page)).toMatch(/^link "(Skip to content|Saltar al contenido)"/);
  await page.keyboard.press("Enter");
}

const landings = [
  ["/", 'main "Jouler Talaigua"'],
  ["/es/", 'main "Jouler Talaigua"'],
  ["/work/", 'main "Selected projects"'],
  ["/es/work/", 'main "Proyectos seleccionados"'],
  ["/more-about-me/", 'main "More about me"'],
  ["/work/bancolombia-svp/", 'main "Sucursal Virtual Personas"'],
] as const;

for (const [path, announced] of landings) {
  test(`Skip to content says where it lands: ${path}`, async ({ page }) => {
    await page.goto(path);
    await skipToContent(page);
    expect(await focused(page)).toBe(announced);
  });
}

for (const path of ["/", "/work/"]) {
  test(`Tab order and names: ${path}`, async ({ page }) => {
    await page.goto(path);
    await skipToContent(page);
    const stops: string[] = [];
    for (let i = 0; i < 18; i++) {
      await page.keyboard.press("Tab");
      stops.push(await focused(page));
    }
    expect(stops.join("\n")).toMatchSnapshot(`tab-order-${path === "/" ? "home" : "work"}.txt`);
  });
}

test("Home: the card and the desk", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main article").first()).toMatchAriaSnapshot({ name: "home-card.aria.yml" });
  const desk = page.getByRole("region", { name: "Personal desk", exact: true });
  await expect(desk).toHaveAccessibleDescription(/arrow keys to explore/);
});

test("Work: the list of projects", async ({ page }) => {
  await page.goto("/work/");
  await expect(page.getByRole("main")).toMatchAriaSnapshot({ name: "work-main.aria.yml" });
});

test("Language switch names the visible code first", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Language" })).toMatchAriaSnapshot(`
    - navigation "Language":
      - text: EN
      - link "ES, leer en español"
  `);
});
