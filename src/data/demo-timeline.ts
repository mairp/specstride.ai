// A real presenter transcript. Produced in a checkout of mairp/specstride with
//   python3 lib/present.py --events docs/media/demo-events.jsonl --mode timeline --no-color
// i.e. the recorded demo run that the README's GIF replays, rendered by the
// shipped presenter. `node` says which part of the loop diagram a line belongs to.
export type LoopNode = 'proposer' | 'critic' | 'approve' | 'reject' | 'diagnostician' | 'accelerator' | 'checkpoint' | 'evidence' | null;
export type Tone = 'muted' | 'accent' | 'ok' | 'err' | 'warn' | 'info' | 'plain' | 'rail';

export const TIMELINE: { text: string; node: LoopNode; tone: Tone }[] = [
  { text: '14:02:11  ┏ run start — 5 phases · codex→claude · resume @ phase 3', node: null, tone: 'plain' },
  { text: '14:02:11  ◆ phase 3/5 — Wire session middleware', node: null, tone: 'accent' },
  { text: '14:02:12  ✱ proposer working — phase 3, attempt 1, codex', node: 'proposer', tone: 'plain' },
  { text: '14:03:40  ✎ Edit start src/session/middleware.ts', node: 'proposer', tone: 'muted' },
  { text: '14:05:02  ❯ Bash start npm test -- session', node: 'proposer', tone: 'muted' },
  { text: '14:09:31  ◇ evidence → .specstride/features/add-session-auth/gates/GATE3-EVIDENCE.md  (4 iter)', node: 'evidence', tone: 'plain' },
  { text: '14:09:40  ┿ critic judging phase 3, claude', node: 'critic', tone: 'plain' },
  { text: '14:10:02  ✗ REJECTED phase 3 (attempt 1) — C3.2 cites a test that never ran', node: 'reject', tone: 'err' },
  { text: '          ━━━━┿━━━━━━━━━┿━━━━━━━━━┿╍╍╍╍╍╍╍╍╍┿╍╍╍╍╍╍╍╍╍┿╍╍╍╍   2/5 approved · attempt 1/3', node: 'reject', tone: 'rail' },
  { text: '              ✓ 1       ✓ 2       ✗ 3       · 4       · 5', node: 'reject', tone: 'rail' },
  { text: '14:10:03  ! diagnosing phase 3, after attempt 1 — writing a hint for the next pass', node: 'diagnostician', tone: 'warn' },
  { text: '14:10:41  ✚ accelerator acting on the hint — phase 3, attempt 2, codex · C3.2', node: 'accelerator', tone: 'plain' },
  { text: '14:11:15  ❯ Bash start npm test -- session.middleware', node: 'accelerator', tone: 'muted' },
  { text: '14:16:30  ◇ evidence → .specstride/features/add-session-auth/gates/GATE3-EVIDENCE.md  (2 iter)', node: 'evidence', tone: 'plain' },
  { text: '14:16:48  ┿ critic judging phase 3, claude', node: 'critic', tone: 'plain' },
  { text: '14:17:05  ✓ APPROVED phase 3', node: 'approve', tone: 'ok' },
  { text: '14:17:06  ◆ phase 3 done (attempt 2)', node: 'approve', tone: 'ok' },
  { text: '          ━━━━┿━━━━━━━━━┿━━━━━━━━━┿━━━━━━━━━┿╍╍╍╍╍╍╍╍╍┿╍╍╍╍   3/5 approved · 14m55s', node: 'approve', tone: 'rail' },
  { text: '              ✓ 1       ✓ 2       ✓ 3       · 4       · 5', node: 'approve', tone: 'rail' },
  { text: '14:17:06  ⎇ git checkpoint (phase 3)', node: 'checkpoint', tone: 'muted' },
];

/** One events.jsonl record from the same recording, verbatim. */
export const SAMPLE_EVENT =
  '{"time": "2026-09-26T14:10:02+0000", "event": "verdict", "phase": 3, "result": "REJECTED", "attempt": 1, "max_rejects": 3, "reason": "C3.2 cites a test that never ran"}';
