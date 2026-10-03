#!/usr/bin/env node
// axe-core over every page in both themes (Lighthouse only checks the light one).
// Usage: node scripts/a11y.mjs [baseURL]
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
const axe = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const base = process.argv[2] ?? 'http://localhost:4321';
const pages = ['/', '/install/', '/ecosystem/', '/docs/', '/products/specstride-cli/', '/nope/'];
const browser = await chromium.launch();
let bad = 0;
for (const theme of ['dark', 'light']) {
  const page = await browser.newPage({ colorScheme: theme, reducedMotion: 'reduce', bypassCSP: true });
  for (const p of pages) {
    await page.goto(base + p);
    await page.addScriptTag({ content: axe });
    const res = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'best-practice'] })).violations);
    for (const v of res) { bad++; console.log(theme, p, v.id, v.impact, v.nodes.slice(0, 3).map((n) => n.html.slice(0, 90))); }
  }
  await page.close();
}
await browser.close();
console.log(bad ? `${bad} violation(s)` : 'a11y: no axe violations');
process.exit(bad ? 1 : 0);
