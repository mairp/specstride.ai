// A real Claude Code session on a fresh clone of specstride-example, replayed
// by ClaudeSession.astro. PREVIEW, NOT FOR DEPLOY: this session ran with a
// locally clarified copy of the plugin's run skill (the launch step names
// `launch --mode run`); with the published plugin 0.1.1 two sessions out of two
// stopped at the launch step. Regenerate this file from a session of the
// published plugin before it ships.
//
// The outputs are the session's own. Trimmed, and said so on the page: each
// command is shown as the CLI call it made (the session wrote
// `"$BIN" …` with BIN resolved from the search path), paths are cut to the
// repository, and waits are shortened. `wait` is the pause in milliseconds
// before a line appears in the replay, not the session's own timing.
export const SESSION_META = {
  date: '2026-11-15',
  cwd: '~/specstride-example',
  claudeCode: '2.1.325',
  plugin: '0.1.1, launch step clarified locally',
  cli: '0.1.0 (core 82d27ab)',
  runTook: '2 min 12 s',
} as const;

export type SessionItem = {
  kind: 'user' | 'say' | 'tool' | 'out' | 'skip';
  text: string;
  tool?: string;
  tone?: 'ok' | 'err' | 'warn';
  wait: number;
};

export const SESSION: SessionItem[] = [
  { kind: 'user', text: 'Run Specstride on the feature in this repo.', wait: 400 },
  { kind: 'tool', tool: 'Skill', text: 'specstride:specstride-run', wait: 1200 },
  { kind: 'tool', tool: 'Bash', text: 'specstride --protocol', wait: 1100 },
  { kind: 'out', text: '1', wait: 400 },
  { kind: 'tool', tool: 'Bash', text: 'specstride contract derive --repo ~/specstride-example', wait: 1100 },
  { kind: 'out', text: '[SPECSTRIDE-DERIVE] contract=pipeline:001-slugify:contract sources=3 tasks=7 declarations=0 commands=0 mappings=0 verification=required reason=configured', wait: 400 },
  { kind: 'tool', tool: 'Bash', text: 'specstride contract derive --repo ~/specstride-example --output pipeline:001-slugify:contract --next-batch', wait: 1100 },
  { kind: 'out', text: '{"schema":"specstride.judgment/1","id":"001-slugify-1","items":[],"bytes":91,"remaining":0}', wait: 400 },
  { kind: 'skip', text: '… two calls trimmed: validate refused the draft until it was promoted …', wait: 900 },
  { kind: 'tool', tool: 'Bash', text: 'specstride contract promote pipeline:001-slugify:contract', wait: 900 },
  { kind: 'out', text: 'promoted to validated: 001-slugify', wait: 400 },
  { kind: 'tool', tool: 'Bash', text: 'specstride contract validate pipeline:001-slugify:contract; specstride contract render pipeline:001-slugify:contract', wait: 1100 },
  { kind: 'out', text: 'valid validated launch contract: 001-slugify', wait: 400 },
  { kind: 'out', text: 'rendered ~/specstride-example/.specstride/state/pipeline/001-slugify/launcher', wait: 250 },
  { kind: 'out', text: 'bundle ~/specstride-example/.specstride/state/pipeline/001-slugify/bundle/7fabc69fc0ab52efc541', wait: 250 },
  { kind: 'tool', tool: 'Bash', text: 'specstride launch --mode run', wait: 1100 },
  { kind: 'out', text: '[SPECSTRIDE-LAUNCH] run=run-launch-mwid6h4a state=running', tone: 'ok', wait: 500 },
  { kind: 'say', text: 'Launch outcome, as the CLI printed it:\n[SPECSTRIDE-LAUNCH] run=run-launch-mwid6h4a state=running', wait: 1200 },
  { kind: 'tool', tool: 'Bash', text: 'specstride wait --until-change', wait: 1100 },
  { kind: 'skip', text: '… the wait, shortened: the run took 2 min 12 s, three phases, each implemented, tested, reviewed and committed …', wait: 1500 },
  { kind: 'out', text: '[DIGEST] state=completed exit=0 last-stage=run-001-slugify evidence=~/specstride-example/.specstride/state/pipeline/001-slugify/runs/launch-mwid6h4a', tone: 'ok', wait: 1500 },
  { kind: 'say', text: 'The run `run-launch-mwid6h4a` on the slugify feature completed with exit 0; its last stage was `run-001-slugify`. The digest, as the CLI printed it:\n[DIGEST] state=completed exit=0 last-stage=run-001-slugify evidence=~/specstride-example/.specstride/state/pipeline/001-slugify/runs/launch-mwid6h4a', wait: 1300 },
];
