// Check preserved prototypes without changing their sources or recorded hashes.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const failures = [];
let checked = 0;
for (const name of ['v6', 'v7', 'v8', 'v9', 'v10', 'v11']) {
  const manifest = JSON.parse(await readFile(resolve(root, `docs/design/history/${name}.json`), 'utf8'));
  for (const [path, expected] of Object.entries(manifest.files)) {
    checked += 1;
    try {
      const actual = createHash('sha256').update(await readFile(resolve(root, path))).digest('hex');
      if (actual !== expected) failures.push(`${path}: content changed`);
    } catch {
      failures.push(`${path}: unavailable`);
    }
  }
}
if (failures.length) {
  console.error(`History verification failed:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Preserved design history: ${checked} hashes match.`);
}
