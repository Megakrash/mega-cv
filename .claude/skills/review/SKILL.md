---
name: review
description: Reviews the uncommitted changes with four parallel Sonnet reviewers (logic, quality, front-end, security), verifies every finding, then applies the useful fixes before /commit
argument-hint: '[optional focus: paths or topic]'
disable-model-invocation: true
model: opus
allowed-tools:
  - 'Bash(git status:*)'
  - 'Bash(git diff:*)'
  - 'Bash(git log:*)'
  - 'Bash(git show:*)'
  - 'Bash(git ls-files:*)'
  - 'Bash(pnpm lint:*)'
  - 'Bash(pnpm format:*)'
  - 'Bash(pnpm check:*)'
  - 'Bash(pnpm build:*)'
  - 'Bash(pnpm exec prettier:*)'
  - Read
  - Grep
  - Glob
  - Edit
  - Write
  - Agent
---

# Code review skill

You orchestrate the review of the **uncommitted changes**. Four read-only reviewers run in
parallel on Sonnet (`.claude/agents/review-*.md`); you then verify every finding against the code
yourself, apply the fixes worth applying, run the checks and report to the user. You never commit
or push: the user runs `/commit` afterwards.

Optional focus given by the user: $ARGUMENTS

Report to the user in French; anything written to the repo stays in English (see CLAUDE.md).

## Step 1: Define the scope

```bash
git status --porcelain --untracked-files=all
git diff HEAD --stat
```

- If nothing changed, say so and stop.
- The scope is every uncommitted change: staged, unstaged and untracked files. Leave out
  `pnpm-lock.yaml` (only check that it changed together with `package.json`) and binary files
  (images, PDF, fonts). Deleted files are listed, not reviewed.
- If the focus names paths, restrict the scope to them; if it names a topic, pass it on to the
  reviewers as their focus.
- Collect the diff of the modified tracked files: `git diff HEAD -- <files>`. Untracked files have
  no diff: they are new, and the reviewers read them in full.
- Write a 2 to 4 sentence summary of what the change is meant to do, from the conversation and the
  diff. The reviewers do not see the conversation: this summary is their only view of the intent.

## Step 2: Launch the four reviewers

Launch them **in a single message** (four Agent calls, so they run in parallel), with the
subagent types `review-logic`, `review-quality`, `review-frontend` and `review-security`. Do not
pass `model`: their definitions pin Sonnet. Each prompt contains:

1. The intent summary.
2. The files in scope, each with its status (new, modified, deleted).
3. The diff of the modified tracked files. Above ~1500 lines, give the file list only and let the
   reviewers read the files.
4. The focus, if any.
5. A reminder to read every file in scope in full and to answer in the format of their definition.

Wait for the four reports. Never consolidate, report or apply anything before all four are in,
and never guess what a pending reviewer will say. If a reviewer fails, relaunch it once; if it
fails again, name the missing dimension in the report.

## Step 3: Verify every finding

For each finding:

1. Open the cited location and the code around it, and redo the reasoning. When a quick command
   settles it (a build, a grep in `dist/`), run it.
2. Classify it:
   - **Confirmed**: real, and introduced or worsened by the change.
   - **Rejected**: false positive, pre-existing and out of scope, pure taste, or contrary to a
     convention of CLAUDE.md (name it).
3. Merge duplicates found by several reviewers: keep the clearest wording and note the overlap
   (agreement raises confidence).

## Step 4: Apply the useful fixes

Apply the confirmed findings worth fixing yourself: every blocker and major, and the minors whose
fix is cheap and clearly better.

- Keep edits minimal and local to the change, following CLAUDE.md and the existing patterns.
- Do **not** apply, and list as **to decide** instead, anything that changes visible content or
  design choices, adds, removes or upgrades a dependency, changes infra, CI or deploy behaviour
  beyond fixing an obvious bug, involves a product decision, or on which the reviewers disagree or
  you are unsure.
- Never commit, push or open a PR, and never edit files outside the repository.

Then run the checks, which must all pass:

```bash
pnpm exec prettier --write <edited files>
pnpm lint
pnpm format:check
pnpm check
pnpm build
```

If a fix breaks something, correct it, or revert that fix and list it as to decide. If a fix
changed the rendered UI, check the FR and EN pages in Chrome, as CLAUDE.md requires.

## Step 5: Report

In French, in this order:

1. One line: the scope (number of files) and the overall verdict.
2. **Appliqué**: for each fix, its severity, title, `file:line` and what changed, in one line.
3. **À décider**: for each item, the problem, the options and your recommendation.
4. **Écarté**: one line per rejected finding with the reason.
5. The check results (lint, format, check, build, Chrome when relevant).
6. A reminder that nothing is committed: the user runs `/commit` when satisfied.

## Important rules

- The reviewers only read; you are the only one who edits.
- Never commit, push, or bypass a hook.
- A finding is applied only after you verified it yourself in the code.
