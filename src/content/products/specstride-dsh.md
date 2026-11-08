---
name: dsh host
kind: plugin
status: available
order: 2
summary: Specstride inside the DeepSeek Harness (dsh). Three skills run a Spec Kit feature through the same gated loop, or plan a reverse specification. A shim is the only path from a skill to the Specstride CLI.
statusNote: 'Version 0.1.0, built from a clone: nothing is on npm yet. Linux is verified, macOS is not, and the paid live probe of the skills inside dsh has not run yet.'
host: dsh
repo: https://github.com/mairp/specstride-dsh
install: dsh
skills:
  - name: specstride-run
    does: Run Specstride on a Spec Kit feature. It captures your comment, checks the CLI through the shim, derives the plan, judges the batches and validates. Then it launches in the foreground and supervises with one blocking wait per cycle. In `dry-run` it stops at the plan and launches nothing.
  - name: specstride-reverse
    does: Reverse-specify existing sources. It ends at the plan and the inventory, and never launches or writes.
  - name: specstride-doctor
    does: Relay the CLI's own doctor and then the host doctor's six findings, one line each with its fix. It installs and updates nothing.
---

It is the same engine as the Claude Code plugin. The package pins the four core release tarballs under `vendor/core/` and checks them against `core-pin.json`. It never builds the engine itself.

The installer installs, reports and removes. It never overwrites content it did not write, and it never updates a file whose hash no longer matches its install record. A file you changed stays yours.

A refusal from the CLI is printed with its `[SPECSTRIDE-REFUSE]` line and stops the skill without a retry. A comment that refuses a launch, such as "dry run only", wins over an invitation to run.
