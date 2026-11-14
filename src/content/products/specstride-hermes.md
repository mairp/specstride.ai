---
name: Hermes host
kind: plugin
status: available
order: 3
summary: Specstride inside Hermes — from a chat, the TUI or Telegram, derive, dry-run, launch, supervise, stop, resume and curate Spec Kit features through the same pinned engine as the other hosts. Push notices to Telegram and a kanban board of the runs come with it.
statusNote: 'Built from a clone: nothing is on npm yet. Linux is verified, macOS is not. The pinned engine has no reverse verb yet, so the installer skips the reverse skill.'
host: hermes
repo: https://github.com/mairp/specstride-hermes
install: hermes
builtOn: specstride-core
relation: Pins the core 0.1.0 release tarballs by sha256.
skills:
  - name: specstride-run
    does: Run Specstride on the finished features of the repository — derive, judge, validate, render, launch and supervise to the digest. Invoking the skill is the consent to launch; `dry-run` stops after the plan.
  - name: specstride-status
    does: Show the state of a run on this Hermes host from the precomputed status line, without starting anything.
  - name: specstride-curate
    does: Reconcile the Spec Kit corpus of the repository for the Hermes host — backup, checks, retargeting rules, analyze refresh.
---

It is the same engine as the Claude Code plugin and the dsh host. The package adds no
product logic and copies no engine source: every fact it shows is a line of the CLI,
reached only through the shim `specstride-hermes`, and the engine arrives as
sha256-pinned tarballs under `vendor/core/` (`core-pin.json`). The skills are rendered
from `@specstride/host-kit`, so the three hosts cannot drift; Python exists only as
thin plugin glue that forwards to Node.

The installer installs, reports and removes. It never touches the default Hermes
profile: `--profile specstride` enables the plugin in a dedicated profile, and `--user`
writes files and prints the enable command instead of running it. The doctor prints,
after `specstride doctor`, one `<severity> <check> — <fix>` line per finding — eight
checks, no model, done within two seconds.

Two things the other hosts do not have. The watcher unit sends one Telegram line per
run state change or attention item — a failed delivery is one log line and never gates
a run. And `install --with-kanban` adds the projector module for a kanban board: one
root card per run, one stage card per phase, one `blocked` card per attention item. A
board write made by a person is undone by the restore guard; a human-edited title or
body is kept and gets one stale comment instead.
