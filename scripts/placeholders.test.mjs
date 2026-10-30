// Guards when the placeholder check blocks a build and what counts as a marker.
import { test } from "node:test";
import assert from "node:assert/strict";
import { isStrict, markerLines, ROOTS } from "./check-placeholders.mjs";

test("strict on the Cloudflare Pages production branch, --strict and Vercel production", () => {
  assert.equal(isStrict({ CF_PAGES: "1", CF_PAGES_BRANCH: "main" }, []), true);
  assert.equal(isStrict({}, ["--strict"]), true);
  assert.equal(isStrict({ VERCEL_ENV: "production" }, []), true);
});

test("lenient on previews and local builds", () => {
  assert.equal(isStrict({ CF_PAGES: "1", CF_PAGES_BRANCH: "feature/x" }, []), false);
  assert.equal(isStrict({ CF_PAGES_BRANCH: "main" }, []), false);
  assert.equal(isStrict({}, []), false);
});

test("a marker in inline code is a mention, not a placeholder", () => {
  assert.deepEqual(
    markerLines("ok\nTODO(verify): favourite trips\nCarries `TODO(verify)` until confirmed"),
    [2],
  );
});

test("scans content and the Storybook design docs", () => {
  assert.deepEqual(ROOTS, ["src/content/", ".storybook/docs/"]);
});
