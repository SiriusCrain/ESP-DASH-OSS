#!/usr/bin/env node
// Gzip dist/index.html and rewrite ../src/edp.cpp + ../src/edp.h in place.
// Only the DASH_HTML byte array and its size literal change.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const frontendDir = resolve(here, '..');
const repoRoot = resolve(frontendDir, '..');
const distHtml = join(frontendDir, 'dist', 'index.html');
const distSprite = join(frontendDir, 'dist', 'icons.svg');
const edpCpp = join(repoRoot, 'src', 'edp.cpp');
const edpH = join(repoRoot, 'src', 'edp.h');
const BYTES_PER_LINE = 30;

if (!existsSync(distHtml)) {
  console.error(`error: ${distHtml} not found. Run 'pnpm run build' first.`);
  process.exit(1);
}

let htmlStr = readFileSync(distHtml, 'utf8');

if (existsSync(distSprite)) {
  const sprite = readFileSync(distSprite, 'utf8').trim();
  htmlStr = htmlStr
    .replaceAll('/icons.svg#', '#')
    .replace('</body>', `${sprite}</body>`);
}

const html = Buffer.from(htmlStr);
const gz = gzipSync(html, { level: 9 });
const size = gz.length;

console.log(`html: ${html.length} bytes`);
console.log(`gzip: ${size} bytes`);

const lines = [];
for (let i = 0; i < size; i += BYTES_PER_LINE) {
  const chunk = gz.subarray(i, Math.min(i + BYTES_PER_LINE, size));
  const parts = [];
  for (const b of chunk) parts.push(String(b));
  const isLast = i + BYTES_PER_LINE >= size;
  lines.push(parts.join(',') + (isLast ? '' : ','));
}
const arrayBody = lines.join('\n');

const headerOrig = readFileSync(edpH, 'utf8');
const headerNew = headerOrig.replace(
  /extern const uint8_t DASH_HTML\[\d+\];/,
  `extern const uint8_t DASH_HTML[${size}];`,
);
if (headerNew === headerOrig && !headerOrig.includes(`DASH_HTML[${size}]`)) {
  console.error(`error: could not find DASH_HTML declaration in ${edpH}`);
  process.exit(1);
}
writeFileSync(edpH, headerNew);

const cppOrig = readFileSync(edpCpp, 'utf8');
const cppRegex = /const uint8_t DASH_HTML\[\d+\] PROGMEM = \{[\s\S]*?\};/;
if (!cppRegex.test(cppOrig)) {
  console.error(`error: could not find DASH_HTML array in ${edpCpp}`);
  process.exit(1);
}
const cppNew = cppOrig.replace(
  cppRegex,
  `const uint8_t DASH_HTML[${size}] PROGMEM = { \n${arrayBody}\n};`,
);
writeFileSync(edpCpp, cppNew);

console.log(`embedded: src/edp.cpp src/edp.h (DASH_HTML[${size}])`);
