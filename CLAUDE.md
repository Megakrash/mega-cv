# mega-cv

Personal portfolio and CV site of Jonathan Scattolini, served at https://jonathan-scattolini.fr.
It is meant to stay tiny and low-maintenance: no backend, no analytics, no SEO work. Prefer the
simplest solution that works; avoid abstractions the site does not need yet.

## Stack and commands

- Astro 7 (static output) + TypeScript strict. Plain CSS: global tokens in
  `src/styles/global.css`, scoped `<style>` blocks in components. No UI framework.
- Node 24 (`.nvmrc`), pnpm through corepack (`packageManager` in `package.json`).
- `pnpm dev` (http://localhost:4321), `pnpm build`, `pnpm check` (astro check), `pnpm lint` (zero
  warnings), `pnpm format:check`. Formatting is owned by Prettier and ESLint.
- Production: root `Dockerfile` (Node build, then nginx alpine slim serving `dist/`), nginx config
  and security headers in `docker/`. Deployed by Coolify on every push to `main`.

## i18n

French is the default locale at `/`, English lives under `/en/`. Every page exists in both
languages; UI strings live in `src/i18n/ui.ts`, typed for both locales.

## Conventions

- Everything committed is in English: code, comments, docs, commit messages. Exceptions: the French
  site copy, and `.claude/skills/commit/SKILL.md`, which stays in French.
- French site copy never uses "tu". Phrase sentences so the visitor does not need to be addressed;
  use "vous" only when unavoidable. English copy: neutral and professional.
- French typography: typographic apostrophe `’` (never `'`), no-break space before `:` and inside
  `« »`, narrow no-break space before `;`, `!` and `?`. In TS strings, write them as `\u00a0`
  and `\u202f` so they stay visible in the source.
- The email address and the phone number are never written in static HTML: they are assembled in
  JavaScript and revealed on click. The CV never shows the phone number.
- The repository is public: never commit personal data. Personal source documents dropped at the
  repo root (photo, old CV) are gitignored; only web-optimized derivatives get committed.
- The CSP is enforced (`docker/security-headers.conf`): no inline `<script>`, `<style>` or `style`
  attribute, no third-party origin. Keep `build.inlineStylesheets: 'never'` in the Astro config.
- nginx does not merge `add_header` levels: a location that sets its own `add_header` must include
  the security-headers snippet again.
- No external error tracking or analytics service.

## Versioning

The `version` field of `package.json` is the only version source (shown in the footer through
`src/lib/version.ts`); never add another version literal. Only the `/release` skill bumps it, at
production time, never during a feature. On merge to `main`, `release.yml` tags the commit and
publishes the GitHub release; `open_release_pr.yml` maintains the rolling `dev → main` PR.

## Workflow

- Work directly on `dev`; `main` is production. No feature branches.
- Never commit or push directly: commits go through the `/commit` skill, only when the user asks.
  Never open a PR unless asked.
- After any UI change, check the FR and EN pages in Chrome (Claude in Chrome tools).
- Talk to the user in French.
