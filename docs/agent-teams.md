# Agent Teams — Master Reference Guide

A practical reference for orchestrating multiple Claude Code sessions as a coordinated team. Source: https://code.claude.com/docs/en/agent-teams

> Status: experimental. Requires Claude Code v2.1.32+. Disabled by default.

---

## 1. What agent teams are

Agent teams coordinate multiple Claude Code instances working together:

- **Team lead** — the main session that creates the team, spawns teammates, assigns tasks, and synthesizes results.
- **Teammates** — separate Claude Code instances, each with its own context window. They work independently and can message each other directly.
- **Task list** — a shared list of pending / in-progress / completed work items. Tasks support dependencies; locked via file locking to avoid race conditions on claim.
- **Mailbox** — messaging system between agents. Messages are delivered automatically; the lead does not poll.

Stored locally:

- Team config: `~/.claude/teams/{team-name}/config.json` (managed by Claude — do not hand-edit)
- Task list: `~/.claude/tasks/{team-name}/`

---

## 2. Enable agent teams

Add to `settings.json` (user or project-local) or export in your shell:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Verify version:

```bash
claude --version   # must be >= 2.1.32
```

---

## 3. Teams vs subagents — when to use which

| | Subagents | Agent teams |
|---|---|---|
| Context | Own context, results return to caller | Own context, fully independent |
| Communication | Report only to main agent | Teammates message each other directly |
| Coordination | Main agent manages all work | Shared task list, self-coordination |
| Best for | Focused tasks where only the result matters | Complex work needing discussion / collaboration |
| Token cost | Lower (results summarized back) | Higher (each teammate is a full Claude instance) |

**Use teams when:**
- Research and review across multiple lenses (security / perf / tests).
- Building new modules / features where each teammate owns separate files.
- Debugging with competing hypotheses (adversarial debate).
- Cross-layer changes (frontend / backend / tests).

**Use subagents (or a single session) when:**
- Sequential work, same-file edits, or dependency-heavy tasks.
- Quick focused workers that just need to report back.
- Routine tasks where coordination overhead isn't worth it.

---

## 4. Starting a team

Just describe the work and team shape in natural language to the lead:

```
I'm designing a CLI tool that tracks TODO comments across a codebase. Create
an agent team to explore this from different angles: one teammate on UX, one
on technical architecture, one playing devil's advocate.
```

Claude either creates the team on request, or proposes one and waits for your confirmation. Leadership is fixed for the team's lifetime — the originating session stays the lead.

### Specifying size and model

```
Create a team with 4 teammates to refactor these modules in parallel.
Use Sonnet for each teammate.
```

### Reusing subagent definitions as teammates

Reference a subagent type by name to reuse its `tools` allowlist, `model`, and body (appended to system prompt):

```
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

Notes:
- `skills` and `mcpServers` frontmatter in subagent defs are **not** applied to teammates — teammates load skills/MCP from project + user settings normally.
- `SendMessage` and task-management tools are always available to teammates regardless of `tools` restrictions.

### Plan-approval gating

For risky work, force teammates into read-only plan mode until the lead approves:

```
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

The lead approves autonomously — give it criteria in the prompt (e.g. "only approve plans with test coverage", "reject plans that modify the DB schema").

---

## 5. Display modes

Two modes:

- **In-process** — all teammates run inside the main terminal. Cycle with `Shift+Down`. Works in any terminal.
- **Split panes** — each teammate gets its own pane. Requires tmux or iTerm2 with the `it2` CLI.

Default: `"auto"` — split panes if already inside tmux, otherwise in-process.

Configure persistently in `~/.claude/settings.json`:

```json
{ "teammateMode": "in-process" }
```

Per-session override:

```bash
claude --teammate-mode in-process
```

Split-pane setup:
- **tmux**: install via system package manager. `tmux -CC` inside iTerm2 is the suggested entrypoint on macOS.
- **iTerm2**: install `it2` CLI, enable Python API in iTerm2 → Settings → General → Magic.

Not supported for split panes: VS Code integrated terminal, Windows Terminal, Ghostty.

### Interacting with teammates

- **In-process**: `Shift+Down` cycles through teammates → type to send a message. `Enter` views a teammate's session, `Esc` interrupts the current turn. `Ctrl+T` toggles the task list.
- **Split-pane**: click into a teammate's pane to interact directly.

---

## 6. Task management

Tasks have three states: pending, in-progress, completed. A pending task with unmet dependencies cannot be claimed.

- **Lead-assigned**: tell the lead which task goes to which teammate.
- **Self-claim**: when a teammate finishes, it picks up the next unblocked, unassigned task on its own.

Dependency resolution is automatic — completing a task unblocks dependents. File locking prevents two teammates claiming the same task.

Sizing guidance:
- **Too small** → coordination overhead exceeds benefit.
- **Too large** → teammates run long without check-ins, risking wasted work.
- **Just right** → self-contained units producing a clear deliverable (a function, a test file, a review).

Aim for ~5–6 tasks per teammate.

---

## 7. Hooks (quality gates)

Three hooks let you enforce rules around team activity. Exit code 2 = block + send feedback.

