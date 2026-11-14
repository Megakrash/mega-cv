# mega-cv

Personal portfolio and CV site of Jonathan Scattolini, served at https://jonathan-scattolini.fr.
It is meant to stay tiny and low-maintenance: no backend, no analytics, no SEO work. Prefer the
simplest solution that works; avoid abstractions the site does not need yet.

## Stack and commands

- Astro 7 (static output) + TypeScript strict. Plain CSS: global tokens in
  `src/styles/global.css`, scoped `<style>` blocks in components. No UI framework.
- Themes: each color token is declared once with `light-dark()`. The page follows the system
  theme unless the header toggle stores a choice, applied before the first paint by the blocking
  `public/theme-init.js` (`<html data-theme>`). Animations only run under
  `prefers-reduced-motion: no-preference`.
- Node 24 (`.nvmrc`), pnpm through corepack (`packageManager` in `package.json`).
- `pnpm dev` (http://localhost:4321), `pnpm build`, `pnpm check` (astro check), `pnpm lint` (zero
  warnings), `pnpm format:check`. Formatting is owned by Prettier and ESLint.
- Production: root `Dockerfile` (Node build, then nginx alpine slim serving `dist/`), nginx config
  and security headers in `docker/`. Deployed by Coolify on every push to `main`.

## i18n

French is the default locale at `/`, English lives under `/en/`. Every page exists in both
languages, with localized paths (`/projets/mega-series/` and `/en/projects/mega-series/`): each
page's paths are declared in `src/i18n/ui.ts` (`PagePaths`) and passed to `BaseLayout`, which
uses them for the language switch and the hreflang links. UI strings (including the home page
sections, their anchors and order) live in `src/i18n/ui.ts`; the profile content shared by the
site and the CV lives in `src/data/profile.ts`, and the mega-series page content in
`src/data/mega-series.ts`. All are typed for both locales. Their lists (experiences, skills,
education…) carry both languages in each item (`Localized`), so dates and technologies are written
once; dates are ISO strings (`YYYY-MM` or `YYYY`) formatted by `DateRange.astro`.

## Conventions

- Everything committed is in English: code, comments, docs, commit messages. Exceptions: the French
  site copy, and `.claude/skills/commit/SKILL.md`, which stays in French.
- French site copy never uses "tu". Phrase sentences so the visitor does not need to be addressed;
  use "vous" only when unavoidable. English copy: neutral and professional.
- French typography: typographic apostrophe `’` (never `'`), no-break space before `:` and inside
  `« »`, narrow no-break space before `;`, `!` and `?`. In TS strings, write them as `\u00a0`
  and `\u202f` so they stay visible in the source.
- Links to other sites open in a new tab (`target="_blank" rel="noopener noreferrer"`; the
  `external` prop of `Button.astro`).
- The email address is never written in static HTML: it is assembled in JavaScript and revealed
  on click. No phone number anywhere, neither on the site nor on the CV.
- The repository is public: never commit personal data. Personal source documents dropped at the
  repo root (photo, old CV) are gitignored; only web-optimized derivatives get committed.
- mega-series content never helps an attacker: no IP, identifier, provider or bucket name,
  threshold or known weakness of its production setup. Its screenshots (`src/assets/mega-series/`,
  WebP sources that Astro converts at build time) are taken on mega-series.fr with a demo account
  that has no friends, so that no other user's data shows.
- The CSP is enforced (`docker/security-headers.conf`): no inline `<script>`, `<style>` or `style`
  attribute, no third-party origin. Keep `build.inlineStylesheets: 'never'` and
  `vite.build.assetsInlineLimit: 0` in the Astro config (otherwise Astro inlines small component
  scripts and Vite turns small files into `data:` URIs). Fonts come from the `@fontsource`
  packages imported in `BaseLayout`; never use Astro's `<Font>` component (it renders an inline
  `<style>`).
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
