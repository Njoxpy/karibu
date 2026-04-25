---
name: pr-review
description: Conduct thorough, constructive pull request reviews — assess correctness, design, tests, readability, and risk; leave actionable, prioritized feedback; and decide whether to approve, request changes, or comment.
---

# Pull Request Review

## Purpose

Provide reviews that improve code quality, share knowledge across the team, catch defects early, and unblock authors quickly. A good review balances rigor with momentum: it surfaces real issues without nitpicking, teaches without lecturing, and ends in a clear decision.

## When to Use

Use this skill whenever you need to:

- Review a pull/merge request opened by a teammate, contributor, or AI agent.
- Re-review after changes have been pushed in response to prior feedback.
- Triage a stalled or oversized PR.
- Self-review your own PR before requesting reviewers.
- Generate a structured review summary or inline comments from a diff.

## Review Goals (in priority order)

1. **Correctness** — the code does what it claims and handles edge cases.
2. **Safety** — no security, privacy, data-loss, or production risk.
3. **Design** — fits the system architecture and existing patterns; appropriate abstractions.
4. **Tests** — covered by meaningful automated tests at the right level.
5. **Readability** — future maintainers can understand the change.
6. **Consistency** — matches project style, naming, and conventions.
7. **Performance & resource use** — proportional to the change's hot path.
8. **Documentation** — public APIs, configs, and behavior changes are documented.

Optimize earlier items over later ones; do not block on style if a correctness issue is unresolved.

## Pre-Review Checks

Before reading the diff in detail:

1. Read the PR title, description, and linked issue. If intent is unclear, ask before reviewing line-by-line.
2. Confirm the PR is reasonably scoped. If it mixes unrelated changes or exceeds ~400 lines of substantive diff, suggest splitting it.
3. Check that CI is green, or note explicitly which failures you are reviewing around.
4. Skim the file list to build a mental map of what changed and where the
