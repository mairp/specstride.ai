#!/usr/bin/env node
// Generates the social card (public/og.png, 1200×630), the Apple touch icon and
// favicon.ico from the same mark geometry as the hero, in the site's dark theme.
// Fonts are the committed JetBrains Mono subsets in scripts/assets (OFL).
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { geometry } from './mark.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fonts = ['Regular', 'Bold'].map((w) => join(root, `scripts/assets/JetBrainsMonoNL-${w}.ttf`));
const g = geometry();
const C = { bg: '#141414', fg: '#ffffff', text: '#d4d4d4', muted: '#9aa2b2', accent: '#f07cc0', ok: '#4ade80', border: '#333333' };

/** The mark as SVG shapes: thick track (half a cell wide) and gate posts. */
function markShapes(x0, y0, unit, { gates = true, lit = 3 } = {}) {
  const half = unit / 2;
  const rects = g.segs.map(([ax, ay, bx, by]) => {
    const [X1, Y1, X2, Y2] = [ax * unit, ay * unit, bx * unit, by * unit];
    if (Y1 === Y2) {
      const l = Math.min(X1, X2), r = Math.max(X1, X2);
      return `<rect x="${x0 + l - (X1 === X2 ? half : 0)}" y="${y0 + Y1 - half}" width="${r - l}" height="${unit}" />`;
    }
    const t = Math.min(Y1, Y2), b = Math.max(Y1, Y2);
    return `<rect x="${x0 + X1 - half}" y="${y0 + t - half}" width="${unit}" height="${b - t + unit}" />`;
  });
  // gate order matches the hero: the S is driven from its top-right end
  const rows = [...new Set(g.gates.map(([, y]) => y))].sort((a, b) => a - b);
  const ordered = rows.flatMap((y, i) => {
    const row = g.gates.filter(([, gy]) => gy === y).sort((a, b) => a[0] - b[0]);
    return i % 2 === 0 ? row.reverse() : row;
  });
  const posts = gates
    ? ordered.map(([x, y], i) => {
        const col = i < lit ? C.ok : i === lit ? C.accent : C.muted;
        const w = Math.max(2, unit * 0.22);
        return `<rect x="${x0 + x * unit - w / 2}" y="${y0 + y * unit - unit * 1.05}" width="${w}" height="${unit * 2.1}" fill="${col}" />`;
      })
    : [];
  return `<g fill="${C.fg}">${rects.join('')}</g>${posts.join('')}`;
}

function png(svg, width) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles: fonts, loadSystemFonts: false, defaultFontFamily: 'JetBrains Mono NL' },
  }).render().asPng();
}

// ── social card ────────────────────────────────────────────────────────────
const unit = 24;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.bg}" />
  <rect x="24" y="24" width="1152" height="582" rx="14" fill="none" stroke="${C.border}" stroke-width="2" />
  <g font-family="JetBrains Mono NL">
    <text x="80" y="104" font-size="24" fill="${C.accent}">open source · runs on your machine · your models</text>
    ${markShapes(80, 160, unit)}
    <text x="560" y="214" font-size="64" font-weight="700" fill="${C.fg}">specstride</text>
    <text x="560" y="276" font-size="32" fill="${C.text}">From specs to tested code.</text>
    <text x="560" y="322" font-size="32" fill="${C.muted}">Every step, signed off.</text>
    <text x="80" y="488" font-size="26" fill="${C.text}" xml:space="preserve">━━━━┿━━━━━━━━━┿━━━━━━━━━┿━━━━━━━━━┿╍╍╍╍╍╍╍╍╍┿╍╍╍╍</text>
    <text x="80" y="526" font-size="26" xml:space="preserve"><tspan fill="${C.ok}">    ✓ 1       ✓ 2       ✓ 3       </tspan><tspan fill="${C.accent}">• 4       </tspan><tspan fill="${C.muted}">· 5</tspan></text>
    <text x="1120" y="566" font-size="24" fill="${C.muted}" text-anchor="end">specstride.ai</text>
  </g>
</svg>`;
writeFileSync(join(root, 'public/og.png'), png(og, 1200));

// ── icons: the mark on the dark background ─────────────────────────────────
function icon(size, padUnits = 1.6) {
  const span = g.width + padUnits * 2;
  const u = size / span;
  const y0 = (size - g.height * u) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="${C.bg}" />${markShapes(padUnits * u, y0, u, { gates: size >= 64 })}</svg>`;
}
writeFileSync(join(root, 'public/apple-touch-icon.png'), png(icon(180), 180));

// favicon.ico: one 32×32 PNG wrapped in an ICO header
const p32 = png(icon(32, 1.2), 32);
const ico = Buffer.alloc(22);
ico.writeUInt16LE(0, 0); ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6); ico.writeUInt8(32, 7); ico.writeUInt8(0, 8); ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(p32.length, 14); ico.writeUInt32LE(22, 18);
writeFileSync(join(root, 'public/favicon.ico'), Buffer.concat([ico, p32]));
console.log('gen-og: public/og.png, public/apple-touch-icon.png, public/favicon.ico');
