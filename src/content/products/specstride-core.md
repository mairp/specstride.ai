---
name: Specstride core
kind: core
status: available
order: 3
summary: The engine behind both hosts. It holds the `specstride` CLI, the contracts, the loop layers, the runtime, the adapters, and the kits a host is built from. Use it to run the CLI on its own, to build a host for another agent, or to read how the loop and its governance work.
statusNote: 'Release 0.1.0, packed from a clone: nothing is on npm yet. Linux is verified, macOS is not.'
repo: https://github.com/mairp/specstride-core
install: core
links:
  - label: Publishing
    href: https://github.com/mairp/specstride-core/blob/main/docs/PUBLISHING.md
skills:
  - name: specstride launch
    does: Runs the launch checks, writes the launch record, starts the detached runtime root and waits for the handshake.
  - name: specstride status · wait · stop · resume
    does: Read the state of a run, block until it changes, end it at the next safe boundary, or continue it from the records on disk.
  - name: specstride doctor
    does: Checks this machine and workspace — Node, git, the agents on the search path, a `specs/` directory.
  - name: specstride learn
    does: Suggests per-phase settings from the run's own telemetry, evaluates each change against a baseline and reverts the ones that make things worse. Off unless you turn it on.
  - name: specstride reverse
    does: Reverse specification of existing sources — plan, lint, guard, inventory.
---

## Loop engineering

A single agent session is one loop with no brakes. The core treats the loop itself as the thing to engineer: which loops exist, what ends each of them, and what happens when one gets stuck. From the outside in, the loops are pipeline stages, the phases of a run, phase attempts, passes and micro-loop cycles.

- **Every loop has an end.** Attempts are capped, passes have watchdogs and breakers, and every way a run can stop is a named stop reason with a fixed exit code.
- **Deterministic checks before any opinion.** The verification gate runs the phase's frozen check manifest, with a fixed argument list and no shell, before the critic sees anything.
- **A router with no I/O.** Check order, loop layer and escalation to the next model tier come from a pure function over versioned rule tables. Each decision records its rule id.
- **Loop layers you can stack:** `none`, `micro` and the opt-in `parallel` layer.

## Governance

- **Separation of roles.** The implementer and the reviewer are separate sessions, chosen independently.
- **Verdicts that can't be forged.** A verdict is bound to a one-time nonce for that attempt.
- **Approval is a record.** Approvals live outside the implementer's write scope and are verified again on resume.
- **Configuration narrows, never widens.** Project configuration can only restrict a run. Anything that widens capability comes from user scope, the environment or flags.
- **Layering enforced in CI.** A layer imports only from layers below it and from the contracts package.

## Layers

```
L7 HOSTS      Claude Code plugin · dsh · plain shell
L6 CLI        derive · validate · launch · status · wait · stop · resume · doctor · learn
L5 RUNTIME    detached runtime root · lock and lease · run-state owner
L4 ENGINE     run → phase → attempt · verification gate → critic → approval record
L3 PASS LOOP  passes · watchdogs · breakers · yields · loop layers · router
L2 PORTS      harness · spec format · check runner · event sink · secret resolver
L1 EDGES      adapters · stream readers · sinks · resolvers
L0 STATE      user state · per-workspace control plane
```

A release is four packages with one version: `specstride` (the CLI as one ESM file with no runtime dependencies), `@specstride/contracts`, `@specstride/host-kit` and `@specstride/testkit`. A host takes a release by pinning the tarballs and their sha256.
