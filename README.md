# mega-cv

Personal portfolio and CV of Jonathan Scattolini, served at
[jonathan-scattolini.fr](https://jonathan-scattolini.fr).

A small static site: **Astro** + TypeScript (strict), plain CSS, no backend. French is the default
language at `/`, English lives under `/en/`. Production serves the built files with **nginx** from
a Docker image deployed by Coolify.

## Prerequisites

- Node **24** (exact version in `.nvmrc`; `nvm use`)
- pnpm through **corepack** (`corepack enable`): the version is pinned by `packageManager` in
  `package.json`
- Docker, only to build and run the production image locally
- Google Chrome, only to print the CV PDFs (`pnpm cv`)

## Getting started

```bash
corepack enable
pnpm install          # also installs the git hooks (husky)
pnpm dev              # http://localhost:4321 (French) and http://localhost:4321/en/
```

## Scripts

| Script              | What it does                                                       |
| ------------------- | ------------------------------------------------------------------ |
| `pnpm dev`          | Dev server with hot reload                                         |
| `pnpm build`        | Static build into `dist/`                                          |
| `pnpm preview`      | Serves the `dist/` build locally                                   |
| `pnpm check`        | Type-checks `.astro` and `.ts` (`astro check`)                     |
| `pnpm lint`         | ESLint, zero warnings allowed                                      |
| `pnpm format:check` | Prettier check (`pnpm format` to fix)                              |
| `pnpm cv`           | Prints the CV PDFs that changed into `public/cv/` (`--force`: all) |
| `pnpm cv:check`     | Fails if a CV PDF no longer matches the site's content (no Chrome) |

CI (`.github/workflows/test.yml`) runs lint, format, check, build and `cv:check` on every push to
`dev` and `main`.

## CV

The CV is one A4 page per locale, generated from the site's data: `src/pages/cv-print/[lang].astro`
lays it out, `pnpm cv` builds it in a temporary folder and prints it with the local headless Chrome
(`CHROME_PATH` to use another binary) into `public/cv/`, and the PDFs are committed. That page is
never part of the site's build, which keeps the e-mail address it prints out of the site's HTML.
After changing anything the CV shows, run `pnpm cv` and commit the PDFs: CI fails otherwise.

## Layout

```
src/
  pages/            index.astro (FR, /) and en/index.astro (EN, /en/), then the mega-series
                    page: projets/mega-series.astro and en/projects/mega-series.astro, and the
                    CV print page cv-print/[lang].astro (only built by `pnpm cv`)
  layouts/          page shell (<head>, hreflang links, header, footer)
  components/       header, footer, hero, sections, project page and base components
  data/profile.ts   profile content of both languages (shared with the CV)
  data/mega-series.ts  content of the mega-series page (both languages)
  i18n/ui.ts        UI strings of both languages, page paths, home page sections
  lib/version.ts    site version shown in the footer
  lib/cv.ts         CV PDF paths and metadata
  assets/           images optimized at build time (photo, mega-series screenshots)
  styles/           design tokens and global CSS
public/             files copied as is (favicon, theme-init.js, cv/ PDFs)
scripts/cv.ts       prints the CV PDFs (pnpm cv, pnpm cv:check)
docker/             nginx config and security headers of the production image
```

## Git workflow and commits

All work happens on `dev`; `main` is production. Commits follow commitlint's conventional format
with a gitmoji (`type: :gitmoji: description`), enforced by the husky `commit-msg` hook;
`pre-commit` runs ESLint and Prettier on staged files (lint-staged).

## Claude Code

`CLAUDE.md` holds the project conventions. Project skills live in `.claude/skills/`:

- `/review` reviews the uncommitted changes with four read-only reviewers running in parallel
  (`.claude/agents/review-{logic,quality,frontend,security}.md`), verifies their findings and
  applies the useful fixes;
- `/commit` groups the changes into conventional commits and pushes the current branch;
- `/release` bumps the version before going to production (see below).

## Versioning and releases

The `version` field of `package.json` is the single source of truth. The site footer shows it,
linked to its GitHub release.

1. Before going to production, bump the version on `dev` (the `/release` Claude Code skill
   suggests the bump level and edits `package.json`).
2. Every push to `dev` opens or updates a single rolling `dev → main` PR
   (`open_release_pr.yml`), titled `PR Dev vX.Y.Z into Main` while that version is not tagged.
3. Merging into `main` deploys the site, and `release.yml` tags the commit `vX.Y.Z` and publishes
   the GitHub release (generated list of merged PRs, no hand-written notes). A push to `main`
   without a version bump releases nothing.

## Production image

```bash
docker build -t mega-cv:local .
docker run --rm -p 8090:80 mega-cv:local     # http://localhost:8090
```

Multi-stage build: Node (pnpm install + `astro build`) then `nginx:alpine-slim` serving `dist/`
with long-cached `/_astro/` assets, revalidated pages and security headers, including an enforced
Content Security Policy (`docker/security-headers.conf`).

## Deployment

Coolify builds the root `Dockerfile` and deploys on every push to `main`, behind Traefik on the
same VPS as mega-series.
