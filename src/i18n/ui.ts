/** Site locales, in the order the language switcher shows them. */
export const LANGS = ['fr', 'en'] as const

export type Lang = (typeof LANGS)[number]

/**
 * Home page path of each locale (French is the default, unprefixed). Keep the
 * locales in sync with the `i18n` block of astro.config.mjs.
 */
export const HOME_PATHS = {
  fr: '/',
  en: '/en/',
} as const satisfies Record<Lang, string>

/** Sections of the home page, in page order (this order numbers them). */
export const SECTION_KEYS = [
  'about',
  'skills',
  'experience',
  'beforeCode',
  'projects',
  'contact',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]

interface UiStrings {
  metaTitle: string
  metaDescription: string
  skipToContent: string
  /** Anchor id (localized) and title of each home page section. */
  sections: Record<SectionKey, { id: string; label: string }>
  homeLabel: string
  navLabel: string
  menuLabel: string
  themeToggleLabel: string
  switchLanguage: string
  photoAlt: string
  ctaContact: string
  ctaExperience: string
  versionLabel: string
  /** End of a period still going on: `sept. 2024 – aujourd’hui`. */
  present: string
  /** Command and comment of the hobbies terminal in the About section. */
  hobbiesCommand: string
  hobbiesComment: string
  /** Accessible names of the tag lists. */
  stackLabel: string
  strengthsLabel: string
  highlightsTitle: string
  educationTitle: string
  associationsTitle: string
  inProduction: string
  contactIntro: string
  emailReveal: string
  emailCopy: string
  emailCopied: string
  emailCopyFailed: string
}

export const UI = {
  fr: {
    metaTitle: 'Jonathan Scattolini · Ingénieur Full Stack',
    metaDescription:
      'Jonathan Scattolini, ingénieur full stack\u00a0: CI/CD, qualité et automatisation pilotées par l’IA.',
    skipToContent: 'Aller au contenu',
    sections: {
      about: { id: 'a-propos', label: 'À propos' },
      skills: { id: 'competences', label: 'Compétences' },
      experience: { id: 'parcours', label: 'Parcours' },
      beforeCode: { id: 'avant-le-code', label: 'Avant le code' },
      projects: { id: 'projets', label: 'Projets' },
      contact: { id: 'contact', label: 'Contact' },
    },
    homeLabel: 'Jonathan Scattolini, accueil',
    navLabel: 'Sections',
    menuLabel: 'Menu',
    themeToggleLabel: 'Basculer entre thème clair et thème sombre',
    switchLanguage: 'Read in English',
    photoAlt: 'Portrait de Jonathan Scattolini',
    ctaContact: 'Me contacter',
    ctaExperience: 'Voir le parcours',
    versionLabel: 'Version du site',
    present: 'aujourd’hui',
    hobbiesCommand: 'ls ~/loisirs',
    hobbiesComment: '# de l’automatisation, même pour jouer',
    stackLabel: 'Technologies',
    strengthsLabel: 'Atouts',
    highlightsTitle: 'Réalisations',
    educationTitle: 'Formation',
    associationsTitle: 'Engagement associatif',
    inProduction: 'En production',
    contactIntro:
      'Un poste, une mission ou simplement une question\u202f? Le plus simple est d’écrire un e-mail ou un message sur LinkedIn.',
    emailReveal: 'Afficher l’adresse e-mail',
    emailCopy: 'Copier',
    emailCopied: 'Adresse copiée',
    emailCopyFailed: 'Copie impossible\u00a0: l’adresse reste sélectionnable',
  },
  en: {
    metaTitle: 'Jonathan Scattolini · Full Stack Engineer',
    metaDescription:
      'Jonathan Scattolini, full stack engineer: CI/CD, quality & AI-driven automation.',
    skipToContent: 'Skip to content',
    sections: {
      about: { id: 'about', label: 'About' },
      skills: { id: 'skills', label: 'Skills' },
      experience: { id: 'experience', label: 'Experience' },
      beforeCode: { id: 'before-code', label: 'Before code' },
      projects: { id: 'projects', label: 'Projects' },
      contact: { id: 'contact', label: 'Contact' },
    },
    homeLabel: 'Jonathan Scattolini, home',
    navLabel: 'Sections',
    menuLabel: 'Menu',
    themeToggleLabel: 'Switch between light and dark theme',
    switchLanguage: 'Lire en français',
    photoAlt: 'Portrait of Jonathan Scattolini',
    ctaContact: 'Get in touch',
    ctaExperience: 'View experience',
    versionLabel: 'Site version',
    present: 'present',
    hobbiesCommand: 'ls ~/hobbies',
    hobbiesComment: '# automation, even at play',
    stackLabel: 'Technologies',
    strengthsLabel: 'Strengths',
    highlightsTitle: 'Highlights',
    educationTitle: 'Education',
    associationsTitle: 'Volunteering',
    inProduction: 'In production',
    contactIntro:
      'A role, a project or just a question? Email or a LinkedIn message is the easiest way to reach me.',
    emailReveal: 'Show email address',
    emailCopy: 'Copy',
    emailCopied: 'Address copied',
    emailCopyFailed: 'Couldn’t copy: the address can still be selected',
  },
} as const satisfies Record<Lang, UiStrings>

/**
 * Link to a home page section. It carries the page path so that it also works
 * from any other page of the site.
 */
export function sectionHref(lang: Lang, key: SectionKey): string {
  return `${HOME_PATHS[lang]}#${UI[lang].sections[key].id}`
}
