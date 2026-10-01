#!/usr/bin/env node
// Generates the hero ASCII art and the favicon from the folded-track mark.
// Reproducible: same mark in, same files out. Run with `npm run gen`.
//
//   src/generated/hero.json   lines of the hero at two sizes (desktop, phone)
//   src/generated/hero.txt    the desktop hero as plain text (for README/curl)
//   public/favicon.svg        the mark as an SVG icon
//
// The mark is rasterised onto square pixels (a cell of the mark is P pixels wide
// and 2P tall, matching a terminal cell), then every two vertical pixels become
// one character cell drawn with '#'. Gate posts are drawn on top as their own
// glyphs, numbered in the order a run reaches them, so the page can light them up.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MARK, geometry } from './mark.mjs';

// The track is drawn in plain ASCII: one glyph per filled cell.
const FILL = '#';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const g = geometry();

function raster(P) {
  const W = g.cols * P;
  const Hpx = g.rows * 2 * P + 2;
  const px = Array.from({ length: Hpx }, () => new Array(W).fill(0));
  const half = P * 0.75; // stroke half-thickness in pixels (rails three rows thick)
  // Snap vertical extents to whole characters (two pixels) so rails stay crisp.
  const fill = (x0, y0, x1, y1) => {
    y0 = 2 * Math.floor(y0 / 2);
    y1 = 2 * Math.ceil(y1 / 2);
    for (let y = Math.max(0, Math.floor(y0)); y < Math.min(Hpx, Math.ceil(y1)); y++)
      for (let x = Math.max(0, Math.floor(x0)); x < Math.min(W, Math.ceil(x1)); x++) px[y][x] = 1;
  };
  for (const [x1, y1, x2, y2] of g.segs) {
    // cell units → pixels (x: P per unit, y: P per unit since a cell is 2 units tall)
    // +1px puts each rail centre mid-character, so a six-pixel rail is exactly three rows
    const ax = x1 * P, ay = y1 * P + 1, bx = x2 * P, by = y2 * P + 1;
    if (ay === by) fill(Math.min(ax, bx) - (ax === bx ? half : 0), ay - half, Math.max(ax, bx), ay + half);
    else fill(ax - half, Math.min(ay, by) - half, ax + half, Math.max(ay, by) + half);
  }
  return { W, Hpx, px };
}

// Gate order along the track: the S is driven from its top-right open end.
function gateOrder() {
  const rows = [...new Set(g.gates.map(([, y]) => y))].sort((a, b) => a - b);
  const ordered = [];
  rows.forEach((y, i) => {
    const row = g.gates.filter(([, gy]) => gy === y).sort((a, b) => a[0] - b[0]);
    ordered.push(...(i % 2 === 0 ? row.reverse() : row));
  });
  return ordered;
}

function render(P) {
  const { W, Hpx, px } = raster(P);
  const rows = Hpx / 2;
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const line = [];
    for (let c = 0; c < W; c++) {
      const t = px[2 * r][c], b = px[2 * r + 1][c];
      line.push({ ch: t || b ? FILL : ' ', gate: null });
    }
    grid.push(line);
  }
  const posts = gateOrder();
  posts.forEach(([gx, gy], i) => {
    const col = Math.floor(gx * P);
    const top = Math.floor((gy * P + 1 - P * 0.75) / 2); // first char row of the rail
    const bottom = Math.ceil((gy * P + 1 + P * 0.75) / 2); // one past its last row
    for (let r = top - 1; r < bottom + 1; r++) {
      if (r < 0 || r >= rows) continue;
      grid[r][col] = { ch: P >= 4 ? '┃' : '│', gate: i };
    }
  });
  // compress each line into runs: { t: text, g?: gate index }
  return grid.map((line) => {
    const runs = [];
    for (const cell of line) {
      const last = runs[runs.length - 1];
      if (last && last.g === cell.gate) last.t += cell.ch;
      else runs.push(cell.gate === null ? { t: cell.ch, g: null } : { t: cell.ch, g: cell.gate });
    }
    const lastRun = runs[runs.length - 1];
    if (lastRun && lastRun.g === null) lastRun.t = lastRun.t.replace(/\s+$/, '');
    return runs.filter((r) => r.t.length).map((r) => (r.g === null ? { t: r.t } : r));
  });
}

// On phones the mark itself is the art: its box-drawing glyphs, set larger.
function renderMark() {
  const order = gateOrder().map(([x, y]) => `${Math.floor(x)},${(y - 1) / 2}`);
  return MARK.map((line, r) => {
    const runs = [];
    [...line].forEach((ch, c) => {
      const gi = order.indexOf(`${c},${r}`);
      const gate = gi >= 0 ? gi : null;
      const last = runs[runs.length - 1];
      if (last && last.g === gate) last.t += ch;
      else runs.push({ t: ch, g: gate });
    });
    return runs.map((r) => (r.g === null ? { t: r.t } : r));
  });
}

const hero = { gates: g.gates.length, desktop: render(4), phone: renderMark() };
const text = (lines) => lines.map((l) => l.map((r) => r.t).join('')).join('\n') + '\n';

mkdirSync(join(root, 'src/generated'), { recursive: true });
writeFileSync(join(root, 'src/generated/hero.json'), JSON.stringify(hero, null, 1) + '\n');
writeFileSync(join(root, 'src/generated/hero.txt'), text(hero.desktop));

// Favicon: the mark's centre lines as strokes, gate posts as short ticks.
const pad = 1.2;
const vw = g.width + pad * 2, vh = g.height + pad * 2;
const side = Math.max(vw, vh);
const ox = (side - vw) / 2 + pad, oy = (side - vh) / 2 + pad;
const f = (n) => +n.toFixed(2);
const track = g.segs.map(([a, b, c, d]) => `M${f(a + ox)} ${f(b + oy)}L${f(c + ox)} ${f(d + oy)}`).join('');
const ticks = g.gates.map(([x, y]) => `M${f(x + ox)} ${f(y + oy - 0.9)}V${f(y + oy + 0.9)}`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(side)} ${f(side)}">
<style>.t{stroke:#1e1e1e}.g{stroke:#c2187a}@media(prefers-color-scheme:dark){.t{stroke:#e8e8e8}.g{stroke:#f07cc0}}</style>
<path class="t" d="${track}" fill="none" stroke-width="1.1" stroke-linecap="square" stroke-linejoin="miter"/>
<path class="g" d="${ticks}" fill="none" stroke-width="0.7"/>
</svg>
`;
mkdirSync(join(root, 'public'), { recursive: true });
writeFileSync(join(root, 'public/favicon.svg'), svg);
console.log(`gen-ascii: hero ${hero.desktop[0].length ? '' : ''}${hero.desktop.length} rows (desktop), ${hero.phone.length} rows (phone), ${hero.gates} gates`);
