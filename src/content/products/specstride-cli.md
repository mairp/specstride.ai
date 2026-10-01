---
name: Specstride CLI
kind: core
status: available
order: 1
summary: The gated loop as it ships today. Bash and Python, standard library only. Drives Claude, Codex or dsh through a Spec Kit feature, phase by phase, behind the critic gate.
statusNote: Released as v0.1.0. Runs on Linux with Python 3.13 and Bash.
host: shell
repo: https://github.com/mairp/specstride
install: git
skills:
  - name: specstride run
    does: Carry a Spec Kit feature through the gated loop.
  - name: specstride reverse
    does: Turn an existing codebase into an as-is Spec Kit feature.
  - name: specstride learn
    does: Suggest, apply and evaluate per-phase settings from run telemetry.
links:
  - label: README
    href: https://github.com/mairp/specstride#readme
  - label: Wiki
    href: https://github.com/mairp/specstride/tree/main/wiki
  - label: Releases
    href: https://github.com/mairp/specstride/releases
---

The CLI is a single front door: `specstride run` starts a loop, and `status`, `watch`,
`events`, `verdicts`, `stop` and `resume` inspect or steer it. Everything a run produces lives
under `.specstride/` in your project, so a run can be read, resumed or audited from the files
alone.
