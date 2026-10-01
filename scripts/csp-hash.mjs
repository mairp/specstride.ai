#!/usr/bin/env node
// After the build: put the SHA-256 of the one inline script (the theme init) into
// the CSP in dist/_headers, and fail if any page carries another inline script.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const html = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && html.push(p); });
walk(dist);
const hashes = new Set();
for (const file of html) {
  for (const m of readFileSync(file, 'utf8').matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) {
    hashes.add(`'sha256-${createHash('sha256').update(m[1]).digest('base64')}'`);
  }
}
if (hashes.size > 1) { console.error(`csp-hash: ${hashes.size} different inline scripts; expected one`, [...hashes]); process.exit(1); }
const path = join(dist, '_headers');
const headers = readFileSync(path, 'utf8');
if (!headers.includes("'sha256-THEME_INIT'")) { console.error('csp-hash: placeholder missing in _headers'); process.exit(1); }
writeFileSync(path, headers.replace("'sha256-THEME_INIT'", [...hashes].join(' ')));
console.log(`csp-hash: ${[...hashes].join(' ')} in ${path} (${html.length} pages)`);
