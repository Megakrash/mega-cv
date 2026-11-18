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
  warnings), `pnpm format:check`, `pnpm cv` / `pnpm cv:check` (see CV below). Formatting is owned
  by Prettier and ESLint.
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

## CV

The downloadable CV is one A4 page per locale, `public/cv/jonathan-scattolini-cv-{fr,en}.pdf`,
committed and linked from the header (mobile menu included), the hero and the contact section. It
is printed from `src/pages/cv-print/[lang].astro`, which only exists in an
`astro build --mode cv-print` build: the site's own build emits no CV page (only its unused CSS and
static fonts). `pnpm cv` (`scripts/cv.ts`) makes that build in `node_modules/.cache/`, prints each
page with the local headless Chrome (`CHROME_PATH` overrides `google-chrome`), fails if a page runs
over one A4 page, and fills the PDF metadata from `src/lib/cv.ts`. Each PDF records the hash of the
HTML it was printed from, so `pnpm cv:check` (CI, `/release`) fails when what the CV shows, or its
style, changed without `pnpm cv`: after such a change, run `pnpm cv` and commit the PDFs.

- Keep the print page readable by applicant tracking systems: real text in a single column, dates
  inline after their item (a right-hand date column is read apart from the items), static Geist
  fonts (Chrome embeds variable fonts as Type 3 glyphs), black-and-white legible.
- `scripts/cv.ts` runs on Node directly, so `src/lib/cv.ts`, `src/lib/og.ts`, `src/data/profile.ts`
  and `src/i18n/ui.ts` import each other with explicit `.ts` extensions and use only erasable
  TypeScript syntax (no enum, no namespace), and must not import assets.

## Link previews and 404

- Each page that can be shared passes a `preview` (image + alt) to `BaseLayout`, which then renders
  the Open Graph tags (absolute URLs, `og:locale`, `twitter:card`) and the hreflang links; the 404
  pages pass none. It is for sharing (LinkedIn, mail, chat apps), not for search engines.
- The images are 1200×630 cards, one per page and locale
  (`src/assets/og/{home,mega-series}-{fr,en}.png`, committed, served hashed under `/_astro/`).
  `src/pages/og/[card].astro` lays them out from the site's data and tokens, only in the
  `cv-print` build, and `pnpm cv` captures them with Chrome: like the PDFs, each PNG records the
  hash of its HTML (a `tEXt` chunk) and `pnpm cv:check` fails when one is out of date. After
  changing what a card shows, run `pnpm cv` and commit the PNGs.
- 404: `src/pages/404.astro` and `src/pages/en/404.astro` (body in `NotFound.astro`). nginx serves
  the English one for paths under `/en/`, the French one elsewhere, with a real 404 status and the
  security headers; a folder without an index (403) gets it too (`docker/nginx.conf`).

## Conventions

- Everything committed is in English: code, comments, docs, commit messages. Exceptions: the French
  site copy, and `.claude/skills/commit/SKILL.md`, which stays in French.
- French site copy never uses "tu". Phrase sentences so the visitor does not need to be addressed;
  use "vous" only when unavoidable. English copy: neutral and professional.
- French typography: typographic apostrophe `’` (never `'`), no-break space before `:` and inside
  `« »`, narrow no-break space before `;`, `!` and `?`. In TS strings, write them as `\u00a0`
  and `\u202f` so they stay visible in the source.
- Links to other sites open in a new tab (`target="_blank" rel="noopener noreferrer"`; the
  `external` prop of `Button.astro`) and point to the hidden "opens in a new tab" text of
  `BaseLayout` with `aria-describedby={NEW_TAB_HINT_ID}`.
- The email address is never written in static HTML: it is assembled in JavaScript and revealed
  on click. The CV PDFs are the only place it is written in clear (by the print page, which the
  site's build never emits). No phone number anywhere, neither on the site nor on the CV.
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
