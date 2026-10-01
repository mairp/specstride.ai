#!/usr/bin/env node
// Builds the under-construction placeholder into dist-construction/: one page
// with the mark and a single line, plus the font and icons it needs. Nothing
// from the full site (pages, data, social card) is copied, so none of it is
// deployed while site-mode says "construction".
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist-construction');
const hero = JSON.parse(readFileSync(join(root, 'src/generated/hero.json'), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const art = (rows) => rows.map((row) => row.map((r) => (typeof r.g === 'number' ? `<span class="g g${r.g}">${esc(r.t)}</span>` : esc(r.t))).join('')).join('\n');

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'fonts'), { recursive: true });
for (const f of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) copyFileSync(join(root, 'public', f), join(out, f));
copyFileSync(join(root, 'public/fonts/jetbrains-mono-Bold.woff2'), join(out, 'fonts/jetbrains-mono-Bold.woff2'));
copyFileSync(join(root, 'public/fonts/OFL.txt'), join(out, 'fonts/OFL.txt'));

writeFileSync(join(out, 'index.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<meta name="color-scheme" content="dark light">
<title>specstride.ai · under construction</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/construction.css">
</head>
<body>
<main>
<h1 class="visually-hidden">specstride.ai is under construction</h1>
<pre class="art art-desktop" aria-hidden="true">${art(hero.desktop)}</pre>
<pre class="art art-phone" aria-hidden="true">${art(hero.phone)}</pre>
<p class="line" aria-hidden="true">specstride <span>·</span> under construction</p>
</main>
</body>
</html>
`);

writeFileSync(join(out, 'construction.css'), `@font-face { font-family: 'JetBrains Mono'; font-weight: 700; font-display: swap; src: url('/fonts/jetbrains-mono-Bold.woff2') format('woff2'); }
:root { --bg: #141414; --fg: #ffffff; --muted: #9aa2b2; --ok: #4ade80; --accent: #f07cc0; color-scheme: dark; }
@media (prefers-color-scheme: light) { :root { --bg: #fafaf7; --fg: #000000; --muted: #575c66; --ok: #0e6a2f; --accent: #b0136e; color-scheme: light; } }
* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body { background: var(--bg); color: var(--fg); font-family: 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace; }
main { min-height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2.5rem; padding: 2rem 16px; }
.art { margin: 0; font-weight: 700; line-height: 1.1; white-space: pre; text-align: left; font-variant-ligatures: none; user-select: none; max-width: 100%; }
.art-desktop { display: none; font-size: clamp(8px, 1.1vw, 15px); }
.art-phone { font-size: clamp(22px, 7.4vw, 34px); line-height: 1.02; }
@media (min-width: 760px) { .art-desktop { display: block; } .art-phone { display: none; } }
.g { color: var(--muted); }
@media (prefers-reduced-motion: no-preference) {
  .g { animation: gate 9s infinite steps(1, end); }
  .g0 { animation-delay: .6s; } .g1 { animation-delay: 1.4s; } .g2 { animation-delay: 2.2s; }
  .g3 { animation-delay: 3s; } .g4 { animation-delay: 3.8s; } .g5 { animation-delay: 4.6s; }
}
@keyframes gate { 0% { color: var(--accent); } 8% { color: var(--ok); } 80% { color: var(--ok); } 100% { color: var(--muted); } }
.line { margin: 0; color: var(--muted); font-size: 0.95rem; letter-spacing: 0.02em; text-align: center; }
.line span { color: var(--accent); }
.visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
`);

writeFileSync(join(out, '_headers'), `/*
  Content-Security-Policy: default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; connect-src 'self' https://cloudflareinsights.com; img-src 'self' data:; style-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()
  X-Frame-Options: DENY
  X-Robots-Tag: noindex, nofollow
`);
console.log('build-construction: dist-construction/ ready');
