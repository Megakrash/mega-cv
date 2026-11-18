/*
 * Link preview images (Open Graph): one card per page and locale, laid out by
 * the hidden src/pages/og/[card].astro page, captured to PNG by `pnpm cv`
 * (scripts/cv.ts) and committed under src/assets/og/. The pages import them.
 *
 * Explicit `.ts` extensions: scripts/cv.ts loads this file with Node.
 */
import type { Lang } from '../i18n/ui.ts'

/** Pages that have a preview card of their own. */
export const OG_CARDS = ['home', 'mega-series'] as const

export type OgCard = (typeof OG_CARDS)[number]

/** Size of the cards, in CSS pixels: the 1.91:1 ratio of link previews. */
export const OG_SIZE = { width: 1200, height: 630 } as const

/** URL segment of a card's page: `home-fr`. */
export function ogCardId(card: OgCard, lang: Lang): string {
  return `${card}-${lang}`
}

/** Where a card's page is served in the cv-print build. */
export function ogCardPath(card: OgCard, lang: Lang): string {
  return `/og/${ogCardId(card, lang)}/`
}

/** The committed image of a card, relative to the project root. */
export function ogImageFile(card: OgCard, lang: Lang): string {
  return `src/assets/og/${ogCardId(card, lang)}.png`
}