| Hook | Fires when | Effect of exit 2 |
|---|---|---|
| `TeammateIdle` | Teammate is about to go idle | Sends feedback, keeps teammate working |
| `TaskCreated` | A task is being created | Prevents creation, sends feedback |
| `TaskCompleted` | A task is being marked complete | Prevents completion, sends feedback |

Configure via standard hooks settings (see `/en/hooks`).

---

## 8. Permissions

- Teammates inherit the lead's permission mode at spawn (including `--dangerously-skip-permissions` if used).
- Per-teammate permission mode at spawn time is **not** supported. You can change individual teammate modes after spawn.
- Teammate permission prompts bubble up to the lead — pre-approve common operations to reduce friction.

---

## 9. Context and communication

Each teammate loads project context fresh (CLAUDE.md, MCP servers, skills) plus the spawn prompt from the lead. **The lead's conversation history does not carry over.** Always include task-specific details in the spawn prompt:

```
Spawn a security reviewer teammate with the prompt: "Review src/auth/ for
security vulnerabilities. Focus on token handling, session management, input
validation. The app uses JWT tokens in httpOnly cookies. Report issues with
severity ratings."
```

Communication mechanics:
- Messages auto-deliver — no polling.
- Idle notifications fire automatically when a teammate finishes.
- All agents see the shared task list.
- Teammate messages target one recipient by name; broadcast = one message per recipient.
- Name your teammates in the spawn instruction so you can reference them later.

---

## 10. Shutdown and cleanup

End a single teammate:

```
Ask the researcher teammate to shut down
```

The teammate can approve or reject (with explanation). Shutdown waits for the current request/tool-call to finish, so it can be slow.

Tear down the whole team — **always via the lead**:

```
Clean up the team
```

Cleanup fails if any teammate is still active — shut them down first. Never run cleanup from a teammate; team context may not resolve correctly.

---

## 11. Best practices

- **Start with research/review tasks** (PR review, library evaluation, bug investigation). Clear boundaries, no parallel-write conflicts.
- **3–5 teammates** is the sweet spot for most workflows. Three focused teammates often beat five scattered ones.
- **Avoid file conflicts** — partition file ownership so two teammates never edit the same file.
- **Give enough context** in spawn prompts — teammates don't see the lead's history.
- **Wait for teammates** — if the lead starts doing the work itself, tell it: `Wait for your teammates to complete their tasks before proceeding`.
- **Monitor and steer** — check in periodically, redirect bad approaches early. Unattended teams waste tokens.
- **Use adversarial framing** for hypothesis investigation — explicitly ask teammates to disprove each other's theories.

---

## 12. Common pitfalls

- **Hand-editing `~/.claude/teams/{team}/config.json`** — overwritten on next state update. Use subagent definitions for reusable roles instead.
- **Pre-authoring `.claude/teams/teams.json`** in a project — not recognized; treated as ordinary file. There is no project-level team config.
- **Resuming a session with in-process teammates** — `/resume` and `/rewind` do not restore them. The lead may message ghosts. Tell it to spawn fresh teammates.
- **Stuck tasks** — teammates sometimes forget to mark tasks complete, blocking dependents. Check manually or nudge via the lead.
- **Lead shuts down early** — if it declares done while work remains, tell it to keep going.
- **Teammates stop on errors** instead of recovering — view their output (`Shift+Down` / pane), then give instructions or spawn a replacement.
- **Orphaned tmux sessions** after a team ends:
  ```bash
  tmux ls
  tmux kill-session -t <session-name>
  ```
- **Teammates not appearing** — in in-process mode they may already exist; cycle with `Shift+Down`. For split panes verify `which tmux` or that iTerm2 `it2` CLI + Python API are enabled.
- **Token blowup** — each teammate is a full session. Costs scale linearly with team size.

---

## 13. Hard limitations

- No session resumption for in-process teammates.
- Task status can lag (teammates miss completion marks).
- Shutdown is bounded by the current tool-call duration.
- One team per session. Clean up before starting a new one.
- No nested teams — teammates cannot spawn their own teams.
- Lead is fixed for the team's lifetime; no leadership transfer.
- Permission mode set at spawn from the lead; no per-teammate spawn-time override.
- Split panes only on tmux / iTerm2.

---

## 14. Use case templates

### Parallel code review

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

### Adversarial hypothesis debate

```
Users report the app exits after one message instead of staying connected.
Spawn 5 teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific
debate. Update the findings doc with whatever consensus emerges.
```

### Cross-layer feature build

```
Create a 4-teammate team to ship the new export feature:
- backend: implement the /export endpoint in src/api/
- frontend: build the export button + modal in src/components/
- tests: integration tests covering both layers
- docs: API doc + user-facing changelog
Each owns its own files; coordinate via the task list.
```

---

## 15. Related

- Subagents: https://code.claude.com/docs/en/sub-agents
- Hooks: https://code.claude.com/docs/en/hooks
- Settings: https://code.claude.com/docs/en/settings
- Token cost guidance: https://code.claude.com/docs/en/costs#agent-team-token-costs
- Git worktrees for manual parallel sessions: https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees
