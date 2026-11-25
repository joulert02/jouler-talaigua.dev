import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { URL } from "node:url";

test("the public team photo is upright and contains only PNG image chunks", () => {
  const bytes = readFileSync(new URL("../src/assets/projects/mercadolibre/meli-team.png", import.meta.url));
  assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(bytes.readUInt32BE(16), 1050);
  assert.equal(bytes.readUInt32BE(20), 1400);
  let offset = 8;
  const chunks = [];
  while (offset < bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const kind = bytes.subarray(offset + 4, offset + 8).toString("ascii");
    assert.ok(["IHDR", "IDAT", "IEND"].includes(kind), `Unexpected metadata chunk: ${kind}`);
    chunks.push(kind);
    offset += length + 12;
  }
  assert.equal(offset, bytes.length);
  assert.equal(chunks.at(-1), "IEND");
});
