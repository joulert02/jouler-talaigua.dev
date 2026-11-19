// Guards Storybook's "Show code" (see .storybook/source.js): it is always generated, never hand-written.
// A story renders its own component, so storybook-astro generates the snippet from the args; a composition story
// renders an example file and shows that same file, imported with `?raw`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../src", import.meta.url));
const stories = readdirSync(root, { recursive: true })
  .filter((file) => file.endsWith(".stories.ts"))
  .map((file) => join(root, file));

test("every story renders its own component or a named example file", () => {
  assert.ok(stories.length > 0);
  for (const file of stories) {
    const text = readFileSync(file, "utf8");
    const example = text.includes("...exampleMeta(");
    if (example)
      assert.match(text, /^ {2}component: Example,$/m, `${file}: composition stories render Example`);
    const component = text.match(example ? /^ {2}\.\.\.exampleMeta\((\w+)/m : /^ {2}component: (\w+),/m)?.[1];
    const from = component && text.match(new RegExp(`import ${component} from "([^"]+)"`))?.[1];
    assert.equal(
      from,
      `./${basename(dirname(file))}.astro`,
      `${file}: the stories must document the component itself`,
    );
    if (!example) continue;
    // Composition stories: every story names an existing example file (its "Show code").
    const stories = text.match(/meta\.story\(/g)?.length ?? 0;
    const examples = [...text.matchAll(/args: \{ example: "([^"]+)" \}/g)].map((match) => match[1]);
    assert.equal(examples.length, stories, `${file}: every story needs args.example`);
    for (const example of examples) {
      assert.match(example, /\/examples\/\w+\.astro$/, `${file}: ${example} must live in examples/`);
      assert.ok(existsSync(join(root, "components", example)), `${file}: missing ${example}`);
    }
  }
});

// storybook-astro loads a component's CSS only through static, relative .astro imports (see .storybook/Example.astro).
test("every example file is imported by Example.astro and imports components by relative path", () => {
  const registry = readFileSync(
    fileURLToPath(new URL("../.storybook/Example.astro", import.meta.url)),
    "utf8",
  );
  const examples = readdirSync(join(root, "components"), { recursive: true }).filter((file) =>
    /\/examples\/\w+\.astro$/.test(file),
  );
  assert.ok(examples.length > 0);
  for (const example of examples) {
    assert.ok(registry.includes(`"../src/components/${example}"`), `Example.astro must import ${example}`);
    assert.ok(registry.includes(`"${example}":`), `Example.astro must map ${example}`);
    const text = readFileSync(join(root, "components", example), "utf8");
    assert.doesNotMatch(
      text,
      /from "@\/[^"]+\.astro"/,
      `${example}: import .astro components by relative path`,
    );
  }
});
