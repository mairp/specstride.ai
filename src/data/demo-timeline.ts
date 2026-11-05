// The "A real run" log from the product README, verbatim, with its date —
// the engine's own output, trimmed, from a stored log (2026-11-04). `node`
// says which part of the loop diagram a line belongs to. Two lines of the
// README's log are left out (see DECISIONS.md): they are kept off the page
// like every other occurrence of the product's internal role word.
export type LoopNode = 'implementer' | 'verification' | 'reviewer' | 'approval' | 'reject' | null;
export type Tone = 'muted' | 'accent' | 'ok' | 'err' | 'warn' | 'info' | 'plain' | 'rail';

export const TIMELINE: { text: string; node: LoopNode; tone: Tone }[] = [
  { text: '===== PHASE 1 — the overlapping work  (2026-11-04T03:21:24.358Z) =====', node: null, tone: 'plain' },
  { text: '[001-par-overlap] verification: npm test -> passed', node: 'verification', tone: 'ok' },
  { text: '[001-par-overlap] phase 1 attempt 1: rejected', node: 'reject', tone: 'err' },
  { text: '----- phase 1 REJECTED on attempt 1/3 -----', node: 'reject', tone: 'err' },
  { text: '[001-par-overlap] verification: npm test -> passed', node: 'verification', tone: 'ok' },
  { text: '[001-par-overlap] phase 1 attempt 2: approved', node: 'approval', tone: 'ok' },
  { text: '===== PHASE 1 APPROVED (attempt 2) =====', node: 'approval', tone: 'ok' },
  { text: '----- git checkpoint: phase 1 approved -----', node: 'approval', tone: 'muted' },
];
