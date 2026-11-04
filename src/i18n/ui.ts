export type Lang = 'fr' | 'en'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/jonathanscattolini/'

/**
 * Home page path of each locale (French is the default, unprefixed). Keep the
 * locales in sync with the `i18n` block of astro.config.mjs.
 */
export const HOME_PATHS = {
  fr: '/',
  en: '/en/',
} as const satisfies Record<Lang, string>

interface UiStrings {
  metaTitle: string
  metaDescription: string
  jobTitle: string
  tagline: string
  status: string
  linkedinIntro: string
  linkedinLabel: string
  switchLanguage: string
  versionLabel: string
}

export const UI = {
  fr: {
    metaTitle: 'Jonathan Scattolini · Ingénieur Full Stack',
    metaDescription:
      'Jonathan Scattolini, ingénieur full stack\u00a0: CI/CD, qualité et automatisation pilotées par l’IA.',
    jobTitle: 'Ingénieur Full Stack',
    tagline: 'CI/CD, qualité et automatisation pilotées par l’IA',
    status: 'Site en construction.',
    linkedinIntro: 'En attendant, le parcours complet est sur LinkedIn.',
    linkedinLabel: 'Profil LinkedIn',
    switchLanguage: 'Read in English',
    versionLabel: 'Version du site',
  },
  en: {
    metaTitle: 'Jonathan Scattolini · Full Stack Engineer',
    metaDescription:
      'Jonathan Scattolini, full stack engineer: CI/CD, quality & AI-driven automation.',
    jobTitle: 'Full Stack Engineer',
    tagline: 'CI/CD, quality & AI-driven automation',
    status: 'Site under construction.',
    linkedinIntro: 'Meanwhile, the full background is on LinkedIn.',
    linkedinLabel: 'LinkedIn profile',
    switchLanguage: 'Lire en français',
    versionLabel: 'Site version',
  },
} as const satisfies Record<Lang, UiStrings>

/** The other locale, for the language switcher. */
export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr'
}
