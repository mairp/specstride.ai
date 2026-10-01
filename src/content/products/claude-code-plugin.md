---
name: Claude Code plugin
kind: plugin
status: in-progress
order: 3
summary: Specstride inside Claude Code. Two skills hand specified work to the detached engine and report back in a few lines, so the host keeps its context for judgment.
statusNote: Specified in the first wave. Built after the core it sits on.
host: claude-code
skills:
  - name: specstride-run
    does: Take Spec Kit features that already exist, derive and validate a launch contract, launch the gated loop detached, supervise it and report the digest.
  - name: specstride-reverse
    does: Reverse-engineer a codebase into an as-is Spec Kit feature through the gated loop, with lint and guard checks.
links:
  - label: Watch the repo for releases
    href: https://github.com/mairp/specstride
---
