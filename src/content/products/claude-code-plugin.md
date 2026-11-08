---
name: Claude Code plugin
kind: plugin
status: available
order: 1
summary: Specstride inside Claude Code. Two skills run a Spec Kit feature through the gated loop and report back in a few lines, so your session keeps its context.
statusNote: Version 0.1.0. Runs on Linux; macOS is not verified.
host: claude-code
repo: https://github.com/mairp/specstride-plugin
install: claude-code
skills:
  - name: specstride-run
    does: Run Specstride on the finished features of this repository — derive and judge the launch contract, validate, promote, render, launch, and supervise the run. Invoking the skill is the consent to launch; the mode `dry-run` stops after the plan.
  - name: specstride-doctor
    does: Check this machine for Specstride — run the doctor, list each finding with its fix, and print the command to run when the CLI is missing or its protocol does not match. It installs and updates nothing.
---

The engine that runs the loop, [Specstride core](/products/specstride-core/), is bundled inside the plugin. Using dsh instead of Claude Code? The [dsh host](/products/specstride-dsh/) runs the same engine there.
