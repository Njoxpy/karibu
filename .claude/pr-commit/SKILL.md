---
name: conventional-commits
description: Write Git commit messages that follow the Conventional Commits 1.0.0 specification, enabling automated changelogs, semantic version bumps, and a clear, structured commit history.
---

# Conventional Commits

## Purpose

Conventional Commits is a lightweight convention layered on top of Git commit messages. It provides a small, explicit set of rules that make commit history machine-readable, which enables automated tooling for changelog generation, semantic version bumps (SemVer), and release pipelines.

## When to Use

Use this skill whenever you need to:

- Write or rewrite a Git commit message.
- Author commits in a project that follows Conventional Commits or SemVer.
- Generate suggested commit messages from a diff or a description of changes.
- Review commit messages for spec compliance.
- Author squash-merge commit messages on pull requests.

## Format

Every commit message MUST follow this structure:

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- **type** — a noun such as `feat`, `fix`, `docs`, etc. Required.
- **scope** — a noun in parentheses describing the section of the codebase, e.g. `(parser)`. Optional.
- **!** — placed immediately before the colon to flag a breaking change. Optional.
- **description** — a short summary, immediately following the colon and a single space. Required.
- **body** — free-form, separated from the description by one blank line. Optional.
- **footer(s)** — `Token: value` or `Token #value` lines, separated from the body by one blank line. Optional.

## Required Types

- `feat` — MUST be used when introducing a new feature (correlates with **MINOR** in SemVer).
- `fix` — MUST be used when patching a bug (correlates with **PATCH** in SemVer).

## Recommended Additional Types

These come from `@commitlint/config-conventional` (Angular convention) and have no implicit SemVer effect unless they include a breaking change:

`build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, `revert`

Teams MAY define their own types as needed.

## Breaking Changes

A breaking change correlates with **MAJOR** in SemVer and MUST be indicated in one of two ways:

1. Append `!` immediately before the `:` in the type/scope prefix.
2. Add a `BREAKING CHANGE: <description>` footer (uppercase required; `BREAKING-CHANGE` is synonymous).

If `!` is used, the `BREAKING CHANGE:` footer MAY be omitted, and the description SHALL describe the breaking change. Both may also be combined. A breaking change can appear on a commit of any type.

## Rules (Normative)

1. Commits MUST be prefixed with a type, then OPTIONAL scope, OPTIONAL `!`, and a REQUIRED terminal `: ` (colon + space).
2. A scope MUST be a noun in parentheses, e.g. `fix(parser):`.
3. The description MUST immediately follow the colon and space.
4. A body MAY be provided, MUST begin one blank line after the description, and MAY contain multiple paragraphs.
5. Footers MAY be provided one blank line after the body. Each footer MUST be `token: value` or `token #value`.
6. Footer tokens MUST use `-` instead of whitespace (e.g. `Reviewed-by`), with `BREAKING CHANGE` as the only exception.
7. Type and scope are case-insensitive (be consistent), but `BREAKING CHANGE` MUST be uppercase.
8. Parsing of a footer's value terminates when the next valid footer token/separator is encountered.

## Examples

**Description and breaking change footer**

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

**`!` to flag a breaking change**

```
feat!: send an email to the customer when a product is shipped
```

**Scope plus `!`**

```
feat(api)!: send an email to the customer when a product is shipped
```

**Both `!` and a footer**

```
feat!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

**No body**

```
docs: correct spelling of CHANGELOG
```

**With scope**

```
feat(lang): add Polish language
```

**Multi-paragraph body and multiple footers**

```
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.

Reviewed-by: Z
Refs: #123
```

**Revert**

```
revert: let us never again speak of the noodle incident

Refs: 676104e, a215868
```

## Authoring Workflow

1. Identify the primary intent of the change and pick the most accurate type. If the change spans multiple types, split it into multiple commits.
2. Choose a scope only if it adds useful context (e.g. the affected module).
3. Write the description in the imperative mood, lowercase, with no trailing period, and keep it concise.
4. Add a body when context, motivation, or contrast with prior behavior would help reviewers.
5. Add footers for metadata (`Refs:`, `Reviewed-by:`, `Co-authored-by:`, etc.) and for any breaking change notes.
6. Mark breaking changes with `!` in the prefix and/or a `BREAKING CHANGE:` footer.

## SemVer Mapping

- `fix:` → **PATCH**
- `feat:` → **MINOR**
- Any commit with `BREAKING CHANGE` (footer or `!`) → **MAJOR**
- Other types → no implicit version bump.

## Common Pitfalls

- Forgetting the space after the colon (`feat:add x` is invalid; use `feat: add x`).
- Using lowercase `breaking change` in a footer — it MUST be uppercase.
- Putting the `!` after the colon (it MUST come before the colon).
- Using whitespace in footer tokens instead of `-` (e.g. `Reviewed by:` should be `Reviewed-by:`).
- Bundling unrelated changes under one type — split them into separate commits when possible.
- Using a non-spec type by typo (e.g. `feet` instead of `feat`); fix with `git rebase -i` before merging when possible.

## Notes

- Casing of type/scope is not enforced, but stay consistent within a project.
- Not every contributor needs to follow the spec if a squash-merge workflow lets maintainers rewrite the final commit message.
- The spec does not define revert semantics; the `revert:` type with a `Refs:` footer pointing to reverted SHAs is a common convention.
