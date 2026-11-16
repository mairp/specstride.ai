// A real Claude Code session on a fresh clone of specstride-example, replayed
// by ClaudeSession.astro. Recorded 2026-11-16 with the plugin installed from
// the public marketplace (specstride 0.1.2, the cache copy passed with
// --plugin-dir) on Claude Code 2.1.325; the transcript is kept in
// prompts/evidence-2026-11-16-plugin-0.1.2/sessiondemo.jsonl.
//
// The outputs are the session's own. Trimmed, and said so on the page: each
// command is shown as the CLI call it made (the session wrote
// `B="${SPECSTRIDE_BIN:-specstride}"; "$B" …`), paths are cut to the
// repository, and the first wait — the one cycle that printed nothing — is
// shortened to a skip line. No call is left out. `wait` is the pause in
// milliseconds before a line appears in the replay, not the session's own
// timing.
export const SESSION_META = {
  date: '2026-11-16',
  cwd: '~/specstride-example',
  claudeCode: '2.1.325',
  plugin: '0.1.2',
  cli: '0.1.0 (core 82d27ab)',
  runTook: '1 min 25 s',
} as const;

export type SessionItem = {
  kind: 'user' | 'say' | 'tool' | 'out' | 'skip';
  text: string;
  tool?: string;
  tone?: 'ok' | 'err' | 'warn';
  wait: number;
};

export const SESSION: SessionItem[] = [
  { kind: 'user', text: 'Run Specstride on the feature in this repo.', wait: 500 },
  { kind: 'tool', tool: 'Skill', text: 'specstride:specstride-run', wait: 1500 },
  { kind: 'tool', tool: 'Bash', text: 'specstride --protocol', wait: 1200 },
  { kind: 'out', text: '1', wait: 400 },
  { kind: 'tool', tool: 'Bash', text: 'specstride contract derive --repo ~/specstride-example', wait: 1200 },
  { kind: 'out', text: '[SPECSTRIDE-DERIVE] contract=pipeline:001-slugify:contract sources=3 tasks=7 declarations=0 commands=0 mappings=0 verification=required reason=configured', wait: 400 },
  { kind: 'tool', tool: 'Bash', text: 'specstride contract derive --repo ~/specstride-example --output pipeline:001-slugify:contract --next-batch', wait: 1200 },
  { kind: 'out', text: '{"schema":"specstride.judgment/1","id":"001-slugify-1","items":[],"bytes":91,"remaining":0}', wait: 400 },
  { kind: 'say', text: 'No items to judge. Promote, validate, render.', wait: 1500 },
  { kind: 'tool', tool: 'Bash', text: 'specstride contract promote pipeline:001-slugify:contract && specstride contract validate pipeline:001-slugify:contract && specstride contract render pipeline:001-slugify:contract', wait: 1200 },
  { kind: 'out', text: 'promoted to validated: 001-slugify', wait: 300 },
  { kind: 'out', text: 'valid validated launch contract: 001-slugify', wait: 300 },
  { kind: 'out', text: 'rendered ~/specstride-example/.specstride/state/pipeline/001-slugify/launcher', wait: 300 },
  { kind: 'out', text: 'bundle ~/specstride-example/.specstride/state/pipeline/001-slugify/bundle/4f65fd8220c7a6ec8934', wait: 300 },
  { kind: 'tool', tool: 'Bash', text: 'specstride launch --mode run', wait: 1200 },
  { kind: 'out', text: '[SPECSTRIDE-LAUNCH] run=run-launch-mwiuycpo state=running', tone: 'ok', wait: 600 },
  { kind: 'skip', text: '… the first `wait --until-change --timeout 60` printed nothing: the run was still going. The whole run took 1 min 25 s — three phases, each implemented, tested, reviewed and committed …', wait: 1600 },
  { kind: 'tool', tool: 'Bash', text: 'specstride wait --until-change --timeout 60', wait: 1200 },
  { kind: 'out', text: '[DIGEST] state=completed exit=0 last-stage=run-001-slugify evidence=~/specstride-example/.specstride/state/pipeline/001-slugify/runs/launch-mwiuycpo', tone: 'ok', wait: 1600 },
  { kind: 'say', text: 'Specstride ran on the `001-slugify` feature and the run completed with exit code 0.\n\n- **Contract:** the CLI built the launch contract `pipeline:001-slugify:contract` from 3 sources with 7 tasks; verification was marked required. There were no judgment questions to answer.\n- **Checks:** the contract was promoted, it passed validation, and it was rendered. The launcher and bundle are stored in Specstride\'s own state, not in your code.\n- **Mode:** you gave no comment and no mode, so I launched in `run` mode with no comment.\n\n`[SPECSTRIDE-LAUNCH] run=run-launch-mwiuycpo state=running`\n\nThe first wait printed nothing, which means the state hadn\'t changed yet. The second wait returned the digest:\n\n[DIGEST] state=completed exit=0 last-stage=run-001-slugify evidence=~/specstride-example/.specstride/state/pipeline/001-slugify/runs/launch-mwiuycpo', wait: 1500 },
];
