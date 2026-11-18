/*
 * The downloadable CV: one A4 page per locale, printed to PDF by `pnpm cv`
 * (scripts/cv.ts) from the hidden src/pages/cv-print/[lang].astro page.
 *
 * Explicit `.ts` extensions: scripts/cv.ts loads this file with Node.
 */
import { PROFILE, type Localized } from '../data/profile.ts'
import type { Lang } from '../i18n/ui.ts'

/** Build mode (`astro build --mode cv-print`) that alone renders the print page. */
export const CV_PRINT_MODE = 'cv-print'

/** Where the print page is served in that build. */
export function cvPrintPath(lang: Lang): string {
  return `/cv-print/${lang}/`
}

/** The PDF of each locale, served from public/ (committed). */
export const CV_PDF_PATHS = {
  fr: '/cv/jonathan-scattolini-cv-fr.pdf',
  en: '/cv/jonathan-scattolini-cv-en.pdf',
} as const satisfies Localized

/** Document metadata of the PDF; its title is also the print page's <title>. */
export function cvMetadata(lang: Lang) {
  const profile = PROFILE[lang]
  return {
    title: `${profile.name} · CV · ${profile.jobTitle}`,
    author: profile.name,
    subject: profile.tagline,
    keywords: [profile.jobTitle, ...profile.focus],
  }
}
