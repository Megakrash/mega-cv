---
name: release
description: Prepares the next release by bumping the package.json version from the dev/main diff (no release note)
allowed-tools:
  - 'Bash(git log:*)'
  - 'Bash(git diff:*)'
  - 'Bash(git fetch:*)'
  - 'Bash(git show:*)'
  - 'Bash(git tag:*)'
  - Read
  - Edit
  - Grep
  - AskUserQuestion
---

# Release preparation skill

Bump the site version for the next release. The `version` field of the root `package.json` is the
**single source of truth**: the footer of the site shows it (`src/lib/version.ts`), the release PR
is titled after it, and `release.yml` tags `main` with it and publishes the GitHub release once
merged. There is **no release note** to write, no other file to touch and no command to run.

Reply to the user in French; anything written to the repo stays in English.

## Step 1: Read the current version

1. Read `version` in `package.json` (semver without the `v`, e.g. `0.3.0` → tag `v0.3.0`).
2. Fetch the tags (`git fetch --tags origin`) and check whether that version is already released
   (`git tag -l 'v<version>'`). Never conclude from the local `main` or tags without that fetch:
   they may lag behind.
3. If the version is **not tagged yet**, it is the pending release (bumped on `dev`, not merged
   yet): tell the user, and use `AskUserQuestion` to either keep it as is (recommended, then stop)
   or change its bump level (go on with steps 2 to 4, computing the bump from the latest tag).

## Step 2: Analyse what dev brings over main

```bash
git fetch origin main
git log origin/main..dev --oneline
git diff origin/main...dev --stat
```

Use the conversation context too when the work was just done. Suggest the bump level:

- **minor** when at least one `feat:` commit brings something visible on the site;
- **patch** for fixes, content tweaks, dependency bumps, CI or tooling only;
- **major** only if the user asks (e.g. the first public launch as `v1.0.0`).

If `dev` brings nothing over `main`, say so and stop.

## Step 3: Ask for the version

Use `AskUserQuestion` to ask for the **new version**, with the suggested bump first (marked
"(Recommended)") and the other of minor / patch second, each written out in full (e.g. `v0.4.0`,
`v0.3.1`). The user can type anything else through "Other".

## Step 4: Bump package.json

Edit **only** the `"version"` line of the root `package.json` with `Edit`, without the `v`
(`v0.4.0` → `"version": "0.4.0"`). No `pnpm install`: the lockfile does not store the project's
own version.

## Step 5: Report

Show the bump (old → new version) and remind the user:

- Commit through `/commit` (never commit directly), e.g. `chore: :bookmark: release v0.4.0`.
- Once pushed to `dev`, the rolling dev → main PR is renamed "PR Dev v0.4.0 into Main".
- Merging into `main` deploys the site, then `release.yml` creates the tag and the GitHub release
  automatically (GitHub lists the merged PRs; nothing to write).

## Important rules

- Never write a release note, a changelog or a version literal anywhere else: `package.json` is
  the only place that carries the version.
- Never re-tag or reuse a version that already exists as a tag.
- Never create tags or releases by hand: `release.yml` does it on `main`.
