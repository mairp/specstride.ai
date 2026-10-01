// The folded-track mark, copied verbatim from lib/banner.py (MARK_FULL) in
// mairp/specstride, which is its single source. Each box-drawing character is a
// track segment; ┿ is a gate post on the track.
export const MARK = [
  '┏━━━━┿━━━━┿━━━━╸',
  '┃',
  '┗━━━━┿━━━━┿━━━━┓',
  '               ┃',
  '╺━━━━┿━━━━┿━━━━┛',
];

// Which sides of its cell each character connects to: N, E, S, W.
const LINKS = {
  '━': 'EW', '┃': 'NS', '┏': 'ES', '┓': 'SW', '┗': 'NE', '┛': 'NW',
  '┿': 'EW', '╸': 'W', '╺': 'E',
};

/** Parse the mark into segments in cell units (a cell is 1 wide, 2 tall). */
export function geometry(mark = MARK) {
  const cols = Math.max(...mark.map((r) => [...r].length));
  const rows = mark.length;
  const segs = []; // [x1,y1,x2,y2] centre lines
  const gates = []; // [x, y] centres of gate posts
  mark.forEach((line, r) => {
    [...line].forEach((ch, c) => {
      const l = LINKS[ch];
      if (!l) return;
      const cx = c + 0.5, cy = r * 2 + 1;
      if (l.includes('N')) segs.push([cx, cy, cx, cy - 1]);
      if (l.includes('S')) segs.push([cx, cy, cx, cy + 1]);
      if (l.includes('E')) segs.push([cx, cy, cx + 0.5, cy]);
      if (l.includes('W')) segs.push([cx, cy, cx - 0.5, cy]);
      if (ch === '┿') gates.push([cx, cy]);
    });
  });
  return { cols, rows, width: cols, height: rows * 2, segs, gates };
}
