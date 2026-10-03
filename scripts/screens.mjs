#!/usr/bin/env node
// Screenshots of the built site at phone, tablet and desktop widths, in both
// themes, into .review/ (git-ignored). Also fails on console errors and on any
// horizontal scroll. Usage: npm run preview & node scripts/screens.mjs [baseURL]
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:4321';
const pages = (process.env.PAGES ?? '/,/install/,/ecosystem/,/docs/,/products/specstride-cli/,/nope/').split(',');
const widths = [390, 768, 1440];
const themes = ['dark', 'light'];
mkdirSync('.review', { recursive: true });

const browser = await chromium.launch();
let problems = 0;
for (const theme of themes) {
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: theme, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const errors = [];
    // the /nope/ page is a deliberate 404; only failing subresources count
    page.on('console', (m) => m.type() === 'error' && !m.text().startsWith('Failed to load resource') && errors.push(m.text()));
    page.on('response', (r) => r.status() >= 400 && r.request().resourceType() !== 'document' && errors.push(`${r.status()} ${r.url()}`));
    page.on('pageerror', (e) => errors.push(String(e)));
    for (const p of pages) {
      await page.goto(base + p, { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const name = `${(p.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home')}-${width}-${theme}.png`;
      await page.screenshot({ path: `.review/${name}`, fullPage: true });
      if (overflow > 0) { problems++; console.log(`OVERFLOW ${overflow}px  ${p} @${width} ${theme}`); }
    }
    if (errors.length) { problems += errors.length; console.log(`console errors @${width} ${theme}:`, errors); }
    await ctx.close();
  }
}
await browser.close();
console.log(problems ? `${problems} problem(s)` : 'screens: no overflow, no console errors');
process.exit(problems ? 1 : 0);
